import { combineReducers, configureStore } from "@reduxjs/toolkit";
import common from "./common";
import candleChart from "./candleChart"

const reducer = combineReducers({ common, candleChart });

export default function createStore() {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
  });
}
