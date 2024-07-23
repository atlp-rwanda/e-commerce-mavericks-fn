// src/features/wishlist/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem } from '../../types/Types'; // Adjust the path to your type definitions

interface WishlistState {
  isFetched: boolean;
  items: WishlistItem[];
}

const initialState: WishlistState = {
  isFetched: false,
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setIsFetched: (state, action: PayloadAction<boolean>) => {
      state.isFetched = action.payload;
    },
    setWishLists: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
    clearWishLists: (state) => {
      state.items = [];
    },
  },
});

export const { setIsFetched, setWishLists, clearWishLists } = wishlistSlice.actions;

export default wishlistSlice.reducer;
