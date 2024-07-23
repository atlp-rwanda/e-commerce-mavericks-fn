// services/feedbackApi.ts
import { mavericksApi } from '.';

export const feedbackApi = mavericksApi.injectEndpoints({
  endpoints: builder => ({
    submitFeedback: builder.mutation({
      query: ({ productId, feedbackData }: { productId: string; feedbackData: { message: string; image: File | null; rating: number } }) => {
        const formData = new FormData();
        formData.append('feedback', feedbackData.message);
        formData.append('rating', feedbackData.rating.toString());
        formData.append('productId', productId);
        if (feedbackData.image) formData.append('feedbackImage', feedbackData.image); // Match field name with multerUpload

        return {
          url: `products/${productId}/review`,
          method: 'POST',
          headers: {
            Accept: 'multipart/form-data',
            authorization: localStorage.getItem('token') || '',
          },
          body: formData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitFeedbackMutation } = feedbackApi;
