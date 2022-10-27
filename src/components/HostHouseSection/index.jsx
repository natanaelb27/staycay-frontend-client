import React, { useEffect, useState } from 'react';
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
  PaginationContainer,
} from './style';
import Pagination from '../Pagination';

function HostHouseSection() {
  const navigate = useNavigate();
  const [getHostHouse, {
    data: houseData,
    error: houseError,
    isLoading: houseLoading,
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
        const nullHousePhoto = [{
          photo_id: 0,
          photo: 'https://res.cloudinary.com/dbhvedme6/image/upload/v1666614484/no-photo_g1qmse.webp',
        }];
        return (
          <Card
            key={item.house_id}
            houseID={item.house_id}
            housePhoto={nullHousePhoto}
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getHostHouse({
      limit,
      page,
    });
  };

  return (
    <Container>
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
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={houseData?.data.pagination.total_pages}
            onPageChange={handlePageChange}
          />
        </PaginationContainer>
      )}
    </Container>

  );
}

export default HostHouseSection;
