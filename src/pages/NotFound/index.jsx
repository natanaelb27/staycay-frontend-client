import React from 'react';
import { ErrorPage } from '../../components';

function NotFound() {
  return (
    <ErrorPage
      code={404}
      message="Page Not Found"
    />
  );
}

export default NotFound;
