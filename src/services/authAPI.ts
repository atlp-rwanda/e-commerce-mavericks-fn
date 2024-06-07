import { mavericksApi } from '.';

const authAPI = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: userData => ({
        url: `users/signup`,
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: credentials => ({
        url: `auth/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    googleAuthentication: builder.query({
      query: () => ({
        url: '/auth/google/callback',
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGoogleAuthenticationQuery } = authAPI;
