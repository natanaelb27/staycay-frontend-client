import React, { useEffect } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';

import { Layout } from '../components';
import {
  Home,
  Login,
  Register,
  House,
  Hosting,
  HostingAddHouse,
  HostingUpdateHouse,
  Account,
  Reservation,
  ReservationDetail,
  Forbidden,
  InternalServerError,
  NotFound,
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
          path: '/reservation/:houseID',
          element: <RequireAuth redirectTo="/login"><Reservation /></RequireAuth>,
        },
        {
          path: '/account',
          element: <RequireAuth redirectTo="/login"><Account /></RequireAuth>,
        },
        {
          path: '/reservation-detail/:reservationID',
          element: <RequireAuth redirectTo="/login"><ReservationDetail /></RequireAuth>,
        },
        {
          path: '/hosting',
          element: <RequireAuth redirectTo="/login"><Hosting /></RequireAuth>,
        },
        {
          path: '/hosting/add-house',
          element: <RequireAuth redirectTo="/login"><HostingAddHouse /></RequireAuth>,
        },
        {
          path: '/hosting/update-house/:houseID',
          element: <RequireAuth redirectTo="/login"><HostingUpdateHouse /></RequireAuth>,
        },
        {
          path: '/forbidden',
          element: <Forbidden />,
        },
        {
          path: '/server-error',
          element: <InternalServerError />,
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
