import React from 'react';

class CartSummaryItem extends React.Component {
  render() {
    const { productId, cartItemId, color, count, name, price, shortDescription } = this.props.item;
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
            src={`./images/${productId}/${color}-default.webp`}
            alt={name}
            className="img-fluid scale float-left pr-3 summary-image"
          />
          <div>
            <h4 className="font-weight-bold">{`${name} - ${color[0].toUpperCase() + color.slice(1)}`}</h4>
            <h5 className="text-secondary">${(price / 100).toFixed(2)} each</h5>
            <p>{shortDescription}</p>
            {
            /* change this to a - + button around count that will increment/decrement cart
              could use input with value set to current count, onChange run update to recalc subtotal
              also have plus/minus to change by 1
            */}
            <p>Count: {count}</p>
            <p><em>Subtotal: ${(price / 100).toFixed(2) * count}</em></p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
