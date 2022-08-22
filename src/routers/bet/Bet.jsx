import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router";
import { io } from "socket.io-client";
import { API, CLOSED_SOCKET_URL, URL } from "../../configs/api";
import { setBetFlag, setClosedFlag, setDividObj } from "../../reducers/bet";
import { setToast } from "../../util/Util";
import Demo from "./Demo";
import Live from "./Live";
import { useNavigate } from "react-router-dom";

export default function Bet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const demoToken = localStorage.getItem("demoToken");

  const [notiOpt, setNotiOpt] = useState({
    betEnd: false,
    orderRequest: false,
  });
  const [socketIo, setSocketIo] = useState("");
  const [closedSocketIo, setClosedSocketIo] = useState("");

  function getNotiOpt() {
    axios
      .get(API.NOTI)
      .then(({ data }) => {
        console.log(data.resp);
        let _resp = data.resp;
        let _notiOpt = {};

        _notiOpt.betEnd = _resp.betend;
        _notiOpt.orderRequest = _resp.orderrequest;

        setNotiOpt({ ..._notiOpt });
      })
      .catch(console.error);
  }

  useEffect(() => {
    setSocketIo(
      io(URL, {
        transports: ["websocket"],
        query: {
          token:
            localStorage.getItem("token") || localStorage.getItem("demoToken"),
        },
      })
    );

    setClosedSocketIo(
      io(CLOSED_SOCKET_URL, {
        transports: ["websocket"],
        query: {
          token:
            localStorage.getItem("token") || localStorage.getItem("demoToken"),
        },
      })
    );
  }, []);

  function getBetSocket() {
    socketIo.on("connect", (res) => {
      console.log("socketIo connect", socketIo);
    });

    console.log("closedSocketIo connect", closedSocketIo);

    closedSocketIo.on("connect", (res) => {
      console.log("closedSocketIo connect", closedSocketIo);
    });

    socketIo.on("connect_error", (res) => {
      console.error("auth", res);
    });

    socketIo.on("dividendrate", (res) => {
      console.log("dividendrate", res);
      dispatch(setDividObj(res));
    });

    socketIo.on("bet", (res) => {
      console.log("bet", res);
    });

    closedSocketIo.on("bet_closed", (res) => {
      console.log("bet_closed", res);
      if (notiOpt.betEnd) {
        setToast({
          type: "closed",
          assetInfo: { name: res.name },
          amount: res.data.amount / 10 ** 6,
          profit: res.profit,
        });
      }

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
    getNotiOpt();
  }, []);

  useEffect(() => {
    if (!(socketIo || closedSocketIo)) return;
    getBetSocket();

    return () => {
      localStorage.removeItem("demoToken");
      socketIo.on("disconnect", () => {
        console.log("disconnected");
      });

      socketIo.disconnect("dividendrate");
      socketIo.disconnect("bet");
      socketIo.disconnect("bet_closed");
    };
  }, [socketIo, closedSocketIo]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="live" />} />
      <Route
        path="/live"
        element={<Live socket={socketIo} notiOpt={notiOpt} />}
      />
      <Route
        path="/demo"
        element={<Demo socket={socketIo} notiOpt={notiOpt} />}
      />
    </Routes>
  );
}
