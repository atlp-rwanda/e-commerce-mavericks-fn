import { mavericksApi } from ".";
import { Cart } from "../types/Types";

const cartsApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getCarts: builder.query<Cart[], void>({
      query: () => '/cart',
      providesTags: ["Carts"]
    }),
    updateCart: builder.mutation({
      query: ({ id, updatedCart }) => ({
        url: `/cart/${id}`,
        method: 'PATCH',
        body: updatedCart
      }),
      invalidatesTags: ["Carts"],
      // async onQueryStarted({ id, updatedCart }, { dispatch, queryFulfilled }) {
      //     const patchResult = dispatch(
      //         mavericksApi.util.updateQueryData('getCarts', undefined, draft => {
      //             console.log(draft)
      //             const cart = draft.find(cart => cart.id === id)
      //             if (cart) {
      //                 const size = cart.sizes.find(size => size.id === updatedCart.sizeId)
      //                 if (size) {
      //                     cart.quantity = updatedCart.quantity;
      //                     size.price = updatedCart.price
      //                 }
      //             }
      //         })
      //     );
      //     try {
      //         await queryFulfilled
      //     } catch (error) {
      //         patchResult.undo()
      //     }
      // }
    }),
    deleteCart: builder.mutation({
      query: (cartId) => ({
        url: `/cart/${cartId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Carts"]
    })
  })
})

export const { useGetCartsQuery, useDeleteCartMutation, useUpdateCartMutation } = cartsApi