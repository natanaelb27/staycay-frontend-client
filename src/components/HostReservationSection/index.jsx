/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  ContentContainer,
  SpanSelection,
  ReservationContainer,
  PaginationContainer,
} from './style';
import { useLazyGetReservationByHostQuery } from '../../store/slices/apiSlice';
import HostReservationDetailsCard from '../HostReservationDetailsCard';
import Pagination from '../Pagination';

function HostReservationSection() {
  const navigate = useNavigate();
  const [getReservation, {
    data: reservationData,
    isLoading: reservationLoading,
  }] = useLazyGetReservationByHostQuery();

  const [active, setActive] = useState('all');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (e) => {
    setCurrentPage(1);
    setActive(e.target.id);
    setFilterBy(e.target.id);
    getReservation({ filterBy: e.target.id, limit: 1, page: 1 });
  };

  useEffect(() => {
    getReservation({ filterBy, limit: 1, page: currentPage });
  }, []);

  const handleClickReservationCard = (reservationID) => {
    navigate(`/reservation-detail/${reservationID}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getReservation({ filterBy, limit: 1, page });
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
      {reservationData?.data.pagination && (
      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          totalPages={reservationData?.data.pagination.total_pages}
          onPageChange={handlePageChange}
        />
      </PaginationContainer>
      )}
    </Container>
  );
}

export default HostReservationSection;
