import type { Category, Product, ProductResponse } from '../types/Types';
import { mavericksApi } from '.';
import { IProductResponse } from '../pages/seller/Products';

const sellerId = localStorage.getItem('user');

export const productsApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    // get all the products
    getProducts: builder.query<Product, void>({
      query: () => 'products',
    }),
    getProductById: builder.query<ProductResponse, string>({
      query: id => `products/${id}`,
    }),
    createProduct: builder.mutation({
      query: product => ({
        url: 'products/create-product',
        method: 'POST',
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
        formData: true,
        body: product,
      }),
    }),
    getProductsBySeller: builder.query<IProductResponse, void>({
      query: () => ({
        url: `products/seller-products/${sellerId}`,
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
      }),
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => 'category',
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

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetProductsBySellerQuery,
  useGetAllCategoriesQuery,
  useGetProductByIdQuery,
  useGetProductReviewsQuery,
} = productsApi;
