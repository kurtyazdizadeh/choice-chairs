import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      cart: []
    };
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
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
