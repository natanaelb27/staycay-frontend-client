/* eslint-disable no-unused-vars */
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
  SecondContainer,
  SaveButtonContainer,
} from './style';
import Input from '../common/Input';
import { useGetUserProfileQuery, useUpdateUserProfileMutation, useGetCityQuery } from '../../store/slices/apiSlice';
import Button from '../common/Button';
import Select from '../common/Select';

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

  const handleClickEditName = () => {
    setInputUpdateProfile({
      name: userData?.data.name,
      oldPassword: '',
      newPassword: '',
      address: userData?.data.address,
      cityID: userData?.data.city_id,
    });
    setIsEditName(!isEditName);
  };

  const handleClickEditPassword = () => {
    setInputUpdateProfile({
      name: userData?.data.name,
      oldPassword: '',
      newPassword: '',
      address: userData?.data.address,
      cityID: userData?.data.city_id,
    });
    setIsEditPassword(!isEditPassword);
  };

  const handleClickEditAddress = () => {
    setInputUpdateProfile({
      name: userData?.data.name,
      oldPassword: '',
      newPassword: '',
      address: userData?.data.address,
      cityID: userData?.data.city_id,
    });
    setIsEditAddress(!isEditAddress);
  };

  const handleInputChange = (e) => {
    setInputUpdateProfile({ ...inputUpdateProfile, [e.target.name]: e.target.value });
  };

  const handleSaveChange = (e) => {
    e.preventDefault();
    updateUserProfile(
      {
        name: inputUpdateProfile.name,
        address: inputUpdateProfile.address,
        cityID: inputUpdateProfile.cityID,
      },
    );
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
          {!isEditName
            ? (<SpanDetail>{userData?.data.name}</SpanDetail>)
            : (
              <EditContainer>
                <Input
                  inputValue={inputUpdateProfile.name}
                  inputName="name"
                  inputPlaceholder="Full Name"
                  handleChange={handleInputChange}
                />
                <SaveButtonContainer>
                  <Button handleClick={handleSaveChange}>Save</Button>
                </SaveButtonContainer>
              </EditContainer>
            )}
        </PersonalInfoContainer>
        <EditButtonContainer>
          <EditButton type="button" onClick={handleClickEditName}>{!isEditName ? 'Edit' : 'Cancel'}</EditButton>
        </EditButtonContainer>
      </ContentDetailContainer>
      <ContentDetailContainer>
        <PersonalInfoContainer>
          <SpanTitle>{!isEditPassword ? 'Password' : 'Old Password'}</SpanTitle>
          {!isEditPassword
            ? (<SpanDetail>********</SpanDetail>)
            : (
              <EditContainer>
                <EditTwoInputsContainer>
                  <Input
                    inputType="password"
                    inputValue={inputUpdateProfile.oldPassword}
                    inputName="oldPassword"
                    inputPlaceholder="Old Password"
                    handleChange={handleInputChange}
                  />
                  <SecondContainer>
                    <SpanTitle>New Password</SpanTitle>
                    <Input
                      inputType="password"
                      inputValue={inputUpdateProfile.newPassword}
                      inputName="newPassword"
                      inputPlaceholder="New Password"
                      handleChange={handleInputChange}
                    />
                  </SecondContainer>
                </EditTwoInputsContainer>
                <SaveButtonContainer>
                  <Button handleClick={handleSaveChange}>Save</Button>
                </SaveButtonContainer>
              </EditContainer>
            )}
        </PersonalInfoContainer>
        <EditButtonContainer>
          <EditButton type="button" onClick={handleClickEditPassword}>{!isEditPassword ? 'Edit' : 'Cancel'}</EditButton>
        </EditButtonContainer>
      </ContentDetailContainer>
      <ContentDetailContainer>
        <PersonalInfoContainer>
          <SpanTitle>Email</SpanTitle>
          <SpanDetail>{userData?.data.email}</SpanDetail>
        </PersonalInfoContainer>
        <div />
      </ContentDetailContainer>
      <ContentDetailContainer>
        <PersonalInfoContainer>
          <SpanTitle>Address</SpanTitle>
          {!isEditAddress
            ? (
              <SpanDetail>
                {' '}
                {userData?.data.address}
                ,
                {' '}
                {userData?.data.city_name}
              </SpanDetail>
            )
            : (
              <EditContainer>
                <EditTwoInputsContainer>
                  <Input
                    inputValue={inputUpdateProfile.address}
                    inputName="address"
                    inputPlaceholder="Address"
                    handleChange={handleInputChange}
                  />
                  <SecondContainer>
                    <SpanTitle>City</SpanTitle>
                    <Select selectName="cityID" selectID="cityID" handleChange={handleInputChange} selectValue={inputUpdateProfile.cityID}>
                      {!cityLoading && !cityError && (renderCitiesDropdown())}
                    </Select>
                  </SecondContainer>
                </EditTwoInputsContainer>
                <SaveButtonContainer>
                  <Button handleClick={handleSaveChange}>Save</Button>
                </SaveButtonContainer>
              </EditContainer>
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
