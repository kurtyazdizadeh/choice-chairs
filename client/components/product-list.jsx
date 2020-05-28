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
      const { productid, name, price, chosencolor, shortdescription } = product;
      return (
        <ProductListItem
          key={productid}
          productId={productid}
          name={name}
          // image={image}
          price={(price / 100).toFixed(2)}
          desc={shortdescription}
          color={chosencolor}
          // setView={this.props.setView}
        />
      );
    });
    return listItemElements;
  }

  render() {
    return (
      this.state.products.length
        ? this.renderListItems()
        : <div>Loading...</div>
    );
  }
}

export default ProductList;
