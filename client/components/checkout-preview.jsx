import React from 'react';

class CheckoutPreview extends React.Component {
  renderCartPreview() {
    const cartItems = this.props.cart.map(item => {
      const { name, price, cartItemIds, productId, color } = item;
      return (
        <div
          className="cart-items bg-white rounded mb-2 pl-0 py-2 pr-2 d-flex justify-content-around align-items-center"
          key={`${productId}-${color}`}
        >
          <div className="w-50">
            <img className="scale img-fluid" src={`./images/${productId}/${color}-default.webp`} alt={`${name}-${color}`} />
          </div>
          <div>
            <p>{`${name[0].toUpperCase() + name.slice(1)} - ${color[0].toUpperCase() + color.slice(1)}`}</p>
            <p>Quantity: {cartItemIds.length}</p>
            <p>Subtotal: ${((price * cartItemIds.length) / 100).toFixed(2)}</p>
          </div>
        </div>
      );
    });

    return cartItems;
  }

  render() {
    return (
      <div className="cart-items-container col-md-4 bg-light mx-2 p-3 h-100 rounded">
        <h2>My Cart</h2>
        {this.renderCartPreview()}
        <h5
          className="text-secondary">
          Order Total: ${this.props.orderTotal}
        </h5>
      </div>
    );
  }
}

export default CheckoutPreview;
