import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  MaxSelectionContainer,
  MinSelectionContainer,
  SpanSelection,
  ReservationContainer,
  NoDataContainer,
  LoadingContainer,
} from './style';
import { useLazyGetReservationByUserQuery } from '../../store/slices/apiSlice';
import ReservationDetailsCard from '../ReservationDetailsCard';
import Pagination from '../Pagination';
import Select from '../common/Select';
import Label from '../common/Label';
import Loading from '../common/Loading';
import NoDataCard from '../NoDataCard';

function UserReservationSection() {
  const navigate = useNavigate();

  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [getReservation, {
    data: reservationData,
    error: reservationError,
    isLoading: reservationLoading,
  }] = useLazyGetReservationByUserQuery();

  const limit = 4;

  useEffect(() => {
    getReservation({ filterBy, limit, page: currentPage });
  }, []);

  const handleClick = (e) => {
    setCurrentPage(1);
    setFilterBy(e.target.id);
    getReservation({ filterBy: e.target.id, limit, page: 1 });
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

  const reservationRef = useRef(null);

  const executeScroll = () => reservationRef.current.scrollIntoView();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getReservation({ filterBy, limit, page });
    executeScroll();
  };

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
      <SpanSelection id="completed" className={filterBy === 'completed' ? 'active' : undefined} onClick={handleClick}>Completed</SpanSelection>
    </>
  );

  const renderMinSelections = () => (
    <>
      <option value="all">All</option>
      <option value="today">Today</option>
      <option value="upcoming">Upcoming</option>
      <option value="ongoing">Ongoing</option>
      <option value="completed">Completed</option>
    </>
  );

  return (
    <Container ref={reservationRef}>
      <Title>Your Reservations</Title>
      {reservationLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}

      {!reservationLoading && !reservationError && (
      <>
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
        {
        reservationData?.data.reservation.length <= 0
          ? (
            <NoDataContainer>
              <NoDataCard />
            </NoDataContainer>
          )
          : (
            <ReservationContainer>
              {renderReservations()}
            </ReservationContainer>
          )
}
        {reservationData?.data.pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={reservationData?.data.pagination.total_pages}
          onPageChange={handlePageChange}
        />
        )}
      </>
      )}
    </Container>
  );
}

export default UserReservationSection;
