import { mavericksApi } from ".";


export const orderApi = mavericksApi.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => '/orders'
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

export const { useGetOrdersQuery, useCreateOrderMutation } = orderApi