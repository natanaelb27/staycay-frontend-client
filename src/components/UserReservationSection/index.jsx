/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  ContentContainer,
  SpanSelection,
  ReservationContainer,
} from './style';
import { useLazyGetReservationByUserQuery } from '../../store/slices/apiSlice';
import ReservationDetailsCard from '../ReservationDetailsCard';

function UserReservationSection() {
  const navigate = useNavigate();
  const [getReservation, {
    data: reservationData,
  }] = useLazyGetReservationByUserQuery();

  const [active, setActive] = useState('all');
  const handleClick = (e) => {
    setActive(e.target.id);
    getReservation({ filterBy: e.target.id });
  };

  useEffect(() => {
    getReservation({ filterBy: 'all' });
  }, []);

  const handleClickReservationCard = (reservationID) => {
    navigate(`/reservation-detail/${reservationID}`);
  };

  const renderReservations = () => (
    reservationData?.data.reservation.map((item) => (
      <ReservationDetailsCard
        handleClick={() => { handleClickReservationCard(item.reservation_id); }}
        key={item.reservation_code}
        reservationData={item}
      />
    ))

  );

  return (
    <Container>
      <Title>Your Reservation</Title>
      <ContentContainer>
        <SpanSelection id="all" className={active === 'all' ? 'active' : undefined} onClick={handleClick}>All</SpanSelection>
        <SpanSelection id="today" className={active === 'today' ? 'active' : undefined} onClick={handleClick}>Today</SpanSelection>
        <SpanSelection id="upcoming" className={active === 'upcoming' ? 'active' : undefined} onClick={handleClick}>Upcoming</SpanSelection>
        <SpanSelection id="ongoing" className={active === 'ongoing' ? 'active' : undefined} onClick={handleClick}>Ongoing</SpanSelection>
        <SpanSelection id="past" className={active === 'past' ? 'active' : undefined} onClick={handleClick}>Past</SpanSelection>
      </ContentContainer>
      <ReservationContainer>
        {renderReservations()}
      </ReservationContainer>
    </Container>
  );
}

export default UserReservationSection;
