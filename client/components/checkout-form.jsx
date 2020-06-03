import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(event) {
    const change = {};
    switch (event.target.id) {
      case 'name':
        change.name = event.target.value;
        break;
      case 'creditCard':
        change.creditCard = event.target.value;
        break;
      case 'shippingAddress':
        change.shippingAddress = event.target.value;
        break;
      default:
        break;
    }
    this.setState(change);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, creditCard, shippingAddress } = this.state;

    const order = {
      name: name,
      creditCard: creditCard,
      shippingAddress: shippingAddress
    };

    this.props.placeOrder(order);
    this.resetForm();
  }

  resetForm() {
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
  }

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
      <div className="container m-3 p-2">
        <div className="row">
          <div className="h-100 p-3 col-12 col-md-7 bg-light rounded">
            <h2>My Cart</h2>
            <h4
              className="text-secondary">
              Order Total: ${this.props.orderTotal}
            </h4>
            <form
              className="col"
              onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  required
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="creditCard">Credit Card:</label>
                <input
                  type="text"
                  id="creditCard"
                  name="creditCard"
                  className="form-control"
                  required
                  onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="shippingAddress">Shipping Address:</label>
                <textarea
                  name="shippingAddress"
                  id="shippingAddress"
                  cols="30" rows="10"
                  className="form-control"
                  required
                  onChange={this.handleChange}>
                </textarea>
              </div>
              <div className="form-group d-flex justify-content-between">
                <h4
                  className="text-secondary pointer"
                  onClick={() => {
                    this.props.history.push('/');
                  }}
                >
                  <i className="fas fa-arrow-alt-circle-left"></i>&nbsp; Continue Shopping
                </h4>
                <button className="btn btn-primary" type="submit">Place Order</button>
              </div>
            </form>
          </div>
          <div className="cart-items-container col-md-4 bg-light mx-2 p-3 h-100 rounded">
            {this.renderCartPreview()}
          </div>

        </div>
      </div>
    );
  }
}

export default CheckoutForm;
