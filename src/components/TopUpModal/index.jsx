import React, { useState, useEffect } from 'react';
import {
  faCoins,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import Button from '../common/Button';
import Input from '../common/Input';
import ErrorMessage from '../common/ErrorMessage';
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Container,
  ContentContainer,
  AmountButtonContainer,
  AmountButton,
  Icon,
  AmountSpan,
  InputContainer,
} from './style';
import { showErrorToast, showSuccessToast } from '../../helpers/Toast';
import { useTopUpMutation } from '../../store/slices/apiSlice';

function TopUpModal({
  isShow,
  onClose,
}) {
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [errorTopUpAmount, setErrorTopUpAmount] = useState('');
  const [topUp] = useTopUpMutation();
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

  const handleAmountClick = (amount) => {
    setTopUpAmount(amount);
  };

  const handleAmountChange = (e) => {
    setTopUpAmount(e.target.value);

    if (e.target.value < 0) {
      setTopUpAmount(0);
    }
  };

  const handleInvalidKey = (e) => {
    const invalidChars = ['e', 'E', '+', '-', '.'];
    return invalidChars.includes(e.key) && e.preventDefault();
  };

  const handleClickSubmit = () => {
    if (parseInt(topUpAmount, 10) < 10000) {
      setErrorTopUpAmount('Minimum top up amount is Rp 10.000,00');
    } else {
      topUp({
        amount: parseInt(topUpAmount, 10),
      })
        .unwrap()
        .then(() => {
          showSuccessToast('Top Up Success!');
        })
        .catch((error) => {
          if (!error.data) {
            showErrorToast('Server is currently down, please try again later!');
          }
          showErrorToast(error.data.message);
        })
        .finally(() => {
          onClose();
        });
    }
  };

  return (
    <ModalContainer onClick={onClose} className={`${isShow ? 'show' : ''}`}>
      <ToastContainer />
      <ModalContent onClick={(e) => e.stopPropagation()} className={`${isShow ? 'show' : ''}`}>
        <ModalHeader>
          <ModalTitle>
            Top Up Balance
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Container>
            <ContentContainer>
              <AmountButtonContainer>
                <AmountButton type="button" onClick={() => { handleAmountClick(50000); }}>
                  <Icon icon={faCoins} />
                  <AmountSpan>Rp 50.000</AmountSpan>
                </AmountButton>
                <AmountButton type="button" onClick={() => { handleAmountClick(100000); }}>
                  <Icon icon={faCoins} />
                  <AmountSpan>Rp 100.000</AmountSpan>
                </AmountButton>
                <AmountButton type="button" onClick={() => { handleAmountClick(200000); }}>
                  <Icon icon={faCoins} />
                  <AmountSpan>Rp 200.000</AmountSpan>
                </AmountButton>
                <AmountButton type="button" onClick={() => { handleAmountClick(300000); }}>
                  <Icon icon={faCoins} />
                  <AmountSpan>Rp 300.000</AmountSpan>
                </AmountButton>
                <AmountButton type="button" onClick={() => { handleAmountClick(500000); }}>
                  <Icon icon={faCoins} />
                  <AmountSpan>Rp 500.000</AmountSpan>
                </AmountButton>
                <AmountButton type="button" onClick={() => { handleAmountClick(1000000); }}>
                  <Icon icon={faCoins} />
                  <AmountSpan>Rp 1.000.000</AmountSpan>
                </AmountButton>
              </AmountButtonContainer>
              {errorTopUpAmount
                ? <ErrorMessage>{errorTopUpAmount}</ErrorMessage> : null}
              <InputContainer>
                <Input
                  inputType="number"
                  inputName="topUpAmount"
                  handleChange={handleAmountChange}
                  inputValue={topUpAmount === 0 ? '' : topUpAmount}
                  inputPlaceholder="choose or type the amount"
                  handleKeyDown={handleInvalidKey}
                />
              </InputContainer>
            </ContentContainer>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button type="button" handleClick={onClose} classes="danger">Close</Button>
          <Button type="button" handleClick={handleClickSubmit}>Top Up</Button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
}

export default TopUpModal;
