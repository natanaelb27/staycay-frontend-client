import React, { useState } from 'react';
import Label from '../../components/common/Label';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';
import {
  MainContainer,
  Container,
  LabelImage,
  InputImage,
  ImagesContainer,
  ImageContainer,
  Image,
} from './style';

function HostingAddHouse() {
  const [selectedImagesView, setSelectedImagesView] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

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

  return (
    <MainContainer>
      <Container>
        <Label>
          Name
          <Input />
        </Label>
        <Label>
          City
          <Select />
        </Label>
        <Label>
          Description
          <TextArea />
        </Label>
        <Label>
          Max Guest
          <Input />
        </Label>
        <Label>
          Price
          <Input />
        </Label>
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
        </div>
        <ImagesContainer>
          {selectedImagesView
          && selectedImagesView.map((image, index) => (
            <ImageContainer key={image}>
              <Image src={image} alt={`upload-${index}`} />
              <Button
                classes="danger"
                handleClick={() => {
                  setSelectedImages(selectedImages.filter((_, idx) => index !== idx));
                  setSelectedImagesView(selectedImagesView.filter((_, idx) => index !== idx));
                }}
              >
                Delete Image
              </Button>
            </ImageContainer>
          ))}
        </ImagesContainer>
        <Button handleClick={() => {
          console.log(selectedImages);
          console.log(selectedImagesView);
        }}
        >
          Save

        </Button>
      </Container>
    </MainContainer>
  );
}

export default HostingAddHouse;
