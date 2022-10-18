import React from 'react';
import { useSelector } from 'react-redux';
import { MainContainer, Card, SkeletonCard } from '../../components';
import { useGetHouseQuery } from '../../store/slices/apiSlice';
import { CardContainer } from './style';

function Home() {
  const { searchHouse } = useSelector((state) => state.SearchHouse);

  const {
    data: houseData,
    error: houseError,
    isFetching: houseLoading,
  } = useGetHouseQuery(searchHouse);

  const skeletonLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const renderLoading = () => (
    skeletonLoading?.map((item) => (<SkeletonCard key={item} />))
  );

  const renderHouses = () => (
    houseData?.data.house.map((item) => (
      <Card
        key={item.house_id}
        houseID={item.house_id}
        housePhoto={item.house_photo}
        name={item.house_name}
        location={item.house_city_name}
        price={item.house_price}
      />
    ))
  );

  return (
    <MainContainer>
      <CardContainer>
        {houseLoading && (renderLoading())}
        {!houseLoading && houseError && <p>{houseError}</p>}
        {!houseLoading && !houseError && (
          renderHouses()
        )}
      </CardContainer>
    </MainContainer>
  );
}

export default Home;
