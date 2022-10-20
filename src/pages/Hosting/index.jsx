import React, { } from 'react';
import { MainContainer } from '../../components';
import { useGetUserProfileQuery } from '../../store/slices/apiSlice';

function Hosting() {
  const {
    data: userData,
  } = useGetUserProfileQuery();

  const isHost = userData?.data.role === 'host';

  return (
    <MainContainer>
      {isHost ? (<p>true</p>) : (<p>false</p>)}
    </MainContainer>
  );
}

export default Hosting;
