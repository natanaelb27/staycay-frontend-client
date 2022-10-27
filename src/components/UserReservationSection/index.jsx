/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  MaxSelectionContainer,
  MinSelectionContainer,
  SpanSelection,
  ReservationContainer,
  PaginationContainer,
} from './style';
import { useLazyGetReservationByUserQuery } from '../../store/slices/apiSlice';
import ReservationDetailsCard from '../ReservationDetailsCard';
import Pagination from '../Pagination';
import Select from '../common/Select';
import Label from '../common/Label';

function UserReservationSection() {
  const navigate = useNavigate();

  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [getReservations, {
    data: reservationData,
    error: reservationError,
    isLoading: reservationLoading,
  }] = useLazyGetReservationByUserQuery();

  const limit = 4;

  useEffect(() => {
    getReservations({ filterBy, limit, page: currentPage });
  }, []);

  const handleClick = (e) => {
    setCurrentPage(1);
    setFilterBy(e.target.id);
    getReservations({ filterBy: e.target.id, limit, page: 1 });
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
    getReservations({ filterBy, limit, page });
  };

  const handleSelectChange = (e) => {
    setCurrentPage(1);
    setFilterBy(e.target.value);
    getReservations({ filterBy: e.target.value, limit, page: 1 });
  };

  const renderMaxSelections = () => (
    <>
      <SpanSelection id="all" className={filterBy === 'all' ? 'active' : undefined} onClick={handleClick}>All</SpanSelection>
      <SpanSelection id="today" className={filterBy === 'today' ? 'active' : undefined} onClick={handleClick}>Today</SpanSelection>
      <SpanSelection id="upcoming" className={filterBy === 'upcoming' ? 'active' : undefined} onClick={handleClick}>Upcoming</SpanSelection>
      <SpanSelection id="ongoing" className={filterBy === 'ongoing' ? 'active' : undefined} onClick={handleClick}>Ongoing</SpanSelection>
      <SpanSelection id="past" className={filterBy === 'past' ? 'active' : undefined} onClick={handleClick}>Past</SpanSelection>
    </>
  );

  const renderMinSelections = () => (
    <>
      <option value="all">All</option>
      <option value="today">Today</option>
      <option value="upcoming">Upcoming</option>
      <option value="ongoing">Ongoing</option>
      <option value="past">Past</option>
    </>
  );

  return (
    !reservationLoading && !reservationError && (
      <Container>
        <Title>Your Reservations</Title>
        <MaxSelectionContainer>
          {renderMaxSelections()}
        </MaxSelectionContainer>
        <MinSelectionContainer>
          <Label>
            Filter By
            <Select
              value={filterBy}
              handleChange={handleSelectChange}
            >
              {renderMinSelections()}
            </Select>
          </Label>
        </MinSelectionContainer>
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
    )
  );
}

export default UserReservationSection;
