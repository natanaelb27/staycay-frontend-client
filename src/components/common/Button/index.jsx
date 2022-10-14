import React from 'react';

function Button({ btnType, children }) {
  if (btnType === 'submit') {
    return (
      <button type="submit">
        {children}
      </button>
    );
  }
  return (
    <button type="button">
      {children}
    </button>
  );
}

export default Button;
