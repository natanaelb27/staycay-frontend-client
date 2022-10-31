import React, { useState } from 'react';
import {
  Container,
  Title,
  ContentDetailContainer,
  PersonalInfoContainer,
  EditButtonContainer,
  EditButton,
  SpanTitle,
  SpanDetail,
  EditContainer,
  EditTwoInputsContainer,
  WithErrorContainer,
  SecondContainer,
  SaveButtonContainer,
} from './style';
import Input from '../common/Input';
import { useGetUserProfileQuery, useUpdateUserProfileMutation, useGetCityQuery } from '../../store/slices/apiSlice';
import Button from '../common/Button';
import Select from '../common/Select';
import ErrorMessage from '../common/ErrorMessage';
import SkeletonLine from '../Skeleton/SkeletonLine';
import { verifyValidPassword } from '../../helpers';
import { showErrorToast, showSuccessToast } from '../../helpers/Toast';

function PersonalInfoSection() {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetUserProfileQuery();

  const {
    data: cityData,
    error: cityError,
    isLoading: cityLoading,
  } = useGetCityQuery();

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [isEditName, setIsEditName] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);
  const [inputUpdateProfile, setInputUpdateProfile] = useState({
    name: userData?.data.name,
    oldPassword: '',
    newPassword: '',
    address: userData?.data.address,
    cityID: userData?.data.city_id,
  });

  const [errorInput, setErrorInput] = useState({
    errorName: '',
    errorOldPassword: '',
    errorNewPassword: '',
    errorAddress: '',
    errorCity: '',
  });

  const handleClickEditName = () => {
    setInputUpdateProfile({
      name: userData?.data.name,
      oldPassword: inputUpdateProfile.oldPassword,
      newPassword: inputUpdateProfile.newPassword,
      address: inputUpdateProfile.address,
      cityID: inputUpdateProfile.city_id,
    });
    setIsEditName(!isEditName);
    setErrorInput({
      ...errorInput,
      errorName: '',
    });
  };

  const handleClickEditPassword = () => {
    setInputUpdateProfile({
      name: inputUpdateProfile.name,
      oldPassword: '',
      newPassword: '',
      address: inputUpdateProfile.address,
      cityID: inputUpdateProfile.city_id,
    });
    setIsEditPassword(!isEditPassword);
    setErrorInput({
      ...errorInput,
      errorOldPassword: '',
      errorNewPassword: '',
    });
  };

  const handleClickEditAddress = () => {
    setInputUpdateProfile({
      name: inputUpdateProfile.name,
      oldPassword: inputUpdateProfile.oldPassword,
      newPassword: inputUpdateProfile.newPassword,
      address: userData?.data.address,
      cityID: userData?.data.city_id,
    });
    setIsEditAddress(!isEditAddress);
    setErrorInput({
      ...errorInput,
      errorAddress: '',
      errorCity: '',
    });
  };

  const handleInputChange = (e) => {
    setInputUpdateProfile({ ...inputUpdateProfile, [e.target.name]: e.target.value });
  };

  const handleSaveChangeName = (e) => {
    e.preventDefault();

    setErrorInput({
      ...errorInput,
      errorName: '',
    });

    const newError = {
      errorName: '',
    };

    if (!inputUpdateProfile.name.trim()) {
      newError.errorName = 'Name is required!';
    }

    setErrorInput({
      ...errorInput,
      errorName: newError.errorName,
    });

    if (!newError.errorName) {
      updateUserProfile(
        {
          name: inputUpdateProfile.name,
        },
      ).unwrap()
        .then(() => {
          setIsEditName(!isEditName);
          showSuccessToast('Name updated successfully!');
        })
        .catch((error) => {
          if (!error.data) {
            showErrorToast('Server is currently down, please try again later!');
          }
          showErrorToast(error.data.message);
        });

      setIsEditName(!isEditName);
    }
  };

  const handleSaveChangePassword = (e) => {
    e.preventDefault();

    setErrorInput({
      ...errorInput,
      errorOldPassword: '',
      errorNewPassword: '',
    });

    const newError = {
      errorOldPassword: '',
      errorNewPassword: '',
    };

    if (!inputUpdateProfile.oldPassword) {
      newError.errorOldPassword = 'Old password is required!';
    }

    if (!verifyValidPassword(inputUpdateProfile.newPassword)) {
      newError.errorNewPassword = 'Password requirements: minimum 8 characters, 1 uppercase character, 1 lowercase character, 1 number, and no special characters';
    }

    if (!inputUpdateProfile.newPassword) {
      newError.errorNewPassword = 'New password is required!';
    }

    setErrorInput({
      ...errorInput,
      errorOldPassword: newError.errorOldPassword,
      errorNewPassword: newError.errorNewPassword,
    });

    if (!newError.errorOldPassword && !newError.errorNewPassword) {
      updateUserProfile(
        {
          oldPassword: inputUpdateProfile.oldPassword,
          newPassword: inputUpdateProfile.newPassword,
        },
      ).unwrap()
        .then(() => {
          setIsEditPassword(!isEditPassword);
          showSuccessToast('Password updated successfully!');
        })
        .catch((error) => {
          if (!error.data) {
            showErrorToast('Server is currently down, please try again later!');
          }
          showErrorToast(error.data.message);
        });
    }
  };

  const handleSaveChangeAddress = (e) => {
    e.preventDefault();

    setErrorInput({
      ...errorInput,
      errorAddress: '',
      errorCity: '',
    });

    const newError = {
      errorAddress: '',
      errorCity: '',
    };

    if (!inputUpdateProfile.address.trim()) {
      newError.errorAddress = 'Address is required!';
    }

    if (inputUpdateProfile.cityID === 0) {
      newError.errorCity = 'City is required!';
    }

    setErrorInput({
      ...errorInput,
      errorAddress: newError.errorAddress,
      errorCity: newError.errorCity,
    });

    if (!newError.errorAddress && !newError.errorCity) {
      updateUserProfile(
        {
          address: inputUpdateProfile.address,
          cityID: inputUpdateProfile.cityID,
        },
      ).unwrap()
        .then(() => {
          setIsEditAddress(!isEditAddress);
          showSuccessToast('Address updated successfully!');
        })
        .catch((error) => {
          if (!error.data) {
            showErrorToast('Server is currently down, please try again later!');
          }
          showErrorToast(error.data.message);
        });
    }
  };

  const renderCitiesDropdown = () => cityData?.data.city.map((item) => (
    <option key={item.city_id} value={item.city_id}>{item.city_name}</option>
  ));

  return (
    <Container>
      <Title>Personal Info</Title>
      <ContentDetailContainer>
        <PersonalInfoContainer>
          <SpanTitle>Name</SpanTitle>
          {userLoading && (<SkeletonLine />)}
          {!userLoading && !userError && (
            !isEditName
              ? (<SpanDetail>{userData?.data.name}</SpanDetail>)
              : (
                <EditContainer>
                  <Input
                    inputValue={inputUpdateProfile.name}
                    inputName="name"
                    inputPlaceholder="Full Name"
                    handleChange={handleInputChange}
                  />
                  {errorInput.errorName
                    ? <ErrorMessage>{errorInput.errorName}</ErrorMessage> : null}
                  <SaveButtonContainer>
                    <Button handleClick={handleSaveChangeName}>Save</Button>
                  </SaveButtonContainer>
                </EditContainer>
              )
          )}
        </PersonalInfoContainer>
        <EditButtonContainer>
          <EditButton type="button" onClick={handleClickEditName}>{!isEditName ? 'Edit' : 'Cancel'}</EditButton>
        </EditButtonContainer>
      </ContentDetailContainer>
      <ContentDetailContainer>
        <PersonalInfoContainer>
          <SpanTitle>{!isEditPassword ? 'Password' : 'Old Password'}</SpanTitle>
          {userLoading && (<SkeletonLine />)}
          {!userLoading && !userError && (
            !isEditPassword
              ? (<SpanDetail>********</SpanDetail>)
              : (
                <EditContainer>
                  <EditTwoInputsContainer>
                    <WithErrorContainer>
                      <Input
                        inputType="password"
                        inputValue={inputUpdateProfile.oldPassword}
                        inputName="oldPassword"
                        inputPlaceholder="Old Password"
                        handleChange={handleInputChange}
                      />
                      {errorInput.errorOldPassword
                        ? <ErrorMessage>{errorInput.errorOldPassword}</ErrorMessage> : null}
                    </WithErrorContainer>
                    <SecondContainer>
                      <SpanTitle>New Password</SpanTitle>
                      <Input
                        inputType="password"
                        inputValue={inputUpdateProfile.newPassword}
                        inputName="newPassword"
                        inputPlaceholder="New Password"
                        handleChange={handleInputChange}
                      />
                      {errorInput.errorNewPassword
                        ? <ErrorMessage>{errorInput.errorNewPassword}</ErrorMessage> : null}
                    </SecondContainer>
                  </EditTwoInputsContainer>
                  <SaveButtonContainer>
                    <Button handleClick={handleSaveChangePassword}>Save</Button>
                  </SaveButtonContainer>
                </EditContainer>
              )
          )}
        </PersonalInfoContainer>
        <EditButtonContainer>
          <EditButton type="button" onClick={handleClickEditPassword}>{!isEditPassword ? 'Edit' : 'Cancel'}</EditButton>
        </EditButtonContainer>
      </ContentDetailContainer>
      <ContentDetailContainer>
        <PersonalInfoContainer>
          <SpanTitle>Email</SpanTitle>
          {userLoading && (<SkeletonLine />)}
          {!userLoading && !userError && (
          <SpanDetail>{userData?.data.email}</SpanDetail>
          )}
        </PersonalInfoContainer>
        <div />
      </ContentDetailContainer>
      <ContentDetailContainer>
        <PersonalInfoContainer>
          <SpanTitle>Address</SpanTitle>
          {userLoading && (<SkeletonLine />)}
          {!userLoading && !userError && (
            !isEditAddress
              ? (
                <SpanDetail>
                  {' '}
                  {userData?.data.address.length > 100
                    ? `${userData?.data.address.substring(0, 100)}...` : userData?.data.address}
                  ,
                  {' '}
                  {userData?.data.city_name}
                </SpanDetail>
              )
              : (
                <EditContainer>
                  <EditTwoInputsContainer>
                    <WithErrorContainer>
                      <Input
                        inputValue={inputUpdateProfile.address}
                        inputName="address"
                        inputPlaceholder="Address"
                        handleChange={handleInputChange}
                      />
                      {errorInput.errorAddress
                        ? <ErrorMessage>{errorInput.errorAddress}</ErrorMessage> : null}
                    </WithErrorContainer>
                    <SecondContainer>
                      <SpanTitle>City</SpanTitle>
                      <Select selectName="cityID" selectID="cityID" handleChange={handleInputChange} selectValue={inputUpdateProfile.cityID}>
                        {!cityLoading && !cityError && (renderCitiesDropdown())}
                      </Select>
                      {errorInput.errorCity
                        ? <ErrorMessage>{errorInput.errorCity}</ErrorMessage> : null}
                    </SecondContainer>
                  </EditTwoInputsContainer>
                  <SaveButtonContainer>
                    <Button handleClick={handleSaveChangeAddress}>Save</Button>
                  </SaveButtonContainer>
                </EditContainer>
              )
          )}
        </PersonalInfoContainer>
        <EditButtonContainer>
          <EditButton type="button" onClick={handleClickEditAddress}>{!isEditAddress ? 'Edit' : 'Cancel'}</EditButton>
        </EditButtonContainer>
      </ContentDetailContainer>
    </Container>
  );
}

export default PersonalInfoSection;
