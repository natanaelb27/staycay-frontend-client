import React from 'react';
import {
  Buttons,
} from './style';

function Button({ btnType, children }) {
  if (btnType === 'submit') {
    return (
      <Buttons type="submit">
        {children}
      </Buttons>
    );
  }
  return (
    <Buttons type="button">
      {children}
    </Buttons>
  );
}

export default Button;
