import { mavericksApi } from ".";
import { Order } from "../types/Types";


export const orderApi = mavericksApi.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query<Order[], void>({
            query: () => ({
              url: 'orders',
              method: 'GET',
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
              },
            }),
          }),
          cancelOrder: builder.mutation<Order, string>({
            query: (orderId) => ({
              url: `orders/${orderId}/cancel`,
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
              },
            }),
          }),
          createOrder: builder.mutation({
            query: (data) => ({
                url: '/orders',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useGetOrdersQuery, useCreateOrderMutation, useCancelOrderMutation } = orderApi