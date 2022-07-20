import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betFlag: false,
  tokenPopupData: [],
  openedData: [],
  dividObj: "",
};

export const bet = createSlice({
  name: "bet",
  initialState,
  reducers: {
    setBetFlag: (state, action) => {
      state.betFlag = !state.betFlag;
    },

    setTokenPopupData: (state, action) => {
      state.tokenPopupData = action.payload;
    },

    setOpenedData: (state, action) => {
      state.openedData = action.payload;
    },

    setDividObj: (state, action) => {
      state.dividObj = action.payload;
    },
  },
});

export const {
  setBetFlag,
  setTokenPopupData,
  setOpenedData,
  setDividObj,
} = bet.actions;

export default bet.reducer;
