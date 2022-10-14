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
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
} = apiSlice;
