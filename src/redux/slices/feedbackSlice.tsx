// redux/slices/feedbackSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedbackState {
  isSubmitting: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  isSubmitting: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    submitFeedbackStart(state) {
      state.isSubmitting = true;
      state.error = null;
    },
    submitFeedbackSuccess(state) {
      state.isSubmitting = false;
    },
    submitFeedbackFailure(state, action: PayloadAction<string>) {
      state.isSubmitting = false;
      state.error = action.payload;
    },
  },
});

export const { submitFeedbackStart, submitFeedbackSuccess, submitFeedbackFailure } = feedbackSlice.actions;

export default feedbackSlice.reducer;
