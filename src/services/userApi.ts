import { mavericksApi } from '.';

export const userApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query({
      query: id => ({
        url: `users/user/${id}`,
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserByIdQuery } = userApi;
