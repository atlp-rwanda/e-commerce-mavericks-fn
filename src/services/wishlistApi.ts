import { mavericksApi } from '.';
import { ApiResponse } from '../utils/schemas';

export const wishlistApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    // GET USERS' WISHLIST
    getUserWishlist: builder.query<ApiResponse, void>({
      query: () => '/wishlist/get-wishlist',
    }),

    addProductToWishlist: builder.mutation({
      query: (sizeId: string) => ({
        url: `wishlist/add-wishlist/${sizeId}`,
        method: 'POST',
      }),
    }),

    clearWishlist: builder.mutation<void, void>({
      query: () => ({
        url: '/wishlist/clear',
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddProductToWishlistMutation, useGetUserWishlistQuery, useClearWishlistMutation } = wishlistApi;
