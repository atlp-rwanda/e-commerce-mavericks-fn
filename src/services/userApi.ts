import { mavericksApi } from '.';

export const userApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query({
      query: id => ({
        url: `users/user/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserByIdQuery } = userApi;
