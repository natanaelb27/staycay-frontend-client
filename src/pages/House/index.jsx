/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { DateRange } from 'react-date-range';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  Carousel, HouseContainer, SkeletonImage, SkeletonLine, SkeletonText,
} from '../../components';
import { useGetHouseByIDQuery, useGetHouseReservationsByHouseIDQuery } from '../../store/slices/apiSlice';
import {
  HouseTitleContainer,
  HouseImageContainer,
  HouseContentContainer,
  HouseContentDetailsContainer,
  Line,
  ReservationContainer,
  BoldSpan,
  PriceSpan,
  DateRangeHeader,
  DateRangeSpan,
  TotalPriceContainer,
  DateRangeContainer,
  PriceContainer,
} from './style';
import Button from '../../components/common/Button';
import { numberWithCommas, getDayBetweenDates } from '../../helpers';
import {
  setHouseReservation,
} from '../../store/slices/houseReservationSlice';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import ErrorMessage from '../../components/common/ErrorMessage';

function House() {
  const params = useParams();

  const queryParams = new URLSearchParams(window.location.search);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: houseData,
    error: houseError,
    isLoading: houseLoading,
  } = useGetHouseByIDQuery(params.houseID);

  const {
    data: houseReservationData,
    error: houseReservationError,
    isLoading: houseReservationLoading,
  } = useGetHouseReservationsByHouseIDQuery(params.houseID);

  const getDatesBetween = (startDate, lastDate) => {
    const dateArray = [];
    let currentDate = moment(startDate);
    const stopDate = moment(lastDate);
    while (currentDate <= stopDate) {
      dateArray.push(new Date(moment(currentDate).format('YYYY-MM-DD')));
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  };

  const existingReservationDateArray = [];

  houseReservationData?.data.reservation.map((item) => (
    existingReservationDateArray.push(getDatesBetween(
      new Date(item.check_in_date),
      new Date(item.check_out_date),
    ))));

  const disabledDates = existingReservationDateArray.flat(1);

  const queryParamsCheckInOutValidator = (typeCheck) => {
    const checkIn = queryParams.get('check_in') ? new Date(queryParams.get('check_in')) : new Date();
    const checkOut = queryParams.get('check_out') ? new Date(queryParams.get('check_out')) : new Date();

    if (checkOut <= checkIn) {
      checkOut.setFullYear(checkIn.getFullYear());
      checkOut.setMonth(checkIn.getMonth());
      checkOut.setDate(checkIn.getDate());
    }

    if (typeCheck === 'check_in') {
      return checkIn;
    }

    return checkOut;
  };

  const [checkInDate, setCheckInDate] = useState(queryParamsCheckInOutValidator('check_in'));
  const [checkOutDate, setCheckOutDate] = useState(queryParamsCheckInOutValidator('check_out'));
  const [errorReservationDate, setErrorReservationDate] = useState('');

  const newReservationDateArray = [];

  newReservationDateArray.push(getDatesBetween(checkInDate, checkOutDate));

  const newReservationDates = newReservationDateArray.flat(1);

  // const [isReservationValid, setIsReservationValid] = useState(true);

  const handleDateSelect = (ranges) => {
    setCheckInDate(ranges.selection.startDate);
    setCheckOutDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: checkInDate,
    endDate: checkOutDate,
    key: 'selection',
  };

  const handleClickReserve = (e) => {
    e.preventDefault();

    setErrorReservationDate('');

    if (checkInDate.getTime() === checkOutDate.getTime()) {
      setErrorReservationDate('Minimum stay is 1 night');
      return;
    }

    // BELOM BISA
    for (let i = 0; i < disabledDates.length; i += 1) {
      if (newReservationDates.includes(moment(disabledDates[i]))) {
        setErrorReservationDate('Those dates are not available');
        return;
      }
    }

    dispatch(setHouseReservation({
      houseID: params.houseID,
      checkInDate: moment(checkInDate).format('YYYY-MM-DD'),
      checkOutDate: moment(checkOutDate).format('YYYY-MM-DD'),
    }));

    navigate('/reservation');
  };

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
              <ReservationContainer>
                <BoldSpan>
                  Rp
                  {' '}
                  {numberWithCommas(houseData?.data.house_price)}
                  {' / night'}
                </BoldSpan>
                <DateRangeContainer>
                  <DateRangeHeader>
                    <DateRangeSpan>Check In</DateRangeSpan>
                    <DateRangeSpan>Check Out</DateRangeSpan>
                  </DateRangeHeader>
                  <DateRange
                    ranges={[selectionRange]}
                    minDate={new Date()}
                    disabledDates={disabledDates}
                    onChange={handleDateSelect}
                    style={{ width: '90%' }}
                  />
                </DateRangeContainer>
                <PriceContainer>
                  <PriceSpan>
                    Rp
                    {' '}
                    {numberWithCommas(houseData?.data.house_price)}
                    {' x '}
                    {getDayBetweenDates(checkOutDate, checkInDate)}
                    {getDayBetweenDates(checkOutDate, checkInDate) <= 1 ? ' night' : ' nights'}
                  </PriceSpan>
                  <TotalPriceContainer>
                    <PriceSpan>
                      Rp
                      {' '}
                      {numberWithCommas(
                        (houseData?.data.house_price || 1)
                       * getDayBetweenDates(checkOutDate, checkInDate),
                      )}
                    </PriceSpan>
                  </TotalPriceContainer>
                </PriceContainer>
                {errorReservationDate === '' ? null : <ErrorMessage>{errorReservationDate}</ErrorMessage>}
                <Button
                  handleClick={handleClickReserve}
                >
                  Reserve
                </Button>
              </ReservationContainer>
            </HouseContentDetailsContainer>
          </div>
        )}
      </HouseContentContainer>
    </HouseContainer>
  );
}

export default House;
