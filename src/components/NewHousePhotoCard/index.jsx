import React, { useState } from 'react';
import {
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  MainContainer,
  Image,
  DeleteImageContainer,
  DeleteImageContentContainer,
  InputSpan,
  Icon,
} from './style';

function NewHousePhotoCard({
  img,
  idx,
  handleClick,
}) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const onDeleteImage = () => {
    handleClick(idx);
  };
  return (
    <MainContainer onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <DeleteImageContainer ishover={isHovering.toString()}>
        <DeleteImageContentContainer onClick={onDeleteImage}>
          <InputSpan>Delete</InputSpan>
          <Icon icon={faTrashAlt} />
        </DeleteImageContentContainer>
      </DeleteImageContainer>
      <Image imgSrc={`url(${img})`} />
    </MainContainer>
  );
}

export default NewHousePhotoCard;
