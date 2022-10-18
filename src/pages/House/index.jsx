import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import {
  Carousel, HouseContainer, SkeletonImage, SkeletonLine, SkeletonText,
} from '../../components';
import { useGetHouseByIDQuery } from '../../store/slices/apiSlice';
import {
  HouseTitleContainer,
  HouseImageContainer,
  HouseContentContainer,
  HouseContentDetailsContainer,
  Line,
  ReservationCard,
  BoldSpan,
} from './style';
import { numberWithCommas } from '../../helpers';

function House() {
  // let today = new Date();
  // let dd = today.getDate();
  // let mm = today.getMonth() + 1;
  // const yyyy = today.getFullYear();

  // if (dd < 10) {
  //   dd = `0${dd}`;
  // }

  // if (mm < 10) {
  //   mm = `0${mm}`;
  // }

  // today = `${yyyy}-${mm}-${dd}`;

  const today = moment().format('YYYY-MM-DD');

  console.log(today);

  const params = useParams();

  const navigate = useNavigate();

  const {
    data: houseData,
    error: houseError,
    isLoading: houseLoading,
  } = useGetHouseByIDQuery(params.houseID);

  // const renderHouses = () => {
  //   const data = houseData?.data;
  //   return (
  //     <p>{data.house_name}</p>
  //   );
  // };

  if (!houseLoading && houseError && houseError.data.code === 400) {
    navigate('/');
  } else if (!houseLoading && houseError && houseError.data.code === 500) {
    navigate('/InternalServerError');
  }

  return (
    <HouseContainer>
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
                <p>
                  {houseData?.data.house_city_name}
                  {' '}
                </p>
                <p>
                  {houseData?.data.house_max_guest}
                  {' '}
                  guests
                </p>
                <p>
                  {houseData?.data.house_description}
                </p>
              </div>
              <ReservationCard>
                <BoldSpan>
                  Rp
                  {' '}
                  {numberWithCommas(houseData?.data.house_price)}
                  {' / night'}
                </BoldSpan>
                <input type="date" min={today} />

              </ReservationCard>
            </HouseContentDetailsContainer>
          </div>
        )}
      </HouseContentContainer>
      {/* {houseLoading && (<SkeletonCard />)} */}
    </HouseContainer>
  );
}

export default House;
