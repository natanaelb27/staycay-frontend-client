/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import {
  useGetCityQuery,
  useGetHouseByIDQuery,
  useAddHousePhotoMutation,
  useGetHouseStatusesQuery,
  useUpdateHouseByIDMutation,
  useDeleteHouseMutation,
} from '../../store/slices/apiSlice';
import {
  MainContainer,
  ContentContainer,
  HouseImageContainer,
  ImagesContainer,
  OuterImageContainer,
  HouseContentContainer,
  NewPhotoButtonContainer,
  HouseContentDetailsContainer,
  LabelImage,
  InputImage,
  SpanTitle,
  SpanDetail,
  HouseStatusContainer,
  ButtonContainer,
} from './style';
import UpdateHousePhotoCard from '../../components/UpdateHousePhotoCard';
import {
  SkeletonImage, SkeletonLine, SkeletonText,
} from '../../components';
import Button from '../../components/common/Button';
import { numberWithCommas } from '../../helpers';
import DangerModal from '../../components/common/DangerModal';
import NewHousePhotoCard from '../../components/NewHousePhotoCard';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Select from '../../components/common/Select';
import Label from '../../components/common/Label';
import ErrorMessage from '../../components/common/ErrorMessage';

function HostingUpdateHouse() {
  const navigate = useNavigate();
  const params = useParams();
  const {
    data: houseData,
    error: houseError,
    isFetching: houseLoading,
  } = useGetHouseByIDQuery({
    houseID: params.houseID,
  });

  const {
    data: houseStatusData,
  } = useGetHouseStatusesQuery();

  const [updateHouse] = useUpdateHouseByIDMutation();

  const [deleteHouse] = useDeleteHouseMutation();

  const { data: cityData } = useGetCityQuery();
  const [addHousePhoto] = useAddHousePhotoMutation();
  const [selectedImagesView, setSelectedImagesView] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [input, setInput] = useState({
    name: '',
    city: 0,
    description: '',
    maxGuest: 0,
    price: 0,
  });

  useEffect(() => {
    setInput({
      ...input,
      name: houseData?.data.house_name || '',
      city: houseData?.data.house_city_id || 0,
      description: houseData?.data.house_description || '',
      maxGuest: houseData?.data.house_max_guest || 0,
      price: houseData?.data.house_price || 0,
    });
  }, [houseData]);

  const [errorInput, setErrorInput] = useState({
    errorName: '',
    errorCity: '',
    errorDescription: '',
    errorMaxGuest: '',
    errorPrice: '',
  });

  const [showTerminateModal, setShowTerminateModal] = useState(false);

  const renderHouseImage = () => (
    houseData?.data.house_photo.map((item) => (
      <UpdateHousePhotoCard key={item.photo_id} housePhotoData={item} />
    ))
  );

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

  const onAddNewHousePhoto = (e) => {
    e.preventDefault();
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
      addHousePhoto({
        houseID: params.houseID,
        photo: housePhoto,
      }).finally(() => {
        setSelectedImagesView([]);
        setSelectedImages([]);
      });
    });
  };

  const findHouseStatusIDByName = (statusName) => (
    houseStatusData?.data.house_status.find(
      (item) => item.house_status_name.toLowerCase() === statusName,
    ).house_status_id
  );

  const onSelectFile = (e) => {
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

  const handleInputChange = (e) => {
    if (e.target.name === 'maxGuest' || e.target.name === 'price') {
      if (e.target.value < 0) {
        e.target.value = 0;
      }
    }

    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleInvalidKey = (e) => {
    const invalidChars = ['e', 'E', '+', '-', '.'];
    return invalidChars.includes(e.key) && e.preventDefault();
  };

  const renderCitiesDropdown = () => cityData?.data.city.map((item) => (
    <option key={item.city_id} value={item.city_id}>{item.city_name}</option>
  ));

  const onClickStatusButton = () => {
    let newHouseStatusID = 0;
    if (houseData?.data.house_status.toLowerCase() === 'active') {
      newHouseStatusID = findHouseStatusIDByName('inactive');
    }

    if (houseData?.data.house_status.toLowerCase() === 'inactive') {
      newHouseStatusID = findHouseStatusIDByName('active');
    }

    // if (houseStatusData?.data.house_status === 'deactivated by admin') {
    //   newHouseStatusID = findHouseStatusIDByName('active');
    // }

    updateHouse({
      houseID: params.houseID,
      houseStatusID: newHouseStatusID,
    });
  };

  const isObjectNotEmpty = (obj) => Object.values(obj).every((value) => {
    if (value === '') {
      return true;
    }

    return false;
  });

  const onClickSaveChanges = (e) => {
    e.preventDefault();

    setErrorInput({
      errorName: '',
      errorCity: '',
      errorDescription: '',
      errorMaxGuest: '',
      errorPrice: '',
    });

    const newError = {
      errorName: '',
      errorCity: '',
      errorDescription: '',
      errorMaxGuest: '',
      errorPrice: '',
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

    setErrorInput(newError);

    if (isObjectNotEmpty(newError)) {
      updateHouse({
        houseID: params.houseID,
        name: input.name,
        price: input.price,
        description: input.description,
        cityID: input.city,
        maxGuest: input.maxGuest,
      });
    }
  };

  const onClickTerminateHouse = () => {
    setShowTerminateModal(true);
  };

  const onCloseTerminateModal = () => {
    setShowTerminateModal(false);
  };

  const onSubmitTerminateModal = () => {
    deleteHouse(params.houseID);
    navigate('/hosting');
  };

  if (!houseLoading && houseError && houseError.data.code === 400) {
    navigate('/');
  }

  return (
    <MainContainer>
      <ToastContainer />
      <ContentContainer>
        {houseLoading && <SkeletonLine classes="w-30p" />}
        {!houseLoading && !houseError && (
          <div>
            <Label>
              House Name
              <Input
                inputValue={input.name}
                inputName="name"
                inputPlaceholder="House Name"
                handleChange={handleInputChange}
              />
            </Label>
            {errorInput.errorName
              ? <ErrorMessage>{errorInput.errorName}</ErrorMessage> : null}
          </div>
        )}
      </ContentContainer>
      <HouseImageContainer>
        {houseLoading && <SkeletonImage classes="full" />}
        {!houseLoading && !houseError && (
          <OuterImageContainer>
            <SpanTitle>House Photo</SpanTitle>
            <ImagesContainer>
              {renderHouseImage()}
            </ImagesContainer>
          </OuterImageContainer>
        )}
        {selectedImages.length > 0 ? (
          <OuterImageContainer>
            <SpanTitle>New Uploads</SpanTitle>
            <ImagesContainer>
              {renderNewHouseImage()}
            </ImagesContainer>
          </OuterImageContainer>
        ) : null}
        {selectedImages.length > 0 ? (
          <NewPhotoButtonContainer>
            <Button handleClick={onAddNewHousePhoto}>
              Add New Photos
            </Button>
          </NewPhotoButtonContainer>
        ) : null}
        <LabelImage>
          Upload New Photo from your device
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
      </HouseImageContainer>
      <HouseContentContainer>
        {houseLoading && <SkeletonText classes="full" />}
        {!houseLoading && !houseError && (
        <HouseContentDetailsContainer>
          <ContentContainer>
            <Label>
              Description
              <TextArea
                inputValue={input.description}
                inputName="description"
                inputPlaceholder="Description"
                handleChange={handleInputChange}
              />
            </Label>
            {errorInput.errorDescription
              ? <ErrorMessage>{errorInput.errorDescription}</ErrorMessage> : null}
          </ContentContainer>
          <ContentContainer>
            <Label>
              City
              <Select
                selectValue={input.city}
                selectName="city"
                handleChange={handleInputChange}
              >
                {renderCitiesDropdown()}
              </Select>
            </Label>
            {errorInput.errorCity
              ? <ErrorMessage>{errorInput.errorCity}</ErrorMessage> : null}
          </ContentContainer>
          <ContentContainer>
            <Label>
              Max Guest
              <Input
                inputType="number"
                inputValue={input.maxGuest}
                inputName="maxGuest"
                inputPlaceholder="Max Guest"
                handleChange={handleInputChange}
                handleKeyDown={handleInvalidKey}
              />
            </Label>
            {errorInput.errorMaxGuest
              ? <ErrorMessage>{errorInput.errorMaxGuest}</ErrorMessage> : null}
          </ContentContainer>
          <ContentContainer>
            <Label>
              Price
              <Input
                inputType="number"
                inputValue={input.price}
                inputName="price"
                inputPlaceholder="Price"
                handleChange={handleInputChange}
                handleKeyDown={handleInvalidKey}
              />
            </Label>
            {errorInput.errorPrice
              ? <ErrorMessage>{errorInput.errorPrice}</ErrorMessage> : null}
          </ContentContainer>
          <HouseStatusContainer>
            <ContentContainer>
              <Label>House Status</Label>
              <SpanDetail>
                {houseData?.data.house_status}
              </SpanDetail>
            </ContentContainer>
            <Button
              classes={houseData?.data.house_status.toLowerCase() === 'active' ? 'danger' : 'blue'}
              isDisabled={houseData?.data.house_status.toLowerCase() === 'deactivated by admin'}
              handleClick={onClickStatusButton}
            >
              {houseData?.data.house_status.toLowerCase() === 'active' ? 'deactivate' : 'activate'}
            </Button>
          </HouseStatusContainer>
          <ButtonContainer>
            <Button
              classes="blue"
              handleClick={onClickSaveChanges}
            >
              Save Changes
            </Button>
            <Button
              classes="danger"
              handleClick={onClickTerminateHouse}
            >
              Terminate House
            </Button>
          </ButtonContainer>
        </HouseContentDetailsContainer>
        )}
      </HouseContentContainer>
      <DangerModal
        isShow={showTerminateModal}
        onClose={onCloseTerminateModal}
        title="Terminate House"
        handleSubmit={onSubmitTerminateModal}
        submitText="Delete House"
      >
        Are you sure you want to delete this house?
      </DangerModal>
    </MainContainer>

  );
}

export default HostingUpdateHouse;
