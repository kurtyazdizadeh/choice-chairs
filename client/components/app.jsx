import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      cart: []
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
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
      .then(product => {
        const cartCopy = [...this.state.cart];
        cartCopy.push(product);
        this.setState({ cart: cartCopy });
      })
      .catch(err => console.error(err));
  }

  render() {
    // return this.state.isLoading
    //   ? <h1>Testing connections...</h1>
    //   : <h1>{this.state.message}</h1>;
    return (
      <>
        <Router>
          <div className="bg-light">
            <Header cartItemCount={this.state.cart.length} />
            <div className="mt-4 py-5">
              <div className="products">
                <div className="row justify-content-center mx-1">
                  <Switch>
                    <Route path="/details/:productId"
                      render={props =>
                        <ProductDetails {...props}
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
            </div>
          </div>
        </Router>
      </>
    );

  }
}
