import type { Category, Product, ProductResponse } from '../types/Types';
import { mavericksApi } from '.';
import { IProductResponse } from '../pages/seller/Products';

const sellerId = localStorage.getItem('user');

export const productsApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    // get all the products
    getProducts: builder.query<Product, void>({
      query: () => 'products',
      providesTags: ["GetPro"]
    }),
    getProductById: builder.query<ProductResponse, string>({
      query: id => `products/${id}`,
    }),
    createProduct: builder.mutation({
      query: product => ({
        url: 'products/create-product',
        method: 'POST',
        formData: true,
        body: product,
      }),
    }),
    getProductsBySeller: builder.query<IProductResponse, void>({
      query: () => ({
        url: `products/seller-products/${sellerId}`,
      }),
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => 'category',
    }),

    // Get product reviews
    getProductReviews: builder.query({
      query: productId => `products/${productId}/reviews`,
    }),
    // update product
    updateProduct: builder.mutation<any, any>({
      query: ({ productId, updatedData }) => ({
        url: `products/${productId}/update-product`,
        method: 'PUT',
        body: updatedData,
        headers: {
          Accept: 'application/json',
        },
      }),
    }),
    // delete product
    deleteProduct: builder.mutation({
      query: productId => ({
        url: `products/${productId}`,
        method: 'DELETE',
      }),
    }),
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
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
