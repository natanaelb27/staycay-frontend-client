import React from 'react';
import {
  MainContainer,
  GameContainer,
  Title,
  TitleContent,
  ButtonContainer,
  ButtonSelection,
  // TextContainer,
  TextContentContainer,
  SpanTitle,
  SpanDetail,
} from './style';

function Game() {
  return (
    <MainContainer>
      <GameContainer>
        <Title>Coin Toss Game</Title>
        <TitleContent>Heads or Tails</TitleContent>
        <p>coin</p>
        <ButtonContainer>
          <ButtonSelection>Heads</ButtonSelection>
          <ButtonSelection>Tails</ButtonSelection>
        </ButtonContainer>
        <TextContentContainer>
          <SpanTitle>Game Chance:</SpanTitle>
          <SpanDetail>ISI</SpanDetail>
        </TextContentContainer>
        <TextContentContainer>
          <SpanTitle>Game Counter:</SpanTitle>
          <SpanDetail>Game Counter</SpanDetail>
        </TextContentContainer>
        <TextContentContainer>
          <SpanTitle>Congrats You Won</SpanTitle>
          <SpanDetail>Rp ...</SpanDetail>
        </TextContentContainer>
      </GameContainer>
    </MainContainer>
  );
}

export default Game;
