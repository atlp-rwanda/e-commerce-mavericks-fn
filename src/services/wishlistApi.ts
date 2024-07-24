import { mavericksApi } from '.';
import { ApiResponse } from '../utils/schemas';

export const wishlistApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    // GET USERS' WISHLIST
    getUserWishlist: builder.query<ApiResponse, void>({
      query: () => '/wishlist/get-wishlist',
      providesTags: ["WishList"]
    }),

    addProductToWishlist: builder.mutation({
      query: (sizeId: string) => ({
        url: `wishlist/add-wishlist/${sizeId}`,
        method: 'POST',
      }),
      invalidatesTags: ["WishList", "GetPro"]
    }),

    clearWishlist: builder.mutation<void, void>({
      query: () => ({
        url: '/wishlist/clear',
        method: 'DELETE',
      }),
    }),
    removeWishList: builder.mutation({
      query: (sizeId: string) => ({
        url: `wishlist/item/${sizeId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["WishList", "GetPro"]
    })
  }),
  overrideExisting: false,
});


export const { useAddProductToWishlistMutation, useGetUserWishlistQuery, useRemoveWishListMutation, useClearWishlistMutation } = wishlistApi;

