import { combineReducers, configureStore ,getDefaultMiddleware} from "@reduxjs/toolkit";
import common from "./common";
import bet from "./bet";

const reducer = combineReducers({ common, bet });

export default function createStore() {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
}
