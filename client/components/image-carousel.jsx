import React from 'react';
import { Carousel } from 'react-responsive-carousel';

class Gallery extends React.Component {
  render() {
    const { color, images, productId } = this.props;
    return (
      <Carousel
        className="col col-md-6"
        showArrows={false}
        showStatus={false}
        thumbWidth={55}
      >
        {images.map(image => {
          return (
            <div key={productId}>
              <img
                src={`../images/${productId}/${color}-${image}.webp`}
                alt={`${image} view`}
                className="pointer"
              />
            </div>
          );
        })}
      </Carousel>
    );
  }
}

export default Gallery;
