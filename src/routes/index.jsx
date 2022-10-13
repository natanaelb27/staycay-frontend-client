import React from 'react';
import { useRoutes } from 'react-router-dom';

import { Layout } from '../components';
import { Home, NotFound } from '../pages';

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return routes;
};

export default Routes;
