/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
import {
  useGetGameQuery,
  usePlayGameMutation,
} from '../../store/slices/apiSlice';
import GameModal from '../../components/GameModal';

function Game() {
  const {
    data: gameData,
    error: gameError,
    isFetching: gameLoading,
  } = useGetGameQuery();

  const [playGame] = usePlayGameMutation();
  const [showModal, setShowModal] = useState(false);
  // const [isPlayed, setIsPlayed] = useState(false);
  const [isUserCorrect, setIsUserCorrect] = useState(false);
  const [amountWon, setAmountWon] = useState(0);

  const handleGuessCoin = (guess) => {
    playGame(guess)
      .unwrap()
      .then((data) => {
        if (data.data.user_guess === data.data.correct_guess) {
          setIsUserCorrect(true);
        } else {
          setIsUserCorrect(false);
        }
        setAmountWon(parseInt(data.data.amount_won, 10));
        setShowModal(true);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <MainContainer>
      <GameContainer>
        <Title>Coin Toss Game</Title>
        <TitleContent>Heads or Tails</TitleContent>
        <p>coin</p>
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
              You got no more chance, top up 500k in order to get more chance
            </SpanTitle>
          )}
        <SpanTitle>
          Play
          {' '}
          {10 - parseInt(gameData?.data.counter, 10)}
          {' '}
          more times to get 1 free chance!
        </SpanTitle>
        {/* { isPlayed ? (
          isUserCorrect ? (
            <SpanTitle>
              You Won! You got Rp
              {' '}
              {numberWithCommas(amountWon)}
              {' '}
              as a reward
            </SpanTitle>
          ) : (
            <SpanTitle>
              You Lost! But dont worry you still got Rp
              {' '}
              {numberWithCommas(amountWon)}
              {' '}
            </SpanTitle>
          )

        ) : null} */}
      </GameContainer>
      <GameModal
        isShow={showModal}
        onClose={handleCloseModal}
        isUserCorrect={isUserCorrect}
        amountWon={amountWon}
      />
    </MainContainer>
  );
}

export default Game;
