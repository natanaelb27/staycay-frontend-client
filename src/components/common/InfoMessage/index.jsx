import React from 'react';
import {
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  InfoContainer,
  InfoIcon,
  InfoMessages,
} from './style';

function InfoMessage({ ...props }) {
  return (
    <InfoContainer>
      <InfoIcon icon={faInfoCircle} />
      <InfoMessages>{props.children}</InfoMessages>
    </InfoContainer>
  );
}

export default InfoMessage;
