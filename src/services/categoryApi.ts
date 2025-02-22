import { mavericksApi } from '.';

export const categoryApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    createCategory: builder.mutation({
      query: categoryData => ({
        url: 'category',
        method: 'POST',
        headers: {
          Accept: 'multipart/form-data',
          authorization: localStorage.getItem('token') || '',
        },
        body: categoryData,
      }),
    }),
    getCategory: builder.query({
      query: () => ({
        url: 'category',
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: 'orders',
        method: 'GET',
        headers: {
          Accept: 'application/json',
          authorization: localStorage.getItem('token') || '',
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateCategoryMutation, useGetCategoryQuery, useGetOrdersQuery } = categoryApi;
