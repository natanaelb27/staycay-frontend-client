import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Label from '../../components/common/Label';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import ErrorMessage from '../../components/common/ErrorMessage';
import {
  MainContainer,
  Container,
  SmallContentContainer,
  LabelImage,
  InputImage,
  HousePhotoContainer,
  ImagesContainer,
  ButtonContainer,
  ButtonContentContainer,
  TitleContainer,
  BackIcon,
  Title,
} from './style';
import { useGetCityQuery, useAddHouseMutation } from '../../store/slices/apiSlice';
import NewHousePhotoCard from '../../components/NewHousePhotoCard';
import { showErrorToast, showSuccessToast } from '../../helpers/Toast';

function HostingAddHouse() {
  const navigate = useNavigate();
  const [selectedImagesView, setSelectedImagesView] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const { data: cityData } = useGetCityQuery();
  const [addHouse] = useAddHouseMutation();

  const [input, setInput] = useState({
    name: '',
    city: 0,
    description: '',
    maxGuest: 0,
    price: 0,
  });

  const [errorInput, setErrorInput] = useState({
    errorName: '',
    errorCity: '',
    errorDescription: '',
    errorMaxGuest: '',
    errorPrice: '',
    errorPhoto: '',
  });

  const handleInputChange = (e) => {
    if (e.target.name === 'maxGuest' || e.target.name === 'price') {
      if (e.target.value < 0) {
        e.target.value = 0;
      }
    }

    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const isObjectNotEmpty = (obj) => Object.values(obj).every((value) => {
    if (value === '') {
      return true;
    }

    return false;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorInput({
      errorName: '',
      errorCity: '',
      errorDescription: '',
      errorMaxGuest: '',
      errorPrice: '',
      errorPhoto: '',
    });

    const newError = {
      errorName: '',
      errorCity: '',
      errorDescription: '',
      errorMaxGuest: '',
      errorPrice: '',
      errorPhoto: '',
    };

    if (!input.name.trim()) {
      newError.errorName = 'House name is required!';
    }

    if (input.city === 0) {
      newError.errorCity = 'House city is required!';
    }

    if (!input.description.trim()) {
      newError.errorDescription = 'House description is required!';
    }

    if (input.maxGuest <= 0) {
      newError.errorMaxGuest = 'Max guest is required!';
    }

    if (input.price <= 0) {
      newError.errorPrice = 'Price is required!';
    }

    if (selectedImages.length === 0) {
      newError.errorPhoto = 'House photo is required';
    }
    setErrorInput(newError);

    if (isObjectNotEmpty(newError)) {
      const housePhoto = [];
      const uploadPhoto = selectedImages.map((file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET_NAME);
        formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
        formData.append('timestamp', (Date.now() / 1000) || 0);

        return axios.post(process.env.REACT_APP_CLOUDINARY_API_URL, formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        }).then((response) => {
          const { data } = response;
          const fileURL = data.secure_url;
          housePhoto.push(fileURL);
        });
      });

      axios.all(uploadPhoto).then(() => {
        addHouse({
          name: input.name,
          price: input.price,
          description: input.description,
          cityID: input.city,
          maxGuest: input.maxGuest,
          photo: housePhoto,
        })
          .unwrap()
          .then(() => {
            navigate('/hosting');
            showSuccessToast('House Created Successfully');
          }).catch((error) => {
            if (!error.data) {
              showErrorToast('Server is currently down, please try again later!');
            }
            showErrorToast(error.data.message);
          });
      });
    }
  };

  const onClickDeleteNewPhoto = (idx) => {
    setSelectedImages(selectedImages.filter((_, index) => idx !== index));
    setSelectedImagesView(selectedImagesView.filter((_, index) => idx !== index));
  };

  const renderNewHouseImage = () => (
    selectedImagesView?.map((image, index) => (
      <NewHousePhotoCard
        key={image}
        img={image}
        idx={index}
        handleClick={onClickDeleteNewPhoto}
      />
    ))
  );

  const onSelectFile = (e) => {
    setErrorInput({ ...errorInput, errorPhoto: '' });
    const selectedFiles = e.target.files;
    const selectedFilesViewArray = Array.from(selectedFiles);
    const imagesViewArray = selectedFilesViewArray.map((file) => URL.createObjectURL(file));
    setSelectedImagesView([...selectedImagesView, ...imagesViewArray]);

    const selectedFilesArray = [];
    for (let i = 0; i < selectedFiles.length; i += 1) {
      selectedFilesArray.push(selectedFiles[i]);
    }
    setSelectedImages([...selectedImages, ...selectedFilesArray]);
  };

  const handleInvalidKey = (e) => {
    const invalidChars = ['e', 'E', '+', '-', '.'];
    return invalidChars.includes(e.key) && e.preventDefault();
  };

  const renderCitiesDropdown = () => cityData?.data.city.map((item) => (
    <option key={item.city_id} value={item.city_id}>{item.city_name}</option>
  ));

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <MainContainer>
      <TitleContainer>
        <BackIcon onClick={handleClickBack} />
        <Title>Add New House</Title>
      </TitleContainer>
      <Container>
        <Label>
          Name
          <Input
            inputName="name"
            inputValue={input.name}
            handleChange={handleInputChange}
          />
          {errorInput.errorName ? <ErrorMessage>{errorInput.errorName}</ErrorMessage> : null}
        </Label>
        <Label>
          Description
          <TextArea
            inputName="description"
            inputValue={input.description}
            handleChange={handleInputChange}
          />
          {errorInput.errorDescription
            ? <ErrorMessage>{errorInput.errorDescription}</ErrorMessage> : null}
        </Label>
        <SmallContentContainer>
          <Label>
            City
            <Select
              selectName="city"
              inputValue={input.city}
              handleChange={handleInputChange}
              selectValue={input.city}
            >
              <option value={0} disabled>Choose one...</option>
              {renderCitiesDropdown()}
            </Select>
            {errorInput.errorCity ? <ErrorMessage>{errorInput.errorCity}</ErrorMessage> : null}
          </Label>
          <Label>
            Max Guest
            <Input
              inputType="number"
              inputName="maxGuest"
              inputValue={input.maxGuest === 0 ? '' : input.maxGuest}
              handleChange={handleInputChange}
              handleKeyDown={handleInvalidKey}
            />
            {errorInput.errorMaxGuest
              ? <ErrorMessage>{errorInput.errorMaxGuest}</ErrorMessage> : null}
          </Label>
          <Label>
            Price
            <Input
              inputType="number"
              inputName="price"
              inputValue={input.price === 0 ? '' : input.price}
              handleChange={handleInputChange}
              handleKeyDown={handleInvalidKey}
            />
            {errorInput.errorPrice ? <ErrorMessage>{errorInput.errorPrice}</ErrorMessage> : null}
          </Label>
        </SmallContentContainer>

        <div>
          <Label>
            House Photo
          </Label>
          <LabelImage>
            Upload from your device
            <InputImage
              type="file"
              name="images"
              onChange={onSelectFile}
              onClick={(e) => {
                e.target.value = null;
              }}
              multiple
              accept="image/png, image/jpeg, image/webp"
            />
          </LabelImage>
          <HousePhotoContainer>
            {errorInput.errorPhoto ? <ErrorMessage>{errorInput.errorPhoto}</ErrorMessage> : null}
          </HousePhotoContainer>
          {selectedImages.length > 0 ? (
            <ImagesContainer>
              {selectedImagesView
          && renderNewHouseImage()}
            </ImagesContainer>
          ) : null}
        </div>

        <ButtonContainer>
          <ButtonContentContainer>
            <Button handleClick={handleSubmit}>
              Add House
            </Button>
          </ButtonContentContainer>
        </ButtonContainer>

      </Container>
    </MainContainer>
  );
}

export default HostingAddHouse;
