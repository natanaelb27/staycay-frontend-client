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
  tagTypes: ['Houses', 'Cities'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({
        name, email, password, address, city,
      }) => ({
        url: '/register',
        method: 'POST',
        body: {
          name, email, password, address, city,
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
      query: (searchHouse) => ({
        url: `/house?searchName=${searchHouse}`,
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
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetHouseQuery,
  useGetCityQuery,
  useGetHouseByIDQuery,
} = apiSlice;
