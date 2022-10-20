import React, { useEffect } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';

import { Layout } from '../components';
import {
  Home, Login, Register, House, NotFound, Hosting, Reservation,
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
          element: <AlreadyAuth redirectTo="/"><Login /></AlreadyAuth>,
        },
        {
          path: '/register',
          element: <AlreadyAuth redirectTo="/"><Register /></AlreadyAuth>,
        },
        {
          path: '/house/:houseID',
          element: <House />,
        },
        {
          path: '/reservation',
          element: <RequireAuth redirectTo="/login"><Reservation /></RequireAuth>,
        },
        {
          path: '/hosting',
          element: <RequireAuth redirectTo="/login"><Hosting /></RequireAuth>,
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

const AlreadyAuth = ({ redirectTo, children }) => {
  const navigate = useNavigate();
  const loc = useLocation();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate(redirectTo, { replace: true, state: { from: loc.pathname } });
    }
  }, []);

  return children;
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
