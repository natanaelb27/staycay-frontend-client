import React from 'react';
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
import { useGetUnscopedHouseByIDQuery } from '../../store/slices/apiSlice';
import noImageAvailable from '../../assets/no-image-available.jpg';

function ReservationDetailsCard({ handleClick, reservationData }) {
  const { data: houseData } = useGetUnscopedHouseByIDQuery(parseInt(reservationData?.house_id, 10));

  return (
    <MainContainer>
      <DivContainer onClick={handleClick}>
        <SpanTitle>{reservationData?.reservation_code}</SpanTitle>
        <Container>
          <HouseImage imgSrc={
            houseData?.data.house_photo.length >= 1
              ? `url(${houseData?.data.house_photo[0].photo})`
              : `url(${noImageAvailable})`
            }
          />
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
          </ContentContainer>
        </Container>
      </DivContainer>
    </MainContainer>
  );
}

export default ReservationDetailsCard;
