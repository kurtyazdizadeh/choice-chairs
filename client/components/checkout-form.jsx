import React from 'react';
import classNames from 'classnames';
import validator from 'validator';
import CheckoutPreview from './checkout-preview';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.formDefaults = {
      name: { value: '', message: '' },
      email: { value: '', message: '' },
      phone: { value: '', message: '' },
      address1: { value: '', message: '' },
      address2: { value: '', message: '' },
      city: { value: '', message: '' },
      state: { value: '', message: '' },
      zip: { value: '', message: '' },
      cardHolder: { value: '', message: '' },
      creditCard: { value: '', message: '' },
      cvv: { value: '', message: '' },
      month: { value: '', message: '' },
      year: { value: '', message: '' },
      terms: false,
      isValid: {
        name: true,
        email: true,
        phone: true,
        address1: true,
        address2: true,
        city: true,
        state: true,
        zip: true,
        cardHolder: true,
        creditCard: true,
        cvv: true,
        month: true,
        year: true
      }
    };
    this.state = { ...this.formDefaults };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    if (name === 'terms') {
      this.setState({ terms: !this.state.terms });
      return;
    }
    const state = {
      ...this.state,
      [name]: {
        ...this.state[name],
        value: value
      }
    };
    this.setState(state);
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

    if (this.formIsValid()) {
      const order = {
        name,
        email,
        phone,
        cardHolder,
        creditCard,
        cvv
      };
    } else console.log('uh oh');

    //   this.props.placeOrder(order);

    // }
    // this.resetForm();
  }

  formIsValid() {
    const {
      name,
      email,
      phone,
      address1,
      city,
      state,
      zip,
      cardHolder,
      creditCard,
      cvv,
      month,
      year,
      isValid
    } = this.state;
    let isGood = true;

    if (!name.value.includes(' ') || name.value.length === 0) {
      isValid.name = false;
      name.message = 'Please enter full name';
      isGood = false;
    }
    if (!validator.isEmail(email.value)) {
      isValid.email = false;
      email.message = 'Please enter a valid email address';
      isGood = false;
    }
    if (!validator.isNumeric(phone.value)) {
      isValid.phone = false;
      phone.message = 'Please enter a valid phone number';
      isGood = false;
    }
    if (!address1.value.match(/^\d +\s[A - z] +\s[A - z] +/g)) {
      isValid.address1 = false;
      address1.message = 'Please enter a valid address (must start with a #)';
      isGood = false;
    }
    if (!validator.isAlpha(city.value.trim())) {
      isValid.city = false;
      city.message = 'Please enter a valid city name';
      isGood = false;
    }
    if (!validator.isAlpha(state.value) || state.value.length !== 2) {
      isValid.state = false;
      state.message = 'Please select a state';
      isGood = false;
    }
    if (!validator.isInt(zip.value)) {
      isValid.zip = false;
      zip.message = 'Please enter a valid zip code';
      isGood = false;
    }
    if (!validator.contains(cardHolder.value.trim(), ' ')) {
      isValid.cardHolder = false;
      cardHolder.message = 'Please enter a valid name (as seen on credit card)';
      isGood = false;
    }
    if (!validator.isCreditCard(creditCard.value)) {
      isValid.creditCard = false;
      creditCard.message = 'Please enter a valid credit card number';
      isGood = false;
    }
    if (!validator.isInt(cvv.value) || cvv.value.length !== 3) {
      isValid.cvv = false;
      cvv.message = 'Please enter a valid CVV code (3 numbers)';
      isGood = false;
    }
    if (!validator.isInt(month.value) || month.value.length !== 2) {
      isValid.month = false;
      month.message = 'Please select a month';
      isGood = false;
    }
    if (!validator.isInt(year.value) || year.value.length !== 4) {
      isValid.year = false;
      year.message = 'Please select a year';
      isGood = false;
    }

    const newState = {
      name,
      email,
      phone,
      address1,
      city,
      state,
      zip,
      cardHolder,
      creditCard,
      cvv,
      month,
      year,
      isValid
    };

    if (!isGood) {
      this.setState(newState);
    }

    return isGood;

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
      terms,
      isValid
    } = this.state;

    const nameControlClass = classNames('form-control', { 'is-invalid': !isValid.name });
    const emailControlClass = classNames('form-control', { 'is-invalid': !isValid.email });
    const phoneControlClass = classNames('form-control', { 'is-invalid': !isValid.phone });
    const address1ControlClass = classNames('form-control', { 'is-invalid': !isValid.address1 });
    const address2ControlClass = classNames('form-control', { 'is-invalid': !isValid.address2 });
    const cityControlClass = classNames('form-control', { 'is-invalid': !isValid.city });
    const stateControlClass = classNames('form-control', { 'is-invalid': !isValid.state });
    const zipControlClass = classNames('form-control', { 'is-invalid': !isValid.zip });
    const cardHolderControlClass = classNames('form-control', { 'is-invalid': !isValid.cardHolder });
    const creditCardControlClass = classNames('form-control', { 'is-invalid': !isValid.creditCard });
    const cvvControlClass = classNames('form-control', { 'is-invalid': !isValid.cvv });
    const monthControlClass = classNames('form-control', { 'is-invalid': !isValid.month });
    const yearControlClass = classNames('form-control', { 'is-invalid': !isValid.year });

    return (
      <>
        <div className="container m-3 p-2">
          <div className="row">
            <div className="h-100 p-3 col-12 col-md-7 bg-light rounded">
              <form
                className="col"
                onSubmit={this.handleSubmit}
              >
                <h4>Shipping Information</h4>
                <div className="form-group">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={nameControlClass}
                    placeholder="First Last"
                    value={name.value}
                    autoFocus
                    onChange={this.handleChange}
                  />
                  <small className="invalid-feedback">{name.message}</small>
                </div>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className={emailControlClass}
                      placeholder="name@email.com"
                      value={email.value}
                      onChange={this.handleChange}
                    />
                    <small className="invalid-feedback">{email.message}</small>
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className={phoneControlClass}
                      placeholder="555-555-5555"
                      value={phone.value}
                      onChange={this.handleChange}
                    />
                    <small className="invalid-feedback">{phone.message}</small>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address1">Address:</label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    className={address1ControlClass}
                    placeholder="123 Street Name St."
                    value={address1.value}
                    onChange={this.handleChange}
                  />
                  <small className="invalid-feedback">{address1.message}</small>
                </div>
                <div className="form-group">
                  <label htmlFor="address2">Address 2:</label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    className={address2ControlClass}
                    placeholder="Apt/Suite #, PO Box"
                    value={address2.value}
                    onChange={this.handleChange}
                  />
                  <small className="invalid-feedback">{address2.message}</small>
                </div>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label htmlFor="city">City:</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className={cityControlClass}
                      value={city.value}
                      onChange={this.handleChange}
                    />
                    <small className="invalid-feedback">{city.message}</small>
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="state">State:</label>
                    <select
                      id="state"
                      className={stateControlClass}
                      value={state.value}
                      name="state"
                      onChange={this.handleChange}>
                      <option defaultValue>Select</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                    <small className="invalid-feedback">{state.message}</small>
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="zip">Zip:</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      className={zipControlClass}
                      value={zip.value}
                      onChange={this.handleChange}
                    />
                    <small className="invalid-feedback">{zip.message}</small>
                  </div>
                </div>
                <hr/>
                <h4>Billing Information</h4>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label htmlFor="cardHolder">Name on Card:</label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      className={cardHolderControlClass}
                      value={cardHolder.value}
                      onChange={this.handleChange}
                    />
                    <small className="invalid-feedback">{cardHolder.message}</small>
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="creditCard">Credit Card:</label>
                    <input
                      type="text"
                      id="creditCard"
                      name="creditCard"
                      className={creditCardControlClass}
                      value={creditCard.value}
                      onChange={this.handleChange}
                    />
                    <small className="invalid-feedback">{creditCard.message}</small>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-3">
                    <label htmlFor="month">Month:</label>
                    <select
                      id="month"
                      name="month"
                      className={monthControlClass}
                      value={month.value}
                      onChange={this.handleChange}
                    >
                      <option defaultValue>--</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    <small className="invalid-feedback">{month.message}</small>
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="year">Year:</label>
                    <select
                      id="year"
                      name="year"
                      className={yearControlClass}
                      value={year.value}
                      onChange={this.handleChange}
                    >
                      <option defaultValue="----">----</option>
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
                    <small className="invalid-feedback">{year.message}</small>
                  </div>
                  <div className="form-group col-3">
                    <label htmlFor="cvv">CVV:</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      className={cvvControlClass}
                      value={cvv.value}
                      onChange={this.handleChange}
                    />
                    <small className="invalid-feedback">{cvv.message}</small>
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
                      required
                      value={terms}
                      onChange={this.handleChange}
                    />
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
