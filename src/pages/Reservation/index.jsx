/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useGetHouseByIDQuery, useGetHouseReservationsByHouseIDQuery } from '../../store/slices/apiSlice';
import { ReservationOrderCard, ReservationPaymentSection } from '../../components';
import {
  MainContainer,
  TitleContainer,
  BackIcon,
  Title,
  ReservationContentContainer,
} from './style';
import {
  numberWithCommas, getDayBetweenDates, getDatesBetween, dateToDateStringArray,
} from '../../helpers';
import ErrorMessage from '../../components/common/ErrorMessage';
import Toast from '../../components/common/Toast';
import {
  setToast,
} from '../../store/slices/toastSlice';

function Reservation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const queryParams = new URLSearchParams(window.location.search);

  const {
    topUpIsSuccess,
    topUpMessage,
    addReservationIsSuccess,
    addReservationMessage,
  } = useSelector((state) => state.Toast);

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

  const existingReservationDateArray = [];

  houseReservationData?.data.reservation.map((item) => (
    existingReservationDateArray.push(getDatesBetween(
      item.check_in_date,
      item.check_out_date,
    ))));

  const disabledDates = existingReservationDateArray.flat(1);

  const newReservationDateArray = [];

  newReservationDateArray.push(getDatesBetween(queryParams.get('check_in') ? new Date(queryParams.get('check_in')) : new Date(), queryParams.get('check_in') ? new Date(queryParams.get('check_out')) : new Date()));

  const newReservationDates = newReservationDateArray.flat(1);

  const newReservationDatesDS = dateToDateStringArray(newReservationDates);
  const disabledDatesDS = dateToDateStringArray(disabledDates);
  // const [errorReservationDate, setErrorReservationDate] = useState('');

  const checkIn = queryParams.get('check_in') ? new Date(queryParams.get('check_in')) : new Date();
  const checkOut = queryParams.get('check_out') ? new Date(queryParams.get('check_out')) : new Date();

  useEffect(() => {
    if (new Date(checkIn.toDateString()) < new Date(new Date().toDateString())) {
      // setErrorReservationDate('Cannot set a date before today');
      navigate(`/house/${params.houseID}?check_in=${queryParams.get('check_in')}&check_out=${queryParams.get('check_out')}`, { replace: true });
    }

    if (checkOut <= checkIn) {
      // setErrorReservationDate('Minimum stay is 1 night');
      navigate(`/house/${params.houseID}?check_in=${queryParams.get('check_in')}&check_out=${queryParams.get('check_out')}`, { replace: true });
    }

    if (newReservationDatesDS?.some((r) => disabledDatesDS?.indexOf(r) >= 0)) {
      // setErrorReservationDate('Those dates are not available');
      navigate(`/house/${params.houseID}?check_in=${queryParams.get('check_in')}&check_out=${queryParams.get('check_out')}`, { replace: true });
    }
  });

  const handleClickBack = () => {
    navigate(`/house/${params.houseID}?check_in=${queryParams.get('check_in')}&check_out=${queryParams.get('check_out')}`);
  };

  const handleToastClose = () => {
    dispatch(setToast({
      topUpIsSuccess: false,
      topUpMessage: '',
      addReservationIsSuccess: false,
      addReservationMessage: '',
    }));
  };

  return (
    <MainContainer>
      {topUpMessage && (
      <Toast isSuccess={topUpIsSuccess} toastCloseClicked={handleToastClose}>
        {topUpMessage}
      </Toast>
      )}
      {addReservationMessage && (
      <Toast isSuccess={addReservationIsSuccess} toastCloseClicked={handleToastClose}>
        {addReservationMessage}
      </Toast>
      )}
      <TitleContainer>
        <BackIcon onClick={handleClickBack} />
        <Title>Your Reservation</Title>
      </TitleContainer>
      <ReservationContentContainer>
        <ReservationOrderCard
          houseData={houseData?.data}
          checkInDate={checkIn?.toDateString()}
          checkOutDate={checkOut?.toDateString()}
          days={getDayBetweenDates(checkOut, checkIn)}
          // housePrice={numberWithCommas(houseData?.data.house_price)}
        />
        <ReservationPaymentSection
          houseID={params.houseID}
          checkInDate={queryParams.get('check_in')}
          checkOutDate={queryParams.get('check_out')}
          totalPrice={parseInt(houseData?.data.house_price, 10) * getDayBetweenDates(checkOut, checkIn)}
        />

      </ReservationContentContainer>

      {/* {errorReservationDate !== ''
        ? <ErrorMessage>{errorReservationDate}</ErrorMessage> : <p>{errorReservationDate}</p>} */}

    </MainContainer>
  );
}

export default Reservation;
