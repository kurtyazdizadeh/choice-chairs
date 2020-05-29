import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
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
      const { productid, name, images, colors, chosencolor, price, shortdescription, longdescription } = this.state.product;
      return (
        <div className="card col-11 col-md-8 d-flex flex-column m-3">
          <div className="row p-3">
            <h4
              className="text-secondary pointer"
              onClick={() => {
                this.props.history.push('/');
              }}
            >
              &lt; Back to Catalog
            </h4>
          </div>
          <div className="row">
            <img src={`../images/${productid}/${chosencolor}-${images[0]}.webp`} alt={name} className="col-12 col-md-6 scale limit-height" />
            <div className="product-info d-flex flex-column col-12 col-md-6">
              <h2 className="font-weight-bold">{name}</h2>
              <h3 className="text-secondary">${(price / 100).toFixed(2)}</h3>
              <h6>Colors:</h6>
              <div>
                {
                  colors.map((color, index) => {
                    return (
                      <div
                        key={index}
                        className={`${color} color ml-0 pointer`}
                        onClick={() => {
                          this.props.history.push(`/details/${productid}?color=${color}`);
                          this.getProductDetails(productid, color);
                        }}
                      >
                      </div>);
                  })
                }
              </div>
              <p>{shortdescription}</p>
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
          <div className="row p-3">
            {longdescription}
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default ProductDetails;