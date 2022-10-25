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
import DangerModal from '../common/DangerModal';
import { useDeleteHousePhotoByIDMutation } from '../../store/slices/apiSlice';
import { showErrorToast } from '../../helpers/Toast';

function UpdateHousePhotoCard({ housePhotoData }) {
  const [deleteHousePhoto] = useDeleteHousePhotoByIDMutation();
  const [showDeletePhotoModal, setShowDeletePhotoModal] = useState(false);

  const onClickDeletePhoto = () => {
    setShowDeletePhotoModal(true);
  };

  const onCloseDeletePhotoModal = () => {
    setShowDeletePhotoModal(false);
  };

  const onDeletePhotoModal = () => {
    deleteHousePhoto(housePhotoData?.photo_id)
      .unwrap()
      .catch((error) => {
        if (!error.data) {
          showErrorToast('Server is currently down, please try again later!');
        }
        showErrorToast(error.data.message);
      });
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
        <DeleteImageContentContainer onClick={onClickDeletePhoto}>
          <InputSpan>Delete</InputSpan>
          <Icon icon={faTrashAlt} />
        </DeleteImageContentContainer>
      </DeleteImageContainer>
      <Image imgSrc={`url(${housePhotoData?.photo})`} />
      <DangerModal
        isShow={showDeletePhotoModal}
        onClose={onCloseDeletePhotoModal}
        title="Delete Photo"
        handleSubmit={onDeletePhotoModal}
        submitText="Delete"
      >
        Are you sure you want to delete this photo?
      </DangerModal>
    </MainContainer>
  );
}

export default UpdateHousePhotoCard;
