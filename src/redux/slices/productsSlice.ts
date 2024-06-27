import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Types';

interface ProductsStateProps {
  error:  any;
  isLoading: boolean;
  productsFetched: boolean;
  productsDataList: Product[];
}
const initialState: ProductsStateProps = {
  isLoading: true,
  error: null,
  productsFetched: false,
  productsDataList: [],
};
const productSlice = createSlice({
  name: 'producs',
  initialState,
  reducers: {
    setProductFetched: (state, action: PayloadAction<any>) => {
      state.productsFetched = action.payload;
    },
    setProductsDataList: (state, action: PayloadAction<any>) => {
      state.productsDataList = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<any>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});
export const { setProductFetched, setProductsDataList, setIsLoading,setError } = productSlice.actions;

export default productSlice.reducer;
