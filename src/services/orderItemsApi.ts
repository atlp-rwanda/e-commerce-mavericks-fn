import { mavericksApi } from '.';
import { Order } from '../types/Types';

export const orderApi = mavericksApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderItems: builder.query<Order, string>({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {  useGetOrderItemsQuery } = orderApi;
