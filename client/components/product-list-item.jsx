import React from 'react';

class ProductListItem extends React.Component {

  render() {
    const { name, price, desc, images, colorOptions, productId } = this.props;
    return (
      <div
        className="card product-item m-2 col-11 col-md-5 col-lg-3"
        // onClick={() => {
        //   setView(name, { productId: productId });
        // }}
      >
        <div className="card-image pointer">
          <img src={`./images/${productId}/${colorOptions[0]}-${images[1]}.webp`} className="card-img-top mt-3 scale img-fluid bottom" alt={name} />
          <img src={`./images/${productId}/${colorOptions[0]}-${images[0]}.webp`} className="card-img-top mt-3 scale img-fluid top" alt={name} />
        </div>
        <div className="card-body">
          <div className="d-flex">
            <div className="mr-auto">
              <h5 className="card-title font-weight-bold">{name}</h5>
              <h6 className="text-secondary">${price}</h6>
            </div>
            <div>
              <h6 className="my-1">Colors:</h6>
              {
                colorOptions.map((color, index) => {
                  return <div key={index} className={`${color} color ml-0 pointer`}></div>;
                })
              }
            </div>
          </div>
          <p className="card-text">{desc}</p>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
