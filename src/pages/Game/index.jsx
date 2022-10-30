/* eslint-disable no-unused-vars */
import React from 'react';
import {
  MainContainer,
  GameContainer,
  Title,
  TitleContent,
  ButtonContainer,
  ButtonSelection,
  SpanTitle,
} from './style';
import {
  useGetGameQuery,
  usePlayGameMutation,
} from '../../store/slices/apiSlice';
import { showToast } from '../../helpers/Toast';
import { numberWithCommas } from '../../helpers';
import coin from '../../assets/coin.gif';

function Game() {
  const {
    data: gameData,
    error: gameError,
    isFetching: gameLoading,
  } = useGetGameQuery();

  const [playGame] = usePlayGameMutation();

  const handleGuessCoin = (guess) => {
    playGame(guess)
      .unwrap()
      .then((data) => {
        if (data.data.user_guess === data.data.correct_guess) {
          const message = `You guessed correctly! You got Rp ${numberWithCommas(data.data.amount_won)} as a reward`;
          showToast(message);
        } else {
          const message = `You guessed incorrectly! Dont worry you still got Rp ${numberWithCommas(data.data.amount_won)}`;
          showToast(message);
        }
      });
  };

  return (
    <MainContainer>
      <GameContainer>
        <Title>Coin Toss Game</Title>
        <TitleContent>Heads or Tails</TitleContent>
        <img src={coin} alt="" />
        <ButtonContainer>
          <ButtonSelection
            onClick={() => handleGuessCoin('heads')}
            disabled={gameData?.data.chance <= 0}
          >
            Heads

          </ButtonSelection>
          <ButtonSelection
            onClick={() => handleGuessCoin('tails')}
            disabled={gameData?.data.chance <= 0}
          >
            Tails

          </ButtonSelection>
        </ButtonContainer>
        { gameData?.data.chance > 0
          ? (
            <SpanTitle>
              You got
              {' '}
              {gameData?.data.chance}
              {' '}
              chance left
            </SpanTitle>
          )
          : (
            <SpanTitle>
              Top up Rp 500.000,00 in order to get more chance
            </SpanTitle>
          )}
        <SpanTitle>
          Play
          {' '}
          {10 - parseInt(gameData?.data.counter, 10)}
          {' '}
          more times to get 1 free chance!
        </SpanTitle>
      </GameContainer>
    </MainContainer>
  );
}

export default Game;
