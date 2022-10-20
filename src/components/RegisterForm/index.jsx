import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Label from '../common/Label';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import Select from '../common/Select';
import ErrorMessage from '../common/ErrorMessage';
import { useRegisterMutation, useGetCityQuery } from '../../store/slices/apiSlice';
import {
  TitleContainer,
  Title,
  MainContainer,
  Form,
  MainInputContainer,
  InputContainer,
} from './style';
import Toast from '../common/Toast';

function RegisterForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    city: 0,
  });

  const [errorInput, setErrorInput] = useState({
    errorName: '',
    errorEmail: '',
    errorPassword: '',
    errorAddress: '',
    errorCity: '',
  });

  const {
    data: cityData,
    error: cityError,
    isLoading: cityLoading,
  } = useGetCityQuery();

  const [register] = useRegisterMutation();

  const [errorRegister, setErrorRegister] = useState('');

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
    setErrorRegister('');
    setErrorInput({
      errorName: '',
      errorEmail: '',
      errorPassword: '',
      errorAddress: '',
      errorCity: '',
    });

    const newError = {
      errorName: '',
      errorEmail: '',
      errorPassword: '',
      errorAddress: '',
      errorCity: '',
    };

    if (!input.name) {
      newError.errorName = 'Name is required!';
    }

    if (!input.email) {
      newError.errorEmail = 'Email is required!';
    }

    if (!input.password) {
      newError.errorPassword = 'Password is required!';
    }

    if (!input.address) {
      newError.errorAddress = 'Address is required!';
    }

    if (input.city === 0) {
      newError.errorCity = 'City is required!';
    }

    setErrorInput(newError);

    if (!newError.errorName
        && !newError.errorEmail
        && !newError.errorPassword
        && !newError.errorAddress
        && !newError.errorCity) {
      register({
        name: input.name,
        email: input.email,
        password: input.password,
        address: input.address,
        cityID: input.city,
      })
        .unwrap()
        .then((payload) => {
          localStorage.setItem('user', JSON.stringify(payload.data));
          navigate('/', { replace: true });
          // console.log(JSON.parse(localStorage.getItem('user')).token);
        })
        .catch((error) => {
          if (!error.data) {
            setErrorRegister('Server is currently down, please try again later!');
          }
          setErrorRegister(error.data.message);
        });
    }
  };

  const handleToastClose = () => {
    setErrorRegister('');
  };

  const renderCitiesDropdown = () => cityData?.data.city.map((item) => (
    <option key={item.city_id} value={item.city_id}>{item.city_name}</option>
  ));

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit}>
        <TitleContainer>
          <Title>Register</Title>
        </TitleContainer>
        <MainInputContainer>
          <InputContainer>
            <Label labelFor="name">Name</Label>
            <Input
              inputType="text"
              inputID="name"
              inputName="name"
              inputValue={input.name}
              handleChange={handleInputChange}
            />
            {errorInput.errorName ? <ErrorMessage>{errorInput.errorName}</ErrorMessage> : null}
          </InputContainer>
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
            <Label htmlFor="password">Password</Label>
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
          <InputContainer>
            <Label htmlFor="address">Address</Label>
            <TextArea
              inputType="text"
              inputID="address"
              inputName="address"
              inputValue={input.address}
              handleChange={handleInputChange}
            />
            {errorInput.errorAddress
              ? <ErrorMessage>{errorInput.errorAddress}</ErrorMessage> : null}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="city">City</Label>
            <Select
              selectID="city"
              selectName="city"
              handleChange={handleInputChange}
              selectValue={input.city}
            >
              <option value={0} disabled>
                Choose one...
              </option>
              {!cityLoading && !cityError && (renderCitiesDropdown())}
            </Select>
            {errorInput.errorCity ? <ErrorMessage>{errorInput.errorCity}</ErrorMessage> : null}
          </InputContainer>
          <Button btnType="submit">Register</Button>
        </MainInputContainer>
      </Form>
      {errorRegister && (
        <Toast toastCloseClicked={handleToastClose}>
          {errorRegister}
        </Toast>
      )}
    </MainContainer>
  );
}

export default RegisterForm;
