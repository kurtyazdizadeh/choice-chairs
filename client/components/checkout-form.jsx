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

  render() {
    return (
      <div className="m-3 container">
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
    );
  }
}

export default CheckoutForm;
