import type { Category, Product } from '../types/Types';
import { mavericksApi } from '.';
import { IProductData } from '../utils/schemas';

export const productsApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    // get all the products
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => 'category',
    }),

    // GET product by Id
    getProductById: builder.query<IProductData, string>({
      query: id => `products/${id}`,
    }),

    // Get product reviews
    getProductReviews: builder.query({
      query: productId => `products/${productId}/reviews`,
    }),

    // Get product rating statistics
    // getProductRatings: builder.query({
    //   query: productId => `products/${productId}/reviews`,
    // }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetAllCategoriesQuery, useGetProductByIdQuery, useGetProductReviewsQuery } = productsApi;
