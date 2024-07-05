import { mavericksApi } from '.';

export const productsApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query({
      query: id => ({
        url: `users/user/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserByIdQuery } = productsApi;
