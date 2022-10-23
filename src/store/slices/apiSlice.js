import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'databaseApi',
  baseQuery: fetchBaseQuery({
    mode: 'cors',
    baseUrl: 'http://localhost:8080',
    // prepareHeaders: (headers, { getState }) => {
    //   const { token } = getState().auth;
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['Houses', 'Cities', 'Users', 'Reservations', 'Pickups'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({
        name, email, password, address, cityID,
      }) => ({
        url: '/register',
        method: 'POST',
        body: {
          name, email, password, address, city_id: parseInt(cityID, 10),
        },
      }),
      invalidatesTags: ['Users'],
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Users'],
    }),
    getHouse: builder.query({
      query: ({
        filterHouseName, filterCity, filterCheckInDate, filterCheckOutDate,
      }) => ({
        url: `/house?searchName=${filterHouseName}&searchCity=${filterCity}&searchCheckInDate=${filterCheckInDate}&searchCheckOutDate=${filterCheckOutDate}`,
        method: 'GET',
      }),
      providesTags: ['Houses'],
    }),
    getCity: builder.query({
      query: () => ({
        url: '/city',
        method: 'GET',
      }),
      providesTags: ['Cities'],
    }),
    getHouseByID: builder.query({
      query: (houseID) => ({
        url: `/house/${parseInt(houseID, 10)}`,
        method: 'GET',
      }),
      providesTags: ['Houses'],
    }),
    getHouseReservationsByHouseID: builder.query({
      query: (houseID) => ({
        url: `/house/reservation/${houseID}`,
        method: 'GET',
      }),
      providesTags: ['Reservations'],
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: '/user',
        method: 'GET',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      providesTags: ['Users'],
    }),
    getUserByID: builder.query({
      query: (userID) => ({
        url: `/user/${userID}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    updateUserProfile: builder.mutation({
      query: ({
        name, oldPassword, newPassword, address, cityID,
      }) => ({
        url: '/user',
        method: 'PATCH',
        body: {
          name,
          old_password: oldPassword,
          password: newPassword,
          address,
          city_id: cityID,
        },
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      invalidatesTags: ['Users'],
    }),
    updateUserRoleToHost: builder.mutation({
      query: () => ({
        url: '/user/role',
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      invalidatesTags: ['Users'],
    }),
    addReservation: builder.mutation({
      query: ({
        houseID, checkInDate, checkOutDate,
      }) => ({
        url: '/reservation',
        method: 'POST',
        body: {
          house_id: parseInt(houseID, 10), check_in_date: checkInDate, check_out_date: checkOutDate,
        },
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      invalidatesTags: ['Users', 'Reservations'],
    }),
    getReservationByUser: builder.query({
      query: ({ filterBy, limit, page }) => ({
        url: `/user/reservation?filterBy=${filterBy}&limit=${limit}&page=${page}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      providesTags: ['Reservations'],
    }),
    getReservationByID: builder.query({
      query: (reservationID) => ({
        url: `/reservation/${reservationID}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      providesTags: ['Reservations'],
    }),
    pickup: builder.mutation({
      query: ({
        reservationID,
        pickupAddress,
        cityID,
      }) => ({
        url: `/pickup/${reservationID}`,
        method: 'POST',
        body: {
          pickup_address: pickupAddress,
          city_id: parseInt(cityID, 10),
        },
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      invalidatesTags: ['Users', 'Reservations', 'Pickups'],
    }),
    getPickupByReservation: builder.query({
      query: (reservationID) => ({
        url: `/pickup/${reservationID}`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      providesTags: ['Pickups'],
    }),
    topUp: builder.mutation({
      query: ({
        amount,
      }) => ({
        url: '/topup',
        method: 'POST',
        body: {
          amount: parseInt(amount, 10),
        },
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetHouseQuery,
  useGetCityQuery,
  useGetHouseByIDQuery,
  useGetHouseReservationsByHouseIDQuery,
  useGetUserProfileQuery,
  useGetUserByIDQuery,
  useUpdateUserProfileMutation,
  useUpdateUserRoleToHostMutation,
  useAddReservationMutation,
  useLazyGetReservationByUserQuery,
  useGetReservationByIDQuery,
  usePickupMutation,
  useGetPickupByReservationQuery,
  useTopUpMutation,
} = apiSlice;
