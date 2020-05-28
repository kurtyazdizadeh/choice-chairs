import React from 'react';

class ProductListItem extends React.Component {

  render() {
    // const { name, image, price, desc, color, productId } = this.props;
    const { name, price, desc, color, productId } = this.props;
    const image = 'default';
    return (
      <div
        className="card product-item m-2 col-11 col-md-5 col-lg-3 pointer"
        // onClick={() => {
        //   setView(name, { productId: productId });
        // }}
      >
        <img src={`./images/${productId}/${color}-front.webp`} className="card-img-top mt-3 scale img-fluid bottom" alt={name} />
        <img src={`./images/${productId}/${color}-${image}.webp`} className="card-img-top mt-3 scale img-fluid top" alt={name} />
        <div className="card-body">
          <h5 className="card-title font-weight-bold">{name}</h5>
          <h6 className="text-secondary">${price}</h6>
          <p className="card-text">{desc}</p>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
