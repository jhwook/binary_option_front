import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
  isLogin: "",
  balanceType: "Demo",
};

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setBalanceType: (state, action) => {
      state.balanceType = action.payload;
    },
  },
});

export const { setMobile, setLogin, setBalanceType } = common.actions;

export default common.reducer;
