import React from 'react';
import { useParams } from 'react-router-dom';

function HostingUpdateHouse() {
  const params = useParams();

  return (
    <h1>{params.houseID}</h1>
  );
}

export default HostingUpdateHouse;
