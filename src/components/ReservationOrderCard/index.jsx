import React from 'react';
import {
  Container,
  HouseDetailContainer,
  HouseImageContainer,
  HouseImage,
  HouseDetailContent,
  Span,
  ContentTitle,
  TripDetailContainer,
  PriceContainer,
} from './style';
import { numberWithCommas } from '../../helpers';

function ReservationOrderCard({
  houseData, checkInDate, checkOutDate, days,
}) {
  return (
    <Container>
      <HouseDetailContainer>
        <HouseImageContainer>
          <HouseImage imgSrc={`url(${houseData?.house_photo[0].photo})`} />
        </HouseImageContainer>
        <HouseDetailContent>
          <div>
            <ContentTitle>House Name</ContentTitle>
            <Span>
              {houseData?.house_name}
            </Span>
          </div>
          <div>
            <ContentTitle>City</ContentTitle>
            <Span>
              {houseData?.house_city_name}
            </Span>
          </div>
        </HouseDetailContent>
      </HouseDetailContainer>
      <TripDetailContainer>
        <ContentTitle>
          Your Trip
        </ContentTitle>
        <Span>
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
        </Span>
      </TripDetailContainer>
      <TripDetailContainer>
        <ContentTitle>
          Price details
        </ContentTitle>
        <PriceContainer>
          <Span>
            Rp
            {' '}
            {numberWithCommas(parseInt(houseData?.house_price, 10))}
            {' x '}
            {days}
            {' '}
            {days <= 1 ? 'night' : 'nights'}
          </Span>
          <Span>
            Rp
            {' '}
            {numberWithCommas(parseInt(houseData?.house_price, 10) * days)}
          </Span>
        </PriceContainer>
      </TripDetailContainer>
    </Container>
  );
}

export default ReservationOrderCard;
