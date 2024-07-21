import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Types';

interface ProductsStateProps {
  error: any;
  isLoading: boolean;
  productsFetched: boolean;
  productsDataList: Product[];
  isProductAddedOrUpdatedOrDeleted: boolean;
}
const initialState: ProductsStateProps = {
  isLoading: true,
  error: null,
  productsFetched: false,
  productsDataList: [],
  isProductAddedOrUpdatedOrDeleted: false,
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
    setCrudProductBehaviour: (state, action: PayloadAction<any>) => {
      state.isProductAddedOrUpdatedOrDeleted = action.payload;
    },
  },
});
export const { setProductFetched, setProductsDataList, setIsLoading, setError, setCrudProductBehaviour } =
  productSlice.actions;

export default productSlice.reducer;
