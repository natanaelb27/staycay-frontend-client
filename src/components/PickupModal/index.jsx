import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import Label from '../common/Label';
import TextArea from '../common/TextArea';
import Select from '../common/Select';
import ErrorMessage from '../common/ErrorMessage';
import {
  ModalContainer,
  Container,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ContentContainer,
} from './style';
import { useGetCityQuery, useGetUserProfileQuery, usePickupMutation } from '../../store/slices/apiSlice';
import { showSuccessToast, showErrorToast } from '../../helpers/Toast';

function PickupModal({
  reservationID, isShow, onClose,
}) {
  const { data: userData } = useGetUserProfileQuery();
  const { data: cityData } = useGetCityQuery();
  const [pickup] = usePickupMutation();

  const [input, setInput] = useState({
    pickupAddress: userData?.data.address,
    cityID: userData?.data.city_id,
  });

  const handleClose = () => {
    setInput({
      pickupAddress: userData?.data.address,
      cityID: userData?.data.city_id,
    });
    onClose();
  };

  const [errorInputAddress, setErrorInputAddress] = useState('');

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      handleClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const renderCitiesDropdown = () => cityData?.data.city.map((item) => (
    <option key={item.city_id} value={item.city_id}>{item.city_name}</option>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorInputAddress('');

    let newError = '';

    if (!input.pickupAddress) {
      newError = 'Pickup address is required!';
      setErrorInputAddress(newError);
      return;
    }

    if (!newError) {
      pickup({
        reservationID,
        pickupAddress: input.pickupAddress,
        cityID: input.cityID,
      })
        .unwrap()
        .then(() => {
          showSuccessToast('Pickup Requested Successfully!');
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
    <ModalContainer onClick={handleClose} className={`${isShow ? 'show' : ''}`}>
      <ModalContent onClick={(e) => e.stopPropagation()} className={`${isShow ? 'show' : ''}`}>
        <ModalHeader>
          <ModalTitle>
            Request Pickup
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Container>
            <ContentContainer>
              <Label labelFor="pickupAddress">Pickup Address</Label>
              <TextArea
                inputID="pickupAddress"
                inputName="pickupAddress"
                inputValue={input.pickupAddress}
                inputPlaceholder="Pickup Address"
                handleChange={handleInputChange}
              />
              {errorInputAddress
                ? <ErrorMessage>{errorInputAddress}</ErrorMessage> : null}

            </ContentContainer>
            <ContentContainer>
              <Label labelFor="city">City</Label>
              <Select
                selectName="cityID"
                selectValue={input.cityID}
                handleChange={handleInputChange}
              >
                <option value={0} disabled>Choose one...</option>
                {renderCitiesDropdown()}
              </Select>
            </ContentContainer>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button type="button" handleClick={handleClose} classes="danger">Close</Button>
          <Button type="button" handleClick={handleSubmit}>Request Pickup</Button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
}

export default PickupModal;
