import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItem } from '../../types/Types'

interface OrderItemsState {
  orderItems: OrderItem[];
  isOrderItemsFetching: boolean;
  orderItemsError: string | null;
}

const initialState: OrderItemsState = {
  orderItems: [],
  isOrderItemsFetching: false,
  orderItemsError: null,
};

const orderItemsSlice = createSlice({
  name: 'orderItems',
  initialState,
  reducers: {
    setOrderItems: (state, action: PayloadAction<OrderItem[]>) => {
      state.orderItems = action.payload;
    },
    setIsOrderItemsFetching: (state, action: PayloadAction<boolean>) => {
      state.isOrderItemsFetching = action.payload;
    },
    setOrderItemsError: (state, action: PayloadAction<string | null>) => {
      state.orderItemsError = action.payload;
    },
    clearOrderItems: (state) => {
      state.orderItems = [];
      state.isOrderItemsFetching = false;
      state.orderItemsError = null;
    },
  },
});

export const {setOrderItems, setIsOrderItemsFetching, setOrderItemsError, clearOrderItems} = orderItemsSlice.actions;

export default orderItemsSlice.reducer;
