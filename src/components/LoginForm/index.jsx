import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Label from '../common/Label';
import Input from '../common/Input';
import Button from '../common/Button';
import Toast from '../common/Toast';
import { useLoginMutation } from '../../store/slices/apiSlice';
import {
  TitleContainer,
  Title,
  MainContainer,
  Form,
  MainInputContainer,
  InputContainer,
  ErrorMessage,
} from './style';

function LoginForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [errorInput, setErrorInput] = useState({
    errorEmail: '',
    errorPassword: '',
  });

  const [login] = useLoginMutation();

  const [errorLogin, setErrorLogin] = useState('');

  const handleToastClose = () => {
    setErrorLogin('');
  };

  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     navigate('/', { replace: true });
  //   }
  // }, []);

  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorLogin('');
    setErrorInput({
      errorEmail: '',
      errorPassword: '',
    });

    const newError = {
      errorEmail: '',
      errorPassword: '',
    };

    if (!input.email) {
      newError.errorEmail = 'Please insert your email';
    }

    if (!input.password) {
      newError.errorPassword = 'Please insert your password';
    }

    setErrorInput(newError);

    if (!newError.errorEmail && !newError.errorPassword) {
      login({
        email: input.email,
        password: input.password,
      })
        .unwrap()
        .then((payload) => {
          localStorage.setItem('user', JSON.stringify(payload.data));
          navigate('/', { replace: true });
          // console.log(JSON.parse(localStorage.getItem('user')).token);
        })
        .catch((error) => {
          if (!error.data) {
            setErrorLogin('Server is currently down, please try again later!');
          }
          setErrorLogin(error.data.message);
        });
    }
  };

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit}>
        <TitleContainer>
          <Title>
            Login
          </Title>
        </TitleContainer>
        <MainInputContainer>

          <InputContainer>
            <Label labelFor="email">Email</Label>
            <Input
              inputType="text"
              inputID="email"
              inputName="email"
              inputValue={input.email}
              handleChange={handleInputChange}
            />
            {errorInput.errorEmail ? <ErrorMessage>{errorInput.errorEmail}</ErrorMessage> : null}
          </InputContainer>
          <InputContainer>
            <Label labelFor="password">Password</Label>
            <Input
              inputType="password"
              inputID="password"
              inputName="password"
              inputValue={input.password}
              handleChange={handleInputChange}
            />
            {errorInput.errorPassword
              ? <ErrorMessage>{errorInput.errorPassword}</ErrorMessage> : null}

          </InputContainer>
          <Button btnType="submit">Login</Button>
        </MainInputContainer>
      </Form>
      {errorLogin && (
        <Toast toastCloseClicked={handleToastClose}>
          {errorLogin}
        </Toast>
      )}
    </MainContainer>
  );
}

export default LoginForm;
