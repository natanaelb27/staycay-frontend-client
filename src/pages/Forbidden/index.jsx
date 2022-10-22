import React from 'react';
import { ErrorPage, MainContainer } from '../../components';

function Forbidden() {
  return (
    <MainContainer>
      <ErrorPage
        code={403}
        message="Forbidden"
      />
    </MainContainer>
  );
}

export default Forbidden;
