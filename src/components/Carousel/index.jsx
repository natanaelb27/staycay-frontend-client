import React, { useState } from 'react';
import {
  Slider,
  Image,
  LeftArrow,
  RightArrow,
  Slide,
} from './style';

function Carousel({ housePhoto }) {
  const [current, setCurrent] = useState(0);
  const length = housePhoto?.length;

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(housePhoto) || housePhoto.length <= 0) {
    return null;
  }

  return (
    <Slider onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <LeftArrow ishover={isHovering.toString()} onClick={prevSlide} />
      <RightArrow ishover={isHovering.toString()} onClick={nextSlide} />
      {housePhoto?.map((item, index) => (
        <Slide key={item.photo_id} className={index === current ? 'active' : ''}>
          {index === current && (
          <Image imgSrc={`url(${item.photo})`} />
          )}
        </Slide>
      ))}
    </Slider>
  );
}

export default Carousel;
