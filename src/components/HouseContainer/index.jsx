import React from 'react';
import { Container } from './style';

function HouseContainer({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default HouseContainer;
