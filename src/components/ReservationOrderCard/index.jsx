import React from 'react';
import {
  Container,
  HouseDetailContainer,
  HouseImageContainer,
  HouseImage,
  HouseDetailContentContainer,
  HouseDetailContent,
  ContentContainer,
  SpanTitle,
  SpanDetail,
  TripMainContainer,
  TripDetailContainer,
  PriceContainer,
} from './style';
import { numberWithCommas } from '../../helpers';
import noImageAvailable from '../../assets/no-image-available.jpg';

function ReservationOrderCard({
  houseData, checkInDate, checkOutDate, days,
}) {
  return (
    <Container>
      <HouseDetailContainer>
        <HouseImageContainer>
          <HouseImage imgSrc={
            houseData?.house_photo.length >= 1
              ? `url(${houseData?.house_photo[0].photo})`
              : `url(${noImageAvailable})`
            }
          />
        </HouseImageContainer>
        <HouseDetailContentContainer>
          <HouseDetailContent>
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
          </HouseDetailContent>
        </HouseDetailContentContainer>
      </HouseDetailContainer>
      <TripMainContainer>
        <TripDetailContainer>
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
        </TripDetailContainer>
        <TripDetailContainer>
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
              </SpanDetail>
              <SpanDetail>
                Rp
                {' '}
                {numberWithCommas(parseInt(houseData?.house_price, 10) * days)}
              </SpanDetail>
            </PriceContainer>
          </ContentContainer>
        </TripDetailContainer>
      </TripMainContainer>
    </Container>
  );
}

export default ReservationOrderCard;
