import type { Product } from '../types/Types';
import { mavericksApi } from '.';

export const productsApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productsApi;
