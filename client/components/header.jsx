import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar text-white fixed-top">
        <h3
          className="pointer"
          onClick={() => {
            this.props.history.push('/');
          }}
        >
          <i className="fas fa-chair"></i>
          &nbsp; Choice Chairs
        </h3>
        <span
          className="pointer"
          onClick={() => {
            this.props.history.push('/cart');
          }}
        >
          {this.props.cartItemCount} Items &nbsp;
          <i className="fas fa-shopping-cart"></i>
        </span>
      </nav>
    );
  }
}

export default withRouter(Header);
