import React, { useState } from 'react';
import moment from 'moment';
import {
  MainContainer,
  Container,
  ContentContainer,
  HouseImage,
  ContentDetailContainer,
  SpanTitle,
  SpanDetail,
} from './style';
import { useGetHouseByIDQuery } from '../../store/slices/apiSlice';
import Button from '../common/Button';
import PickupModal from '../PickupModal';

function ReservationDetailsCard({ reservationData }) {
  const { data: houseData } = useGetHouseByIDQuery(parseInt(reservationData?.house_id, 10));
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };

  const handlePickup = () => {
    setShowModal(false);
  };
  //   const handlePickup = () => {

  //   };
  return (
    <MainContainer>
      <SpanTitle>{reservationData?.reservation_code}</SpanTitle>
      <Container>
        <HouseImage imgSrc={`url(${houseData?.data.house_photo[0].photo})`} />
        <ContentContainer>
          <ContentDetailContainer>
            <SpanTitle>House Name:</SpanTitle>
            <SpanDetail>{houseData?.data.house_name}</SpanDetail>
          </ContentDetailContainer>
          <ContentDetailContainer>
            <SpanTitle>Check In:</SpanTitle>
            <SpanDetail>{moment(reservationData?.check_in_date).format('YYYY-MM-DD')}</SpanDetail>
          </ContentDetailContainer>
          <ContentDetailContainer>
            <SpanTitle>Check Out:</SpanTitle>
            <SpanDetail>{moment(reservationData?.check_out_date).format('YYYY-MM-DD')}</SpanDetail>
          </ContentDetailContainer>
        </ContentContainer>
      </Container>
      {(reservationData?.reservation_status === 'today' || reservationData?.reservation_status === 'upcoming')
        ? (
          <Button
            handleClick={handleModal}
            classes="blue"
          >
            Request Pickup
          </Button>
        ) : null}
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
