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
      query: userData => ({
        url: `auth/login`,
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authAPI;
