import React from 'react';
import {
  Inputs,
} from './style';

function Input({ ...props }) {
  if (props.inputType === 'date') {
    return (
      <Inputs
        type={props.inputType}
        id={props.inputID}
        name={props.inputName}
        value={props.inputValue}
        placeholder={props.inputPlaceholder}
        disabled={props.isDisabled}
        onChange={props.handleChange}
        min={props.inputMin}
        max={props.inputMax}
      />
    );
  }

  return (

    <Inputs
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

export default Input;
