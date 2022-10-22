import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import {
  ReservationContainer,
  BoldSpan,
  PriceSpan,
  DateRangeHeader,
  DateRangeSpan,
  TotalPriceContainer,
  DateRangeContainer,
  PriceContainer,
} from './style';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import {
  numberWithCommas, getDayBetweenDates, getDatesBetween, dateToDateStringArray,
} from '../../helpers';
import { useGetHouseReservationsByHouseIDQuery } from '../../store/slices/apiSlice';

function HouseReservationCard({
  houseData,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const queryParams = new URLSearchParams(window.location.search);

  const {
    data: houseReservationData,
    error: houseReservationError,
    isLoading: houseReservationLoading,
  } = useGetHouseReservationsByHouseIDQuery(params.houseID);

  const existingReservationDateArray = [];

  houseReservationData?.data.reservation.map((item) => (
    existingReservationDateArray.push(getDatesBetween(
      item.check_in_date,
      item.check_out_date,
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

  const newReservationDatesDS = dateToDateStringArray(newReservationDates);
  const disabledDatesDS = dateToDateStringArray(disabledDates);

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

    if (new Date(checkInDate.toDateString()) < new Date(new Date().toDateString())) {
      setErrorReservationDate('Cannot set a date before today');
      return;
    }

    if (checkInDate.getTime() === checkOutDate.getTime()) {
      setErrorReservationDate('Minimum stay is 1 night');
      return;
    }

    if (newReservationDatesDS.some((r) => disabledDatesDS.indexOf(r) >= 0)) {
      setErrorReservationDate('Those dates are not available');
      return;
    }

    navigate(`/reservation/${params.houseID}?check_in=${moment(checkInDate).format('YYYY-MM-DD')}&check_out=${moment(checkOutDate).format('YYYY-MM-DD')}`);
  };

  if (!houseReservationLoading && houseReservationError
    && houseReservationError.data.code === 400) {
    navigate('/');
  } else if (!houseReservationLoading && houseReservationError
    && houseReservationError.data.code === 500) {
    navigate('/InternalServerError');
  }

  return (
    <ReservationContainer>
      <BoldSpan>
        Rp
        {' '}
        {numberWithCommas(parseInt(houseData?.data.house_price, 10))}
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
          {numberWithCommas(parseInt(houseData?.data.house_price, 10))}
          {' x '}
          {getDayBetweenDates(checkOutDate, checkInDate)}
          {getDayBetweenDates(checkOutDate, checkInDate) <= 1 ? ' night' : ' nights'}
        </PriceSpan>
        <TotalPriceContainer>
          <PriceSpan>
            Rp
            {' '}
            {numberWithCommas(
              (parseInt(houseData?.data.house_price, 10) || 1)
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
  );
}

export default HouseReservationCard;
