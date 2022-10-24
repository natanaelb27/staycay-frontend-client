import React, { useState } from 'react';
import moment from 'moment';
import {
  MainContainer,
  DivContainer,
  Container,
  ContentContainer,
  HouseImage,
  ContentDetailContainer,
  SpanTitle,
  SpanDetail,
} from './style';
import { useGetHouseByIDQuery, useGetPickupByReservationQuery } from '../../store/slices/apiSlice';
import Button from '../common/Button';
import PickupModal from '../PickupModal';

function ReservationDetailsCard({ handleClick, reservationData }) {
  const { data: houseData } = useGetHouseByIDQuery(parseInt(reservationData?.house_id, 10));
  const { data: pickupData } = useGetPickupByReservationQuery(
    parseInt(reservationData?.reservation_id, 10),
  );

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };

  const handlePickup = () => {
    setShowModal(false);
  };

  return (
    <MainContainer>
      <DivContainer onClick={handleClick}>
        <SpanTitle>{reservationData?.reservation_code}</SpanTitle>
        <Container>
          <HouseImage imgSrc={`url(${houseData?.data.house_photo[0].photo})`} />
          <ContentContainer>
            <ContentDetailContainer>
              <SpanTitle>House Name:</SpanTitle>
              <SpanDetail>{houseData?.data.house_name}</SpanDetail>
            </ContentDetailContainer>
            <ContentDetailContainer>
              <SpanTitle>House City:</SpanTitle>
              <SpanDetail>
                {houseData?.data.house_city_name}
              </SpanDetail>
            </ContentDetailContainer>
            <ContentDetailContainer>
              <SpanTitle>Check In:</SpanTitle>
              <SpanDetail>{moment(reservationData?.check_in_date).format('D MMMM YYYY')}</SpanDetail>
            </ContentDetailContainer>
            <ContentDetailContainer>
              <SpanTitle>Check Out:</SpanTitle>
              <SpanDetail>{moment(reservationData?.check_out_date).format('D MMMM YYYY')}</SpanDetail>
            </ContentDetailContainer>
            <ContentDetailContainer>
              <SpanTitle>Pickup Status:</SpanTitle>
              <SpanDetail>
                {pickupData?.data.pickup_id !== 0 ? (
                  pickupData?.data.pickup_status_name
                ) : '-'}
              </SpanDetail>
            </ContentDetailContainer>
            <ContentDetailContainer>
              <SpanTitle>Pickup Address:</SpanTitle>
              <SpanDetail>
                {pickupData?.data.pickup_id !== 0 ? (
                  <span>
                    {pickupData?.data.pickup_address}
                    ,
                    {' '}
                    {pickupData?.data.pickup_city_name}
                  </span>
                ) : '-'}
              </SpanDetail>
            </ContentDetailContainer>
          </ContentContainer>
        </Container>
      </DivContainer>
      {(reservationData?.reservation_status === 'today' || reservationData?.reservation_status === 'upcoming') && (!pickupData?.data.pickup_id > 0)
        ? (
          <Button
            handleClick={handleModal}
            classes="blue"
          >
            Request Pickup
          </Button>
        ) : (
          <Button
            isDisabled
          >
            Request Pickup
          </Button>
        )}
      <PickupModal
        reservationID={reservationData?.reservation_id}
        isShow={showModal}
        onClose={() => setShowModal(false)}
        handleSubmit={handlePickup}

      />
    </MainContainer>
  );
}

export default ReservationDetailsCard;
