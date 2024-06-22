import type { Category, Product } from '../types/Types';
import { mavericksApi } from '.';

export const productsApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => 'category',
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetAllCategoriesQuery } = productsApi;
