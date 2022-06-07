import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import createStore from "./reducers/store";
import App from "./App";
//import store from "./sotre/config"
import "./i18n";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
