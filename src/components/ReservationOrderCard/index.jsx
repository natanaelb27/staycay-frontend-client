import React from 'react';
import {
  Container,
  HouseImageContainer,
  HouseImage,
  ContentContainer,
  SpanTitle,
  SpanDetail,
  PriceContainer,
} from './style';
import { numberWithCommas } from '../../helpers';
import noImageAvailable from '../../assets/no-image-available.jpg';

function ReservationOrderCard({
  houseData, checkInDate, checkOutDate, days,
}) {
  return (
    <Container>
      <HouseImageContainer>
        <HouseImage imgSrc={
            houseData?.house_photo.length >= 1
              ? `url(${houseData?.house_photo[0].photo})`
              : `url(${noImageAvailable})`
            }
        />
      </HouseImageContainer>
      <ContentContainer>
        <SpanTitle>House Name</SpanTitle>
        <SpanDetail>
          {houseData?.house_name}
        </SpanDetail>
      </ContentContainer>
      <ContentContainer>
        <SpanTitle>City</SpanTitle>
        <SpanDetail>
          {houseData?.house_city_name}
        </SpanDetail>
      </ContentContainer>
      <ContentContainer>
        <SpanTitle>
          Your Trip
        </SpanTitle>
        <SpanDetail>
          {checkInDate}
          {' '}
          -
          {' '}
          {checkOutDate}
          {' '}
          (
          {days}
          {' '}
          {days <= 1 ? 'night' : 'nights'}
          )
        </SpanDetail>
      </ContentContainer>
      <ContentContainer>
        <SpanTitle>
          Price details
        </SpanTitle>
        <PriceContainer>
          <SpanDetail>
            Rp
            {' '}
            {numberWithCommas(parseInt(houseData?.house_price, 10))}
            {' x '}
            {days}
            {' '}
            {days <= 1 ? 'night' : 'nights'}
            :
          </SpanDetail>
          <SpanDetail>
            Rp
            {' '}
            {numberWithCommas(parseInt(houseData?.house_price, 10) * days)}
          </SpanDetail>
        </PriceContainer>
      </ContentContainer>
    </Container>
  );
}

export default ReservationOrderCard;
