/* eslint-disable no-unused-vars */
import React, { } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HouseReservationCard, Carousel, SkeletonImage, SkeletonLine, SkeletonText,
} from '../../components';
import { useGetHouseByIDQuery } from '../../store/slices/apiSlice';
import {
  MainContainer,
  HouseTitleContainer,
  HouseImageContainer,
  HouseContentContainer,
  HouseContentDetailsContainer,
  Line,
} from './style';

function House() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    data: houseData,
    error: houseError,
    isLoading: houseLoading,
  } = useGetHouseByIDQuery(params.houseID);

  if (!houseLoading && houseError && houseError.data.code === 400) {
    navigate('/');
  } else if (!houseLoading && houseError && houseError.data.code === 500) {
    navigate('/InternalServerError');
  }

  if (!houseLoading && !houseError && houseData?.data.house_status.toLowerCase() !== 'active') {
    navigate('/');
  }

  return (
    <MainContainer>
      <HouseTitleContainer>
        {houseLoading && <SkeletonLine classes="w-30p" />}
        {!houseLoading && !houseError && (
          <div>
            <h1>{houseData?.data.house_name}</h1>
          </div>
        )}
      </HouseTitleContainer>
      <HouseImageContainer>
        {houseLoading && <SkeletonImage classes="full" />}
        {!houseLoading && !houseError && (
          <Carousel housePhoto={houseData?.data.house_photo} />
        )}
      </HouseImageContainer>
      <HouseContentContainer>
        {houseLoading && <SkeletonText classes="full" />}
        {!houseLoading && !houseError && (
          <div>
            <HouseContentDetailsContainer>
              <div>
                <h2>
                  House hosted by
                  {' '}
                  {houseData?.data.host_name}
                </h2>
                <Line />
                <h3>City</h3>
                <p>
                  {houseData?.data.house_city_name}
                  {' '}
                </p>
                <h3>Max Guest</h3>
                <p>
                  {houseData?.data.house_max_guest}
                  {' '}
                  guests
                </p>
                <h3>Description</h3>
                <p>
                  {houseData?.data.house_description}
                </p>
              </div>
              <HouseReservationCard houseData={houseData} />
            </HouseContentDetailsContainer>
          </div>
        )}
      </HouseContentContainer>
    </MainContainer>
  );
}

export default House;
