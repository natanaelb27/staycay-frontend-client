import React from 'react';

function TextArea({ ...props }) {
  return (
    <textarea
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
