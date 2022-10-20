import React from 'react';
import { TextAreas } from './style';

function TextArea({ ...props }) {
  return (
    <TextAreas
      type={props.inputType}
      id={props.inputID}
      name={props.inputName}
      value={props.inputValue}
      placeholder={props.inputPlaceholder}
      disabled={props.isDisabled}
      onChange={props.handleChange}
    />
  );
}

export default TextArea;
