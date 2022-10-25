import React, { useEffect } from 'react';
import Button from '../common/Button';
import {
  ModalContainer,
  ModalContent,
  ContentContainer,
  Title,
  ContentText,
  ModalBody,
  ModalFooter,
} from './style';
import { numberWithCommas } from '../../helpers';

function GameModal({
  isShow, onClose, isUserCorrect, amountWon,
}) {
  // if (!isShow) {
  //   return null;
  // }

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  return (
    <ModalContainer onClick={onClose} className={`${isShow ? 'show' : ''}`}>
      <ModalContent onClick={(e) => e.stopPropagation()} className={`${isShow ? 'show' : ''}`}>
        <ModalBody>
          {
            isUserCorrect ? (
              <ContentContainer>
                <Title>You Won!</Title>
                <ContentText>
                  You got Rp
                  {' '}
                  {numberWithCommas(amountWon)}
                  {' '}
                  as a reward!
                </ContentText>
              </ContentContainer>
            )
              : (
                <ContentContainer>
                  <Title>You Lost!</Title>
                  <ContentText>
                    Dont worry, you still got Rp
                    {' '}
                    {numberWithCommas(amountWon)}
                  </ContentText>
                </ContentContainer>
              )
          }
        </ModalBody>
        <ModalFooter>
          <Button type="button" handleClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
}

export default GameModal;
