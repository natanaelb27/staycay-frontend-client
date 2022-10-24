/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetHouseByIDQuery } from '../../store/slices/apiSlice';
import {
  MainContainer,
  HouseTitleContainer,
  HouseImageContainer,
  ImagesContainer,
  HouseContentContainer,
  HouseContentDetailsContainer,
} from './style';
import UpdateHousePhotoCard from '../../components/UpdateHousePhotoCard';
import {
  SkeletonImage, SkeletonLine, SkeletonText,
} from '../../components';
import Button from '../../components/common/Button';
import { numberWithCommas } from '../../helpers';

function HostingUpdateHouse() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    data: houseData,
    error: houseError,
    loading: houseLoading,
  } = useGetHouseByIDQuery(params.houseID);

  const renderHouseImage = () => (
    houseData?.data.house_photo.map((item) => (
      <UpdateHousePhotoCard key={item.photo_id} housePhotoData={item} />
    ))
  );

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
        <ImagesContainer>
          {renderHouseImage()}
        </ImagesContainer>

        )}
      </HouseImageContainer>
      <HouseContentContainer>
        {houseLoading && <SkeletonText classes="full" />}
        {!houseLoading && !houseError && (
          <div>
            <HouseContentDetailsContainer>
              <div>
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
                <h3>Price</h3>
                <p>
                  Rp
                  {' '}
                  {numberWithCommas(houseData?.data.house_price)}
                </p>
                <h3>Description</h3>
                <p>
                  {houseData?.data.house_description}
                </p>
                <h3>House Status</h3>
                <p>
                  {houseData?.data.house_status}
                </p>
              </div>
            </HouseContentDetailsContainer>
          </div>
        )}
        <Button classes="blue" isDisabled={houseData?.data.house_status.toLowerCase() === 'deactivated by admin'}>{houseData?.data.house_status.toLowerCase() === 'active' ? 'deactivate' : 'activate'}</Button>
      </HouseContentContainer>
    </MainContainer>

  );
}

export default HostingUpdateHouse;
