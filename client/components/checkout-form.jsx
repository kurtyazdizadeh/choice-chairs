import React from 'react';
import CheckoutPreview from './checkout-preview';

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
    const { id, value } = event.target;

    if (id === 'terms') {
      this.setState({ terms: !this.state.terms });
      return;
    }
    this.setState({ [id]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      name,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      cardHolder,
      creditCard,
      cvv,
      month,
      year,
      terms
    } = this.state;

    const order = {
      name,
      email,
      phone,
      cardHolder,
      creditCard,
      cvv
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
                    <select
                      id="year"
                      name="year"
                      className="form-control"
                      onChange={this.handleChange}
                    >
                      <option>####</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                    </select>
                    {/* <input
                      type="text"
                      id="year"
                      name="year"
                      className="form-control"
                      required
                      onChange={this.handleChange} /> */}
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
            <CheckoutPreview
              cart={this.props.cart}
              orderTotal={this.props.orderTotal}
            />
          </div>
        </div>
      </>
    );
  }
}

export default CheckoutForm;
