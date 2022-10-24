import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'databaseApi',
  baseQuery: fetchBaseQuery({
    mode: 'cors',
    baseUrl: process.env.REACT_APP_API_URL,
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
    getUnscopedHouseByID: builder.query({
      query: (houseID) => ({
        url: `/house/unscoped/${parseInt(houseID, 10)}`,
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
    getReservationByHost: builder.query({
      query: ({ filterBy, limit, page }) => ({
        url: `/host/reservation?filterBy=${filterBy}&limit=${limit}&page=${page}`,
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
    getHostHouse: builder.query({
      query: () => ({
        url: '/host/house',
        method: 'GET',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      providesTags: ['Houses'],
    }),
    addHouse: builder.mutation({
      query: ({
        name,
        price,
        description,
        cityID,
        maxGuest,
        photo,
      }) => ({
        url: '/host/house',
        method: 'POST',
        body: {
          name,
          price: parseInt(price, 10),
          description,
          city_id: parseInt(cityID, 10),
          max_guest: parseInt(maxGuest, 10),
          photo,
        },
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      invalidatesTags: ['Houses'],
    }),
    updateHouseByID: builder.mutation({
      query: ({
        houseID,
        name,
        price,
        description,
        cityID,
        maxGuest,
        houseStatusID,
      }) => ({
        url: `/host/house/${houseID}`,
        method: 'PATCH',
        body: {
          name,
          price: parseInt(price, 10),
          description,
          city_id: parseInt(cityID, 10),
          max_guest: parseInt(maxGuest, 10),
          house_status_id: parseInt(houseStatusID, 10),
        },
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      invalidatesTags: ['Houses'],
    }),
    deleteHousePhotoByID: builder.mutation({
      query: (housePhotoID) => ({
        url: `/host/house/photo/${housePhotoID}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token ? JSON.parse(localStorage.getItem('user'))?.token : ''}`,
        },
      }),
      invalidatesTags: ['Houses'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetHouseQuery,
  useGetCityQuery,
  useGetHouseByIDQuery,
  useGetUnscopedHouseByIDQuery,
  useGetHouseReservationsByHouseIDQuery,
  useGetUserProfileQuery,
  useGetUserByIDQuery,
  useUpdateUserProfileMutation,
  useUpdateUserRoleToHostMutation,
  useAddReservationMutation,
  useLazyGetReservationByUserQuery,
  useLazyGetReservationByHostQuery,
  useGetReservationByIDQuery,
  usePickupMutation,
  useGetPickupByReservationQuery,
  useTopUpMutation,
  useGetHostHouseQuery,
  useAddHouseMutation,
  useUpdateHouseByIDMutation,
  useDeleteHousePhotoByIDMutation,
} = apiSlice;
