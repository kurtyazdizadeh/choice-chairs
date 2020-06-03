import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => {
        return res.json();
      })
      .then(productArray => {
        this.setState({ products: productArray });
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderListItems() {
    const listItemElements = this.state.products.map(product => {
      const {
        productId,
        name,
        price,
        chosenColor,
        colors,
        images,
        shortDescription,
        longDescription
      } = product;
      return (
        <ProductListItem
          key={productId}
          productId={productId}
          name={name}
          images={images}
          price={(price / 100).toFixed(2)}
          desc={shortDescription}
          longDesc={longDescription}
          color={chosenColor}
          colorOptions={colors}
        />
      );
    });
    return listItemElements;
  }

  render() {
    let products = this.renderListItems();

    if (!this.state.products.length) {
      products = <div>Loading...</div>;
    }
    return (
      <>
        <div className="row col-12 mb-2 hero-image position-relative">
          <span className="hero-text text-light position-absolute">
            &emsp; When you make the right CHOICE<br/>
            you have the best seat in the house!
          </span>
        </div>
        {products}
      </>
    );
  }
}

export default ProductList;
