import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'databaseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    // prepareHeaders: (headers, { getState }) => {
    //   const { token } = getState().auth;
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['Houses', 'Cities', 'Users', 'Reservations'],
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
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem('user').token}`,
        // },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
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
        url: `/house/${houseID}`,
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
} = apiSlice;
