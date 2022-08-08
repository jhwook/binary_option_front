import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router";
import { API } from "../../configs/api";
import { setBetFlag, setClosedFlag, setDividObj } from "../../reducers/bet";
import { socketIo, connectSocketIo } from "../../util/socket";
import { setToast } from "../../util/Util";
import Demo from "./Demo";
import Live from "./Live";

export default function Bet() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const demoToken = localStorage.getItem("demoToken");

  const [closedList, setClosedList] = useState([]);

  function getBetSocket() {
    connectSocketIo();

    socketIo.on("dividendrate", (res) => {
      console.log("dividendrate", res);
      dispatch(setDividObj(res));
    });

    socketIo.on("bet", (res) => {
      console.log("bet", res);
    });

    socketIo.on("bet_closed", (res) => {
      console.log("bet_closed", res);
      setToast({
        type: "closed",
        assetInfo: { name: res.name },
        amount: res.data.amount / 10 ** 6,
        profit: res.profit,
      });

      setClosedList([...closedList, res]);
      dispatch(setClosedFlag());
      dispatch(setBetFlag());
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

      socketIo.disconnect("dividendrate");
      socketIo.disconnect("bet");
      socketIo.disconnect("bet_closed");
    };
  }, []);

  useEffect(() => {
    getBetSocket();
  }, [socketIo]);

  useEffect(() => {
    // if (!closedList[0]) return;

    let _closedInterval = setInterval(() => {
      console.log("closd interval", closedList);
    }, 1000);

    return () => {
      clearInterval(_closedInterval);
    };
  }, [closedList]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="live" />} />
      <Route path="/live" element={<Live />} />
      <Route path="/demo" element={<Demo />} />
    </Routes>
  );
}
