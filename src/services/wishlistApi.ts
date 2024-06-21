import { mavericksApi } from '.';
import { ApiResponse } from '../utils/schemas';

export const wishlistApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    // GET USERS' WISHLIST
    getUserWishlist: builder.query<ApiResponse, void>({
      query: () => '/wishlist/get-wishlist',
    }),

    // ADD PRODUCT TO WISHLIST
    addProductToWishlist: builder.mutation({
      query: (sizeId: string) => ({
        url: `wishlist/add-wishlist/${sizeId}`,
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddProductToWishlistMutation, useGetUserWishlistQuery } = wishlistApi;
