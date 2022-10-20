import React from 'react';
import { Options } from './style';

function Option({ children }) {
  return (
    <Options>
      {children}
    </Options>
  );
}

export default Option;
