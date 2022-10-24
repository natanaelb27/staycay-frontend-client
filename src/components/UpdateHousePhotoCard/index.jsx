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
import { useDeleteHousePhotoByIDMutation } from '../../store/slices/apiSlice';

function UpdateHousePhotoCard({ housePhotoData }) {
  const [deleteHousePhoto] = useDeleteHousePhotoByIDMutation();
  const handleDeletePhoto = () => {
    deleteHousePhoto(housePhotoData?.photo_id);
  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <MainContainer onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {/* <img src={housePhotoData?.photo} alt="" /> */}
      <DeleteImageContainer ishover={isHovering.toString()}>
        <DeleteImageContentContainer onClick={handleDeletePhoto}>
          <InputSpan>Delete</InputSpan>
          <Icon icon={faTrashAlt} />
        </DeleteImageContentContainer>
      </DeleteImageContainer>
      <Image imgSrc={`url(${housePhotoData?.photo})`} />
    </MainContainer>
  );
}

export default UpdateHousePhotoCard;
