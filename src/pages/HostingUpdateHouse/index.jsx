import React from 'react';
import { useParams } from 'react-router-dom';
// import { useGetHouseByIDQuery } from '../../store/slices/apiSlice';

function HostingUpdateHouse() {
  const params = useParams();
  // const [getHouse] = useGetHouseByIDQuery(params.houseID);

  return (
    <h1>{params.houseID}</h1>
  );
}

export default HostingUpdateHouse;
