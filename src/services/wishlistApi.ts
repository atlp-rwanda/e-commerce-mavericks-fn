import { mavericksApi } from '.';

export const wishlistApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    // GET USERS' WISHLIST
    getUserWishlist: builder.query({
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
