/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Container,
  Title,
  ContentContainer,
  SpanTitle,
  SpanDetail,
} from './style';
import { useGetUserProfileQuery } from '../../store/slices/apiSlice';
import Button from '../common/Button';
import TopUpModal from '../TopUpModal';
import { numberWithCommas } from '../../helpers';

function UserWalletSection() {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetUserProfileQuery();

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };

  const handleTopup = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <Title>Your Wallet</Title>
      <ContentContainer>
        <SpanTitle>Current Balance</SpanTitle>
        <SpanDetail>{`Rp ${numberWithCommas(parseInt(userData?.data.balance, 10))}`}</SpanDetail>
        <Button handleClick={handleModal}>Top Up</Button>
      </ContentContainer>
      <TopUpModal
        isShow={showModal}
        onClose={() => setShowModal(false)}
        handleSubmit={handleTopup}
      />
    </Container>
  );
}

export default UserWalletSection;
