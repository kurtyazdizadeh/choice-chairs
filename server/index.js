require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    SELECT
      "p".*,
      ARRAY_AGG(distinct "c"."name") AS "colors",
      ARRAY_AGG(distinct "i"."imageType") AS "images"
    FROM products AS "p"
      JOIN products_colors USING ("productId")
      JOIN colors AS "c" USING ("colorId")
      JOIN products_images USING ("productId")
      JOIN images AS "i" USING ("imageId")
    GROUP BY "productId"
    ORDER BY "productId";
  `;
  db.query(sql)
    .then(result => {
      const products = result.rows;
      res.json(products);
    })
    .catch(err => next(err));
});

app.patch('/api/products/:productId-:color', (req, res, next) => {
  const { color, productId } = req.params;

  if (!parseInt(productId, 10)) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sql = `
    UPDATE products
    SET "chosenColor" = $1
    WHERE "productId" = $2;
  `;
  const params = [color, productId];
  db.query(sql, params)
    .then(result => {
      const select = `
        SELECT
          "p".*,
          ARRAY_AGG(distinct "c"."name") AS "colors",
          ARRAY_AGG(distinct "i"."imageType") AS "images"
        FROM products AS "p"
          JOIN products_colors USING ("productId")
          JOIN colors AS "c" USING ("colorId")
          JOIN products_images USING ("productId")
          JOIN images AS "i" USING ("imageId")
        WHERE "productId" = $1
        GROUP BY "productId"
      ;`;
      const productId = [params[1]];
      db.query(select, productId)
        .then(result => {
          const product = result.rows[0];
          if (!product) {
            next();
          } else {
            res.status(200).json(product);
          }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));

});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.json([]);
  }
  const sql = `
  SELECT "ci"."color",
         "p"."productId",
         "p"."name",
         "p"."price",
         "p"."shortDescription",
         "c"."cartId",
         ARRAY_AGG("ci"."cartItemId") AS "cartItemIds"
    FROM cartItems AS "ci"
      JOIN products AS "p" USING ("productId")
      JOIN carts AS "c" USING ("cartId")
   WHERE "c"."cartId" = $1
  GROUP BY "ci"."color", "p"."productId", "c"."cartId"
  ORDER BY "p"."productId" ASC;
`;
  const { cartId } = req.session;
  const params = [cartId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const { productId, chosenColor } = req.body;
  if (!parseInt(productId, 10)) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sql = `
      SELECT "price"
        FROM  products
       WHERE "productId" = $1;
    `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows.length) {
        throw new ClientError('cannot find product', 400);
      }
      const { price } = result.rows[0];
      if (req.session.cartId) {
        const { cartId } = req.session;
        return { cartId, price };
      }
      const sql = `
        INSERT INTO carts ("cartId", "createdAt")
        VALUES (default, default)
        RETURNING "cartId";
      `;
      return (
        db.query(sql)
          .then(result => {
            const { cartId } = result.rows[0];
            return { cartId, price };
          })
      );
    })
    .then(data => {
      const { cartId, price } = data;
      req.session.cartId = cartId;
      const sql = `
        INSERT INTO cartItems ("cartId", "productId", "price", "color")
        VALUES ($1, $2, $3, $4)
        RETURNING "cartId";
      `;
      const params = [cartId, productId, price, chosenColor];
      return (
        db.query(sql, params)
          .then(result => {
            const { cartId } = result.rows[0];
            return cartId;
          })
      );
    })
    .then(cartId => {
      const sql = `
      SELECT "ci"."color",
             "p"."price",
             "p"."productId",
             "p"."name",
             "p"."shortDescription",
             "c"."cartId",
            ARRAY_AGG("ci"."cartItemId") AS "cartItemIds"
        FROM cartItems AS "ci"
          JOIN products AS "p" USING("productId")
          JOIN carts AS "c" USING("cartId")
        WHERE "c"."cartId" = $1
      GROUP BY "ci"."color", "p"."productId", "c"."cartId"
      ORDER BY "p"."productId" ASC;
      `;

      const params = [cartId];
      return (
        db.query(sql, params)
          .then(result => {
            const updatedCart = result.rows;
            res.status(201).json(updatedCart);
          })
      );
    })
    .catch(err => next(err));
});

app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const { cartItemId } = req.params;
  const sql = `
    DELETE FROM cartItems
          WHERE "cartItemId" = $1
      RETURNING *;
  `;
  const params = [cartItemId];
  db.query(sql, params)
    .then(result => {
      const deletedItem = result.rows[0];
      res.status(200).json(deletedItem);
    })
    .catch(err => console.error(err));
});

app.delete('/api/cart/all/:cartId-:productId-:color', (req, res, next) => {
  const { cartId, productId, color } = req.params;
  const sql = `
    DELETE FROM cartItems
          WHERE "cartId" = $1 AND "productId" = $2 AND "color" = $3
      RETURNING *;
  `;
  const params = [cartId, productId, color];
  db.query(sql, params)
    .then(result => {
      const deletedItems = result.rows;
      res.status(200).json(deletedItems);
    })
    .catch(err => console.error(err));
});

app.post('/api/orders', (req, res, next) => {
  const { cartId } = req.session;
  if (!cartId) {
    return res.status(400).json({
      error: 'no cart found'
    });
  }
  const { name, creditCard, shippingAddress } = req.body;
  if (name && creditCard && shippingAddress) {
    const sql = `
       INSERT INTO
            orders ("cartId", "name", "creditCard", "shippingAddress")
            VALUES ($1, $2, $3, $4)
         RETURNING *;
    `;
    const params = [cartId, name, creditCard, shippingAddress];
    db.query(sql, params)
      .then(result => {
        delete req.session.cartId;
        const order = result.rows[0];
        res.status(201).json(order);
      })
      .catch(err => next(err));
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
