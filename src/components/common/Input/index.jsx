import React from 'react';

function Input({ ...props }) {
  return (
    <input
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
