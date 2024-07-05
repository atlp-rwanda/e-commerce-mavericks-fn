import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  isCreated: boolean;
}

const initialState: CategoryState = {
  isCreated: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setIsCreated: (state, action: PayloadAction<boolean>) => {
      state.isCreated = action.payload;
    },
  },
});

export const { setIsCreated } = categorySlice.actions;

export default categorySlice.reducer;
