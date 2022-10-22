/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import moment from 'moment';
import { useGetReservationByIDQuery, useGetHouseByIDQuery, useGetUserByIDQuery } from '../../store/slices/apiSlice';
import {
  MainContainer,
  TitleContainer,
  BackIcon,
  Title,
  Container,
  ContentContainer,
  QRContainer,
  SpanTitle,
  SpanDetail,
} from './style';

function ReservationDetail() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    data: reservationData,
    error: reservationError,
    loading: reservationLoading,
  } = useGetReservationByIDQuery(params.reservationID);

  const {
    data: houseData,
    error: houseError,
    loading: houseLoading,
  } = useGetHouseByIDQuery(
    parseInt(reservationData?.data.reservation.house_id, 10),
    { skip: reservationData?.data.reservation.house_id === undefined },
  );

  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useGetUserByIDQuery(
    parseInt(reservationData?.data.reservation.user_id, 10),
    { skip: reservationData?.data.reservation.user_id === undefined },
  );

  const {
    data: hostData,
    error: hostError,
    loading: hostLoading,
  } = useGetUserByIDQuery(
    parseInt(houseData?.data.host_id, 10),
    { skip: houseData?.data.host_id === undefined },
  );

  if (reservationError?.data.code === 403) {
    navigate('/forbidden');
  }

  if (reservationError?.data.code === 500 || houseError?.data.code === 500) {
    navigate('/server-error');
  }

  const handleClickBack = () => {
    navigate('/account');
  };

  return (
    <MainContainer>
      <TitleContainer>
        <BackIcon onClick={handleClickBack} />
        <Title>Your Reservation</Title>
      </TitleContainer>
      {(houseLoading && reservationLoading) && (<p>LOADING</p>)}
      {(!houseLoading && !reservationError) && (
        <Container>
          <ContentContainer>
            <SpanTitle>Reservation Code:</SpanTitle>
            <SpanDetail>{reservationData?.data.reservation.reservation_code}</SpanDetail>
          </ContentContainer>
          <ContentContainer>
            <SpanTitle>House Name:</SpanTitle>
            <SpanDetail>{houseData?.data.house_name}</SpanDetail>
          </ContentContainer>
          <ContentContainer>
            <SpanTitle>House City:</SpanTitle>
            <SpanDetail>{houseData?.data.house_city_name}</SpanDetail>
          </ContentContainer>
          <ContentContainer>
            <SpanTitle>Host Name:</SpanTitle>
            <SpanDetail>{hostData?.data.name}</SpanDetail>
          </ContentContainer>
          <ContentContainer>
            <SpanTitle>Check In Date:</SpanTitle>
            <SpanDetail>{moment(reservationData?.data.reservation.check_in_date).format('D MMMM YYYY')}</SpanDetail>
          </ContentContainer>
          <ContentContainer>
            <SpanTitle>Check Out Date:</SpanTitle>
            <SpanDetail>{moment(reservationData?.data.reservation.check_out_date).format('D MMMM YYYY')}</SpanDetail>
          </ContentContainer>
          <ContentContainer>
            <SpanTitle>Guest Name:</SpanTitle>
            <SpanDetail>{userData?.data.name}</SpanDetail>
          </ContentContainer>
          <QRContainer>
            <QRCode
              value="http://localhost:3000/reservation-detail/12"
            />
            <SpanDetail>Show this to the host </SpanDetail>
          </QRContainer>
        </Container>
      )}
    </MainContainer>

  );
}

export default ReservationDetail;
