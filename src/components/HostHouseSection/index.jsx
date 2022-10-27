import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SkeletonCard from '../Skeleton/SkeletonCard';
import Card from '../Card';
import Button from '../common/Button';
import { useLazyGetHostHouseQuery } from '../../store/slices/apiSlice';
import {
  Container,
  HeaderContainer,
  Title,
  AddNewHouseButtonContainer,
  CardContainer,
} from './style';
import Pagination from '../Pagination';
import noImageAvailable from '../../assets/no-image-available.jpg';

function HostHouseSection() {
  const navigate = useNavigate();
  const [getHostHouse, {
    data: houseData,
    error: houseError,
    isFetching: houseLoading,
  }] = useLazyGetHostHouseQuery();

  const skeletonLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const limit = 3;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getHostHouse({
      limit,
      page: 1,
    });
  }, []);

  const renderLoading = () => (
    skeletonLoading?.map((item) => (<SkeletonCard key={item} />))
  );

  const renderHouses = () => (
    houseData?.data.house.map((item) => {
      if (item.house_photo.length <= 0) {
        return (
          <Card
            key={item.house_id}
            houseID={item.house_id}
            housePhoto={[{
              photo_id: 0,
              photo: noImageAvailable,
            }]}
            name={item.house_name}
            location={item.house_city_name}
            price={item.house_price}
            linkTo={`/hosting/update-house/${item.house_id}`}
          />
        );
      }

      return (
        <Card
          key={item.house_id}
          houseID={item.house_id}
          housePhoto={item.house_photo}
          name={item.house_name}
          location={item.house_city_name}
          price={item.house_price}
          linkTo={`/hosting/update-house/${item.house_id}`}
        />
      );
    })
  );

  const handleAddNewHouseClick = () => {
    navigate('/hosting/add-house');
  };

  const houseRef = useRef(null);

  const executeScroll = () => houseRef.current.scrollIntoView();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getHostHouse({
      limit,
      page,
    });

    executeScroll();
  };

  return (
    <Container ref={houseRef}>
      <HeaderContainer>
        <Title>Manage Your Houses</Title>
        <AddNewHouseButtonContainer>
          <Button handleClick={handleAddNewHouseClick}>
            Add New House
          </Button>
        </AddNewHouseButtonContainer>
      </HeaderContainer>
      <CardContainer>
        {houseLoading && (renderLoading())}
        {!houseLoading && houseError && <p>{houseError}</p>}
        {!houseLoading && !houseError && (
          renderHouses()
        )}
      </CardContainer>
      {houseData?.data.pagination && (
      <Pagination
        currentPage={currentPage}
        totalPages={houseData?.data.pagination.total_pages}
        onPageChange={handlePageChange}
      />
      )}
    </Container>

  );
}

export default HostHouseSection;
