import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      cardHolder: '',
      creditCard: '',
      cvv: '',
      month: '',
      year: '',
      terms: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(event) {
    const change = {};
    const { id, value } = event.target;

    switch (id) {
      case 'name':
        change.name = value;
        break;
      case 'email':
        change.email = value;
        break;
      case 'phone':
        change.phone = value;
        break;
      case 'address1':
        change.address1 = value;
        break;
      case 'address2':
        change.address2 = value;
        break;
      case 'city':
        change.city = value;
        break;
      case 'state':
        change.state = value;
        break;
      case 'zip':
        change.zip = value;
        break;
      case 'cardHolder':
        change.cardHolder = value;
        break;
      case 'creditCard':
        change.creditCard = value;
        break;
      case 'cvv':
        change.cvv = value;
        break;
      case 'month':
        change.month = value;
        break;
      case 'year':
        change.year = value;
        break;
      case 'terms':
        this.setState({ terms: !this.state.terms });
        return;
      default:
        break;
    }
    this.setState(change);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      name,
      email,
      phone,
      cardHolder,
      creditCard,
      cvv,
      expirationDate,
      shippingAddress
    } = this.state;

    const order = {
      name,
      email,
      phone,
      cardHolder,
      creditCard,
      cvv,
      expirationDate,
      shippingAddress
    };

    this.props.placeOrder(order);
    this.resetForm();
  }

  resetForm() {
    this.setState({
      name: '',
      email: '',
      phone: '',
      shippingAddress: '',
      cardHolder: '',
      creditCard: '',
      cvv: 0,
      expirationDate: ''
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
      <>
        <div className="container m-3 p-2">
          <div className="row">
            <div className="h-100 p-3 col-12 col-md-7 bg-light rounded">
              <form
                className="col"
                onSubmit={this.handleSubmit}>
                <h4>Shipping Information</h4>
                <div className="form-group">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="First Last"
                    required
                    onChange={this.handleChange} />
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      required
                      placeholder="name@email.com"
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      required
                      placeholder="555-555-5555"
                      onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address1">Address:</label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    className="form-control"
                    required
                    placeholder="123 Street Name St."
                    onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="address2">Address 2:</label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    className="form-control"
                    required
                    placeholder="Apt/Suite #, PO Box"
                    onChange={this.handleChange} />
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="form-control"
                      required
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="state">State:</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="form-control"
                      required
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="zip">Zip:</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      className="form-control"
                      required
                      onChange={this.handleChange} />
                  </div>
                </div>
                <hr/>
                <h4>Billing Information</h4>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="cardHolder">Name on Card:</label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      className="form-control"
                      required
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="creditCard">Credit Card:</label>
                    <input
                      type="text"
                      id="creditCard"
                      name="creditCard"
                      className="form-control"
                      required
                      onChange={this.handleChange} />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-3">
                    <label htmlFor="month">Month</label>
                    <input
                      type="text"
                      id="month"
                      name="month"
                      className="form-control"
                      required
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="year">Year:</label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      className="form-control"
                      required
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="cvv">CVV:</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      className="form-control"
                      required
                      onChange={this.handleChange} />
                  </div>
                </div>
                <hr/>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="terms"
                      type="checkbox"
                      id="terms"
                      onChange={this.handleChange}
                      required />
                    <label className="form-check-label" htmlFor="terms">
                        I acknowledge that this website is for demonstration purposes only. I will not submit
                        personally identifiable information (real names, addresses, credit card numbers) on this form.
                        No actual payment processing will be done and no orders will be placed.
                    </label>
                  </div>
                </div>
                <hr/>
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
              <h2>My Cart</h2>
              {this.renderCartPreview()}
              <h5
                className="text-secondary">
              Order Total: ${this.props.orderTotal}
              </h5>
            </div>

          </div>
        </div>
      </>
    );
  }
}

export default CheckoutForm;
