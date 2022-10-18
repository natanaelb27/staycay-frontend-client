import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Label from '../common/Label';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import Select from '../common/Select';
import { useRegisterMutation } from '../../store/slices/apiSlice';

function RegisterForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
  });

  const [errorInput, setErrorInput] = useState({
    errorName: '',
    errorEmail: '',
    errorPassword: '',
    errorAddress: '',
    errorCity: '',
  });

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

    if (!input.city) {
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
        city: input.city,
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

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        inputType="text"
        inputID="name"
        inputName="name"
        inputValue={input.name}
        handleChange={handleInputChange}
      />
      {errorInput.errorName ? <p>{errorInput.errorName}</p> : null}
      <Label htmlFor="email">Email</Label>
      <Input
        inputType="text"
        inputID="email"
        inputName="email"
        inputValue={input.email}
        handleChange={handleInputChange}
      />
      {errorInput.errorEmail ? <p>{errorInput.errorEmail}</p> : null}
      <Label htmlFor="password">Password</Label>
      <Input
        inputType="password"
        inputID="password"
        inputName="password"
        inputValue={input.password}
        handleChange={handleInputChange}
      />
      {errorInput.errorPassword ? <p>{errorInput.errorPassword}</p> : null}
      <Label htmlFor="address">Address</Label>
      <TextArea
        inputType="text"
        inputID="address"
        inputName="address"
        inputValue={input.address}
        handleChange={handleInputChange}
      />
      {errorInput.errorAddress ? <p>{errorInput.errorAddress}</p> : null}
      <Label htmlFor="city">City</Label>
      <Select
        selectID="city"
        selectName="city"
        handleChange={handleInputChange}
      >
        <option key="default" value="default" disabled>
          Choose one...
        </option>
        <option key="Jakarta" value="Jakarta">
          Jakarta
        </option>
        <option key="Bandung" value="Bandung">
          Bandung
        </option>
      </Select>
      {errorInput.errorCity ? <p>{errorInput.errorCity}</p> : null}
      <Button btnType="submit">Register</Button>
      {errorRegister ? <p>{errorRegister}</p> : null}

    </form>
  );
}

export default RegisterForm;
