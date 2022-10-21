import React from 'react';
import {
  Container,
  ContentContainer,
  HouseImage,
  ContentDetailContainer,
} from './style';
import { useGetHouseByIDQuery } from '../../store/slices/apiSlice';

function ReservationDetailsCard({ reservationData }) {
  const { data: houseData } = useGetHouseByIDQuery(parseInt(reservationData?.house_id, 10));
  return (
    <Container>
      <HouseImage imgSrc={`url(${houseData?.data.house_photo[0].photo})`} />
      <ContentContainer>
        <ContentDetailContainer>
          <p>Reservation Code:</p>
          <p>{reservationData?.reservation_code}</p>
        </ContentDetailContainer>
        <ContentDetailContainer>
          <p>House Name:</p>
          <p>{houseData?.data.house_name}</p>
        </ContentDetailContainer>
      </ContentContainer>
    </Container>
  );
}

export default ReservationDetailsCard;
