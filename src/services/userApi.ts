
import { mavericksApi } from '.';

export const productsApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getUserById: builder.query({
      query: id => ({
        url: `users/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserByIdQuery } = productsApi;
