import React from 'react';
import { useSelector } from 'react-redux';

function Reservation() {
  const {
    houseID, checkInDate, checkOutDate,
  } = useSelector((state) => state.HouseReservation);

  return (
    <>

      <h1>Reservation</h1>
      <p>
        {houseID}
        {' '}
        {checkInDate}
        {' '}
        {checkOutDate}
      </p>

    </>
  );
}

export default Reservation;
