import React, { } from 'react';
import { MainContainer } from '../../components';
import { useGetUserProfileQuery, useUpdateUserRoleToHostMutation } from '../../store/slices/apiSlice';
import {
  BecomeHostContainer,
  BecomeHostTitle,
  BecomeHostButton,
} from './style';

function Hosting() {
  const {
    data: userData,
  } = useGetUserProfileQuery();

  const [updateUserRoleToHost] = useUpdateUserRoleToHostMutation();

  const handleBecomeHost = () => {
    updateUserRoleToHost();
  };

  return (
    <MainContainer>
      {userData?.data.role === 'host' ? (
        <div>
          Hosting
        </div>
      ) : (
        <BecomeHostContainer>
          <BecomeHostTitle>Become a Host Now</BecomeHostTitle>
          <BecomeHostButton onClick={handleBecomeHost}>Become a Host</BecomeHostButton>
        </BecomeHostContainer>
      )}
    </MainContainer>
  );
}

export default Hosting;
