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
      ARRAY_AGG(distinct "i"."imagetype") AS "images"
    FROM products as "p"
      JOIN products_colors USING ("productid")
      JOIN colors as "c" USING ("colorid")
      JOIN products_images USING ("productid")
      JOIN images as "i" USING ("imageid")
    GROUP BY productid
    ORDER BY productid;
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
    SET chosencolor = $1
    WHERE productid = $2;
  `;
  const params = [color, productId];
  db.query(sql, params)
    .then(result => {
      const select = `
        SELECT
          "p".*,
          ARRAY_AGG(distinct "c"."name") AS "colors",
          ARRAY_AGG(distinct "i"."imagetype") AS "images"
        FROM products as "p"
          JOIN products_colors USING ("productid")
          JOIN colors as "c" USING ("colorid")
          JOIN products_images USING ("productid")
          JOIN images as "i" USING ("imageid")
        WHERE productid = $1
        GROUP BY productid
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
