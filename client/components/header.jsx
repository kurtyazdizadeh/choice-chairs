import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark text-white fixed-top">
        <h3>
          <i className="fas fa-chair"></i>
          &nbsp; Choice Chairs
        </h3>
        <span
          className="pointer"
          // onClick={() => {
          //   this.props.setView('cart', {});
          // }}
        >
          {this.props.cartItemCount} Items &nbsp;
          <i className="fas fa-shopping-cart"></i>
        </span>
      </nav>
    );
  }
}

export default Header;
