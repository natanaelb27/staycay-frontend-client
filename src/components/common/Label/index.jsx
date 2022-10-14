import React from 'react';

function Label({ ...props }) {
  return (
    <label htmlFor={props.labelFor}>
      {props.children}
    </label>
  );
}

export default Label;
