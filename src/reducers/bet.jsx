import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betFlag: false,
};

export const bet = createSlice({
  name: "bet",
  initialState,
  reducers: {
    setBetFlag: (state, action) => {
      state.betFlag = !state.betFlag;
    },
  },
});

export const { setBetFlag } = bet.actions;

export default bet.reducer;
