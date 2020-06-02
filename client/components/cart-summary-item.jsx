import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    this.setState({ count: this.props.item.cartItemIds.length });
  }

  render() {
    const { productId, cartId, cartItemIds, color, name, price, shortDescription } = this.props.item;
    const { count } = this.state;

    return (
      <div className="card p-3 my-3 mx-auto">
        <i
          className="fa fa-trash text-danger text-right pointer"
          onClick={() => {
            this.props.deleteAllFromCart(cartId, productId);
          }}
        >
        </i>
        <div className="d-flex align-items-center">
          <img
            src={`./images/${productId}/${color}-default.webp`}
            alt={name}
            className="img-fluid scale float-left pr-3 summary-image"
          />
          <div>
            <h4 className="font-weight-bold">{`${name} - ${color[0].toUpperCase() + color.slice(1)}`}</h4>
            <h5 className="text-secondary">${(price / 100).toFixed(2)} each</h5>
            <p>{shortDescription}</p>
            <div className="input-group mb-3 item-count">
              <span className="input-group-btn">
                <button
                  type="button"
                  className="btn btn-default btn-number"
                  onClick={() => {
                    this.props.deleteFromCart(cartItemIds.pop());
                    this.setState({ count: count - 1 });
                  }}
                >
                  <span className="fas fa-minus"></span>
                </button>
              </span>
              <input
                type="text"
                className="form-control input-number text-center"
                value={count}
                disabled
              >
              </input>
              <span className="input-group-btn">
                <button
                  type="button"
                  className="btn btn-default btn-number"
                  onClick={() => {
                    this.props.addToCart({ productId, chosenColor: color });
                    this.setState({ count: count + 1 });
                  }}
                >
                  <span className="fas fa-plus"></span>
                </button>
              </span>
            </div>
            <p><em>Subtotal: ${(price / 100).toFixed(2) * count}</em></p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
