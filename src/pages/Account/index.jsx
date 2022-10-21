import React from 'react';
import {
  PersonalInfoSection,
  UserWalletSection,
  UserReservationSection,
} from '../../components';
import {
  MainContainer,
  Container,
  ProfileContainer,
} from './style';

function Account() {
  return (
    <MainContainer>
      <Container>
        <ProfileContainer>
          <PersonalInfoSection />
          <UserWalletSection />
        </ProfileContainer>
        <UserReservationSection />
      </Container>
    </MainContainer>
  );
}

export default Account;
