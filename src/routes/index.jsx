import React, { useEffect } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';

import { Layout } from '../components';
import {
  Home, Login, Register, NotFound,
} from '../pages';

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
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/sementara',
          element: <RequireAuth redirectTo="/login"><NotFound /></RequireAuth>,
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

const RequireAuth = ({ redirectTo, children }) => {
  const navigate = useNavigate();
  const loc = useLocation();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate(redirectTo, { replace: true, state: { from: loc.pathname } });
    }
  }, []);

  return children;
};

export default Routes;
