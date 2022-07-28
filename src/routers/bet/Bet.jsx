import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router";
import { API } from "../../configs/api";
import { setDividObj } from "../../reducers/bet";
import { socketIo, connectSocketIo } from "../../util/socket";
import Demo from "./Demo";
import Live from "./Live";

export default function Bet() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const demoToken = localStorage.getItem("demoToken");

  function getBetSocket() {
    connectSocketIo();

    socketIo.on("dividendrate", (res) => {
      console.log("dividendrate", res);
      dispatch(setDividObj(res));
    });

    socketIo.on("bet", (res) => {
      console.log("bet", res);
    });
  }

  function getDemoToken() {
    if (token || demoToken) return;

    axios
      .get(`${API.USER_DEMO_TOKEN}`)
      .then(({ data }) => {
        console.log(data.token);

        localStorage.setItem("demoToken", data.token);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  }

  useLayoutEffect(() => {
    getDemoToken();

    return () => {
      localStorage.removeItem("demoToken");
    };
  }, []);

  useEffect(() => {
    getBetSocket();
  }, [socketIo]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="live" />} />
      <Route path="/live" element={<Live />} />
      <Route path="/demo" element={<Demo />} />
    </Routes>
  );
}
