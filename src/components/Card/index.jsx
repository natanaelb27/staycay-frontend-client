import React from 'react';
import { Wrapper } from './style';

function Card({
  bgImg, name, location, price,
}) {
  return (
    <div>
      <Wrapper img={bgImg} />
      {/* <img src={require(image)} alt="" /> */}
      {/* <span>{image}</span> */}
      <br />
      <span>{name}</span>
      <br />
      <span>{location}</span>
      <br />
      <span>{price}</span>
    </div>
  );
}

export default Card;
