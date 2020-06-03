import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      cart: []
    };
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.deleteAllFromCart = this.deleteAllFromCart.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));

    this.getCartItems();
  }

  addToCart(product) {
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };

    fetch('/api/cart', fetchConfig)
      .then(res => res.json())
      .then(newCart => {
        this.setState({ cart: newCart });
      })
      .catch(err => console.error(err));
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cartItems => {
        this.setState({ cart: cartItems });
      })
      .catch(err => console.error(err));
  }

  deleteFromCart(cartItemId) {
    fetch(`/api/cart/${cartItemId}`, { method: 'DELETE' })
      .then(result => result.json())
      .then(deletedItem => this.getCartItems())
      .catch(err => console.error(err));
  }

  deleteAllFromCart(cartId, productId, color) {
    fetch(`/api/cart/all/${cartId}-${productId}-${color}`, { method: 'DELETE' })
      .then(result => result.json())
      .then(data => this.getCartItems())
      .catch(err => console.error(err));
  }

  render() {
    // return this.state.isLoading
    //   ? <h1>Testing connections...</h1>
    //   : <h1>{this.state.message}</h1>;
    const { cart } = this.state;
    let orderTotal = 0;
    let numOfCartItems = 0;
    if (cart.length) {
      orderTotal = cart.reduce((a, b) => ({ price: a.price + (b.price * b.cartItemIds.length) }), { price: 0 });
      orderTotal = (orderTotal.price / 100).toFixed(2);
      numOfCartItems = cart.reduce((a, b) => (a + b.cartItemIds.length), 0);
    }
    return (
      <>
        <Router>
          <Header cartItemCount={numOfCartItems} />
          <main>
            <div className="products container-fluid">
              <div className="background row justify-content-center">
                <Switch>
                  <Route path="/details/:productId"
                    render={props =>
                      <ProductDetails {...props}
                        addToCart={this.addToCart}
                      />}
                  />
                  <Route path="/cart"
                    render={props =>
                      <CartSummary {...props}
                        cart={cart}
                        addToCart={this.addToCart}
                        deleteAllFromCart={this.deleteAllFromCart}
                        deleteFromCart={this.deleteFromCart}
                        orderTotal={orderTotal}
                      />}
                  />
                  <Route path="/checkout"
                    render={props =>
                      <CheckoutForm {...props}
                        orderTotal={orderTotal}
                        cart={cart}
                      />}
                  />
                  <Route path="/"
                    render={props =>
                      <ProductList {...props}
                      />}
                  />
                </Switch>

              </div>
            </div>
          </main>
        </Router>
      </>
    );

  }
}
