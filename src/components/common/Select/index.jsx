import React from 'react';

function Select({ children, ...props }) {
  return (
    <select
      id={props.selectID}
      onChange={props.handleChange}
      name={props.selectName}
      defaultValue="default"
    >
      {children}
    </select>
  );
}

export default Select;
