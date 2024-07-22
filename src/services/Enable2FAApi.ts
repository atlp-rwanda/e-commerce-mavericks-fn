import { mavericksApi } from '.';

const enable2FAApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    enable2FA: builder.mutation({
      query: token => ({
        url: 'users/enable2fa',
        method: 'PATCH',
        headers: {
          Authorization: token,
        },
      }),
    }),
    verifyOTP: builder.mutation({
      query: ({ token, otp }) => ({
        url: `auth/${token}/otp`,
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: { otp },
      }),
    }),
  }),
});

export const { useEnable2FAMutation, useVerifyOTPMutation } = enable2FAApi;
export default enable2FAApi.reducer;
