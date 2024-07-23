import { mavericksApi } from '.';
import { Order, orderResponse } from '../types/Types';

export const ordersApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query<orderResponse, void>({
      query: () => ({
        url: 'orders/get-orders',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
    }),
    getOrderById: builder.query<Order, string>({
      query: id => `orders/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetOrdersQuery, useGetOrderByIdQuery } = ordersApi;