/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Container,
  Title,
  ContentContainer,
  ContentTitle,
  ContentSpan,
  RemainingBalanceSpan,
  ButtonContainer,
} from './style';
import TopUpModal from '../TopUpModal';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import {
  numberWithCommas,
} from '../../helpers';
import { useGetUserProfileQuery, useAddReservationMutation } from '../../store/slices/apiSlice';
import { showErrorToast } from '../../helpers/Toast';
import SkeletonTextBig from '../Skeleton/SkeletonTextBig';

function ReservationPaymentSection({
  houseID, checkInDate, checkOutDate, totalPrice,
}) {
  const navigate = useNavigate();

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetUserProfileQuery();

  const [addReservation] = useAddReservationMutation();
  const [showModal, setShowModal] = useState(false);

  const isBalanceNotEnough = parseInt(userData?.data.balance, 10) < totalPrice;
  const getRemainingBalance = () => {
    const remainingBalance = (parseInt(userData?.data.balance, 10) || 0) - totalPrice;
    if (remainingBalance < 0) {
      return `- Rp ${numberWithCommas(Math.abs(remainingBalance))}`;
    }
    return `Rp ${numberWithCommas(remainingBalance)}`;
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handleTopup = () => {
    setShowModal(false);
  };

  const handleMakeReservation = () => {
    addReservation({
      houseID: parseInt(houseID, 10),
      checkInDate,
      checkOutDate,
    })
      .unwrap()
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch((error) => {
        if (!error.data) {
          showErrorToast('Server is currently down, please try again later!');
        }
        showErrorToast(error.data.message);
      });
  };

  return (
    <>
      {
        userLoading && (
          <SkeletonTextBig />
        )
      }
      {!userLoading && !userError && (
      <Container>
        <Title>Confirm and pay</Title>
        <ContentContainer>
          <ContentTitle>Your Balance</ContentTitle>
          <ContentSpan>
            Rp
            {' '}
            {numberWithCommas(parseInt(userData?.data.balance, 10))}
          </ContentSpan>
        </ContentContainer>
        <ContentContainer>
          <ContentTitle>Total Price</ContentTitle>
          <ContentSpan>
            Rp
            {' '}
            {numberWithCommas(totalPrice)}
          </ContentSpan>
        </ContentContainer>
        <ContentContainer>
          <ContentTitle>Remaning Balance</ContentTitle>
          <RemainingBalanceSpan isNotEnough={isBalanceNotEnough.toString()}>
            {getRemainingBalance()}
          </RemainingBalanceSpan>
        </ContentContainer>
        {isBalanceNotEnough
          ? (<ErrorMessage>Your balance is not enough</ErrorMessage>) : null}
        {isBalanceNotEnough ? (
          <ButtonContainer>
            <Button handleClick={handleModal}>Topup</Button>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <Button
                // isDisabled={isBalanceNotEnough}
              handleClick={handleMakeReservation}
            >
              Confirm and pay

            </Button>
          </ButtonContainer>
        )}
        <TopUpModal
          isShow={showModal}
          onClose={() => setShowModal(false)}
          handleSubmit={handleTopup}
        />
        <ToastContainer />
      </Container>
      )}
    </>
  );
}

export default ReservationPaymentSection;
