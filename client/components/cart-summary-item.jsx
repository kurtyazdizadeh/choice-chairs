import React from 'react';

class CartSummaryItem extends React.Component {
  render() {
    const { productId, cartItemId, chosenColor, name, price, shortDescription } = this.props.item;
    return (
      <div className="card p-3 my-3 mx-auto">
        <i
          className="fa fa-trash text-danger text-right pointer"
          onClick={() => {
            this.props.deleteFromCart(cartItemId);
          }}
        >
        </i>
        <div className="d-flex align-items-center">
          <img
            src={`./images/${productId}/${chosenColor}-default.webp`}
            alt={name}
            className="img-fluid scale float-left pr-3 summary-image"
          />
          <div>
            <h4 className="font-weight-bold">{`${name} - ${chosenColor[0].toUpperCase() + chosenColor.slice(1)}`}</h4>
            <h5 className="text-secondary">${(price / 100).toFixed(2)}</h5>
            <p>{shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
