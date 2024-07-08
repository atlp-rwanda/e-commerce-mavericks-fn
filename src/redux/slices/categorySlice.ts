import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types/Types';


interface CategoryState {
  isCreated: boolean;
  isCategoriesFetched: boolean;
  allCategories: Category[];
}

const initialState: CategoryState = {
  isCreated: false,
  isCategoriesFetched: false,
  allCategories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setIsCreated: (state, action: PayloadAction<boolean>) => {
      state.isCreated = action.payload;
    },
    setIsCategoriesFetched: (state, action: PayloadAction<boolean>) => {
      state.isCategoriesFetched = action.payload;
    },
    setallCategories: (state, action: PayloadAction<Category[]>) => {
      state.allCategories = action.payload;
    },
  },
});

export const { setIsCreated , setIsCategoriesFetched, setallCategories} = categorySlice.actions;

export default categorySlice.reducer;
