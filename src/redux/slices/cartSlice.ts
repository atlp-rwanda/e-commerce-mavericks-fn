import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Types'

interface CartState {
  products: Product[];
  isCartFetched: boolean;
}

const initialState: CartState = {
  products: [],
  isCartFetched: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setIsCartFetched: (state, action: PayloadAction<boolean>) => {
      state.isCartFetched = action.payload;
    }
  },
});

export const { setCartProducts, setIsCartFetched } = cartSlice.actions;

export default cartSlice.reducer;
