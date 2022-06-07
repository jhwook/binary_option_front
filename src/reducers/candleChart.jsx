import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    candle: {open: null,
        high: null,
        low: null,
        close: null,
        time: {
            year: new Date().getUTCFullYear(),
            month: new Date().getUTCMonth() + 1,
            day: new Date().getUTCDate() 
        },
        
},
ticker: 0,
day: 1
};

export const candleChart = createSlice({
  name: "candleChart",
  initialState,
  reducers: {
    resetChart(state, action){
        state.candle = {...initialState.candle, ...action.payload};
    },
    setChart(state, action){
        let time= {
            year: new Date().getUTCFullYear(),
            month: new Date().getUTCMonth() + 1,
            day: new Date().getUTCDate() + Math.floor(state.ticker/5)
        }
        if(!state.candle.open){
            state.candle = {...state.candle, time, open: action.payload, close: action.payload, high: action.payload, low: action.payload}
        }else{
            if(state.ticker%5 ==0){
                state.candle = {...state.candle, time, open: state.candle.close, close: action.payload, high: action.payload, low: action.payload}
            }else{
                state.candle = {...state.candle, time, close: action.payload, high: Math.max(state.candle.high, action.payload), low: Math.min(state.candle.low, action.payload)}
            }
        }
        
        //console.log(state.candle)
    },
    addTicker(state, action){
        state.ticker = state.ticker+1
        //console.log(state.ticker)
    },
    resetTicker(state, action){
        state.ticker = 0;
    }
  },
});

export const { resetChart, setChart, addTicker, resetTicker } = candleChart.actions;

export default candleChart.reducer;
