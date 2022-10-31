import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import moment from 'moment';
import { SkeletonLine } from '../../components';
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
    isFetching: reservationLoading,
  } = useGetReservationByIDQuery(params.reservationID);

  const {
    data: houseData,
    error: houseError,
    isFetching: houseLoading,
  } = useGetHouseByIDQuery(
    {
      houseID: parseInt(reservationData?.data.reservation.house_id, 10),
      unscoped: 'true',
    },
    { skip: reservationData?.data.reservation.house_id === undefined },
  );

  const {
    data: userData,
    error: userError,
    isFetching: userLoading,
  } = useGetUserByIDQuery(
    parseInt(reservationData?.data.reservation.user_id, 10),
    { skip: reservationData?.data.reservation.user_id === undefined },
  );

  const {
    data: hostData,
    error: hostError,
    isFetching: hostLoading,
  } = useGetUserByIDQuery(
    parseInt(houseData?.data.host_id, 10),
    { skip: houseData?.data.host_id === undefined },
  );

  if (reservationError?.data.code === 403) {
    navigate('/forbidden');
  }

  if (reservationError?.data.code === 500
    || houseError?.data.code === 500
    || userError?.data.code === 500
    || hostError?.data.code === 500) {
    navigate('/server-error');
  }

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <MainContainer>
      <TitleContainer>
        <BackIcon onClick={handleClickBack} />
        <Title>Your Reservation</Title>
      </TitleContainer>
      <Container>
        <ContentContainer>
          <SpanTitle>Reservation Code:</SpanTitle>
          {!houseLoading && !reservationLoading && !userLoading && !hostLoading ? (
            <SpanDetail>
              {reservationData?.data.reservation.reservation_code}
            </SpanDetail>
          ) : <SkeletonLine /> }

        </ContentContainer>
        <ContentContainer>
          <SpanTitle>House Name:</SpanTitle>
          {!houseLoading && !reservationLoading && !userLoading && !hostLoading ? (
            <SpanDetail>
              {houseData?.data.house_name}
            </SpanDetail>
          ) : <SkeletonLine /> }
        </ContentContainer>
        <ContentContainer>
          <SpanTitle>House City:</SpanTitle>
          {!houseLoading && !reservationLoading && !userLoading && !hostLoading ? (
            <SpanDetail>
              {houseData?.data.house_city_name}
            </SpanDetail>
          ) : <SkeletonLine /> }
        </ContentContainer>
        <ContentContainer>
          <SpanTitle>Host Name:</SpanTitle>
          {!houseLoading && !reservationLoading && !userLoading && !hostLoading ? (
            <SpanDetail>
              {hostData?.data.name}
            </SpanDetail>
          ) : <SkeletonLine /> }
        </ContentContainer>
        <ContentContainer>
          <SpanTitle>Check In Date:</SpanTitle>
          {!houseLoading && !reservationLoading && !userLoading && !hostLoading ? (
            <SpanDetail>
              {moment(reservationData?.data.reservation.check_in_date).format('D MMMM YYYY')}
            </SpanDetail>
          ) : <SkeletonLine /> }
        </ContentContainer>
        <ContentContainer>
          <SpanTitle>Check Out Date:</SpanTitle>
          {!houseLoading && !reservationLoading && !userLoading && !hostLoading ? (
            <SpanDetail>
              {moment(reservationData?.data.reservation.check_out_date).format('D MMMM YYYY')}
            </SpanDetail>
          ) : <SkeletonLine /> }
        </ContentContainer>
        <ContentContainer>
          <SpanTitle>Guest Name:</SpanTitle>
          {!houseLoading && !reservationLoading && !userLoading && !hostLoading ? (
            <SpanDetail>
              {userData?.data.name}
            </SpanDetail>
          ) : <SkeletonLine /> }
        </ContentContainer>
        <QRContainer>
          <QRCode
            value={`${process.env.REACT_APP_URL}/reservation-detail/${params.reservationID}`}
          />
          <SpanDetail>Show this to the host </SpanDetail>
        </QRContainer>
      </Container>
    </MainContainer>

  );
}

export default ReservationDetail;
