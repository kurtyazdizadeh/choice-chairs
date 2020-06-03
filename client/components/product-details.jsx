import React from 'react';
import Gallery from './image-carousel';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    this.loadProductComponent();
  }

  componentDidUpdate() {
    this.loadProductComponent();
  }

  componentWillUnmount() {
    this.setState({ product: null });
  }

  loadProductComponent() {
    const { productId } = this.props.match.params;
    const searchQuery = new URLSearchParams(this.props.location.search);
    const color = searchQuery.get('color');

    this.getProductDetails(productId, color);
  }

  getProductDetails(productId, color) {
    const config = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`/api/products/${productId}-${color}`, config)
      .then(res => res.json())
      .then(product => {
        this.setState({ product: product });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.product) {
      const { productId, name, images, colors, chosenColor, price, shortDescription, longDescription } = this.state.product;
      return (
        <div className="card bg-secondary h-100 col-10 col-md-8 d-flex flex-column m-3">
          <div className="row p-3">
            <h4
              className="text-white pointer"
              onClick={() => {
                this.props.history.push('/');
              }}
            >
              <i className="fas fa-arrow-alt-circle-left"></i>&nbsp; Back to Catalog
            </h4>
          </div>
          <div className="row">
            <Gallery color={chosenColor} images={images} productId={productId} />
            <div className="product-info text-white d-flex flex-column col-12 col-md-6">
              <h2 className="font-weight-bold">{name}</h2>
              <h3 className="text-white">${(price / 100).toFixed(2)}</h3>
              <h6>Colors:</h6>
              <div>
                {
                  colors.map((color, index) => {
                    return (
                      <div
                        key={index}
                        className={`${color} color ml-0 mr-2 pointer`}
                        onClick={() => {
                          this.props.history.push(`/details/${productId}?color=${color}`);
                          this.getProductDetails(productId, color);
                        }}
                      >
                      </div>);
                  })
                }
              </div>
              <p>{shortDescription}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.props.addToCart(this.state.product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="row text-white p-3">
            {longDescription}
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default ProductDetails;
