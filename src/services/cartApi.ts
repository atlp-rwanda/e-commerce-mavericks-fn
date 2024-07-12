import { mavericksApi } from '.';
import { ICart } from '../utils/schemas';

export const cartApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    addProductToCart: builder.mutation({
      query: (cart: ICart) => ({
        url: 'cart',
        method: 'POST',
        body: cart,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAddProductToCartMutation } = cartApi;
