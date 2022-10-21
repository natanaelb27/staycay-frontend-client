/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Container,
  Title,
  ContentContainer,
  ContentTitle,
  ContentSpan,
  RemainingBalanceSpan,
  ButtonContainer,
} from './style';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import {
  numberWithCommas,
} from '../../helpers';
import { useGetUserProfileQuery } from '../../store/slices/apiSlice';

function ReservationPaymentSection({ totalPrice }) {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetUserProfileQuery();

  const isBalanceNotEnough = parseInt(userData?.data.balance, 10) < totalPrice;

  const getRemainingBalance = () => {
    const remainingBalance = (parseInt(userData?.data.balance, 10) || 0) - totalPrice;
    if (remainingBalance < 0) {
      return `- Rp ${numberWithCommas(Math.abs(remainingBalance))}`;
    }
    return numberWithCommas(remainingBalance);
  };

  return (
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
          <Button>Topup</Button>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button isDisabled={isBalanceNotEnough}>Confirm and pay</Button>
        </ButtonContainer>
      )}

    </Container>
  );
}

export default ReservationPaymentSection;
