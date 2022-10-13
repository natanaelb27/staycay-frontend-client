import React from 'react';
import { MainContainer, Card } from '../../components';

function Home() {
  return (
    <MainContainer>
      {/* <img src={require('../../assets/1.jpg')} alt="" /> */}
      <Card bgImg={require('../../assets/1.jpg')} name="Rumah 1" location="Jakarta Barat" price="Rp. 50.000,00" />
    </MainContainer>
  );
}

export default Home;
