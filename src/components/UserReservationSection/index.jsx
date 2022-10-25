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
import { useGetReservationByUserQuery } from '../../store/slices/apiSlice';
import ReservationDetailsCard from '../ReservationDetailsCard';
import Pagination from '../Pagination';

function UserReservationSection() {
  const navigate = useNavigate();

  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: reservationData,
    error: reservationError,
    isFetching: reservationLoading,
  } = useGetReservationByUserQuery({
    filterBy,
    limit: 4,
    page: currentPage,
  });

  const [active, setActive] = useState('all');
  const handleClick = (e) => {
    setCurrentPage(1);
    setActive(e.target.id);
    setFilterBy(e.target.id);
  };

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    !reservationLoading && !reservationError && (
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
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={reservationData?.data.pagination.total_pages}
            onPageChange={handlePageChange}
          />
        </PaginationContainer>
      </Container>
    )
  );
}

export default UserReservationSection;
