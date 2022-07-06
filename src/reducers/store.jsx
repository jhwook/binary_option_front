import { combineReducers, configureStore } from "@reduxjs/toolkit";
import common from "./common";
import bet from "./bet";

const reducer = combineReducers({ common, bet });

export default function createStore() {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
  });
}
