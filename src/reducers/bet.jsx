import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betFlag: false,
  closedFlag: false,
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

    setClosedFlag: (state, action) => {
      state.closedFlag = !state.closedFlag;
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
  setClosedFlag,
  setTokenPopupData,
  setOpenedData,
  setDividObj,
} = bet.actions;

export default bet.reducer;
