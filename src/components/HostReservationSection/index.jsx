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
import { useLazyGetReservationByHostQuery } from '../../store/slices/apiSlice';
import HostReservationDetailsCard from '../HostReservationDetailsCard';

function HostReservationSection() {
  const navigate = useNavigate();
  const [getReservation, {
    data: reservationData,
  }] = useLazyGetReservationByHostQuery();

  const [active, setActive] = useState('all');
  const handleClick = (e) => {
    setActive(e.target.id);
    getReservation({ filterBy: e.target.id });
  };

  useEffect(() => {
    getReservation({ filterBy: 'all', limit: 10, page: 1 });
  }, []);

  const handleClickReservationCard = (reservationID) => {
    navigate(`/reservation-detail/${reservationID}`);
  };

  const renderReservations = () => (
    reservationData?.data.reservation.map((item) => (
      <HostReservationDetailsCard
        handleClick={() => { handleClickReservationCard(item.reservation_id); }}
        key={item.reservation_code}
        reservationData={item}
      />
    ))

  );

  return (
    <Container>
      <Title>Your Reservations</Title>
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
      Page
      https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
    </Container>
  );
}

export default HostReservationSection;
