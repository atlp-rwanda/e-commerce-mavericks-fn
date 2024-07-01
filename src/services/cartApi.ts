import { createSelector } from '@reduxjs/toolkit';
import { mavericksApi } from '.';
import { DeleteCartQueryParams, ICart, ICartsResponse } from '../utils/schemas';



export const cartApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getCarts: builder.query<ICartsResponse, void>({
      query: () => '/cart',
      providesTags: ["Carts"]
    }),
    updateCart: builder.mutation<void, { id: string; updatedCart: Partial<ICart> }>({
      query: ({ id, updatedCart }) => ({
        url: `/cart/${id}`,
        method: 'PATCH',
        body: updatedCart
      }),
      async onQueryStarted({ id, updatedCart }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCarts', undefined, (draft: ICartsResponse) => {
            const cart = draft.cartProducts.find(cart => cart.id === id)
            if (cart) {
              const size = cart.sizes[0]
              if (size) {
                cart.quantity = updatedCart.quantity || 1;
                cart.sizes[0].price = size?.price
              }

            }
          })
        );
        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      }
    }),
    deleteCart: builder.mutation<void, DeleteCartQueryParams>({
      query: ({ productId, sizeId }) => ({
        url: "cart/delete",
        method: 'DELETE',
        body: { productId, sizeId }
      }),
      invalidatesTags: ["Carts"],
    }),
    addProductToCart: builder.mutation({
      query: (cart: ICart) => ({
        url: 'cart',
        method: 'POST',
        body: cart,
      }),
      invalidatesTags: ["Carts"]
    }),
    clearCarts: builder.mutation({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      invalidatesTags: ["Carts"]
    })
  }),
  overrideExisting: false,
});

export const { useGetCartsQuery, useDeleteCartMutation, useUpdateCartMutation, useAddProductToCartMutation, useClearCartsMutation } = cartApi;

export const selectCartResult = cartApi.endpoints.getCarts.select()

export const selectAllCarts = createSelector(
  selectCartResult,
  (cartResult) => cartResult.data?.cartProducts ?? []
)
