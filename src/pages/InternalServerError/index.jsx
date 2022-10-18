import React from 'react';
import { ErrorPage, MainContainer } from '../../components';

function NotFound() {
  return (
    <MainContainer>
      <ErrorPage
        code={500}
        message="Internal Server Error"
      />
    </MainContainer>
  );
}

export default NotFound;
