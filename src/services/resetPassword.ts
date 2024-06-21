import { mavericksApi } from '.';

export const resetPasswordAPI = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    resetPassword: builder.mutation({
      query: email => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
    newPassword: builder.mutation({
      query: ({ newPassword, token }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'POST',
        body: { newPassword },
      }),
    }),
  }),
});

export const { useResetPasswordMutation, useNewPasswordMutation } = resetPasswordAPI;
