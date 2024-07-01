import { mavericksApi } from ".";

export const paymentApi = mavericksApi.injectEndpoints({
    endpoints: builder => ({
        payment: builder.mutation({
            query: ({ orderId, items }) => ({
                url: `/payments/${orderId}/charge`,
                method: 'POST',
                body: { "items": items }
            })
        }),
    })
})

export const { usePaymentMutation } = paymentApi