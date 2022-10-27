/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  MaxSelectionContainer,
  MinSelectionContainer,
  SpanSelection,
  ReservationContainer,
} from './style';
import { useLazyGetReservationByHostQuery } from '../../store/slices/apiSlice';
import HostReservationDetailsCard from '../HostReservationDetailsCard';
import Pagination from '../Pagination';
import Select from '../common/Select';
import Label from '../common/Label';

function HostReservationSection() {
  const navigate = useNavigate();
  const [getReservation, {
    data: reservationData,
    isLoading: reservationLoading,
  }] = useLazyGetReservationByHostQuery();

  const limit = 4;

  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (e) => {
    setCurrentPage(1);
    setFilterBy(e.target.id);
    getReservation({ filterBy: e.target.id, limit, page: 1 });
  };

  useEffect(() => {
    getReservation({ filterBy, limit, page: currentPage });
  }, []);

  const handleClickReservationCard = (reservationID) => {
    navigate(`/reservation-detail/${reservationID}`);
  };

  const reservationRef = useRef(null);

  const executeScroll = () => reservationRef.current.scrollIntoView();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getReservation({ filterBy, limit, page });
    executeScroll();
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

  const handleSelectChange = (e) => {
    setCurrentPage(1);
    setFilterBy(e.target.value);
    getReservation({ filterBy: e.target.value, limit, page: 1 });
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
    <Container ref={reservationRef}>
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
        <Pagination
          currentPage={currentPage}
          totalPages={reservationData?.data.pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
}

export default HostReservationSection;
