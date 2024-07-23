import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveMenuState {
  activeMenu: string;
  id?: string; 
  status?: string
}

const initialState: ActiveMenuState = {
  activeMenu: "account",
};

const activeMenuSlice = createSlice({
  name: "activeMenu",
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<{ activeMenu: string; id?: string }>) => {
      state.activeMenu = action.payload.activeMenu;
      if (action.payload.id) {
        state.id = action.payload.id;
      } else {
        delete state.id;
      }
    },
  },
});

export const { setActiveMenu } = activeMenuSlice.actions;

export default activeMenuSlice.reducer;
