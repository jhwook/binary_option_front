import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router";
import { io } from "socket.io-client";
import { URL } from "../../configs/api";
import { setDividObj } from "../../reducers/bet";
import Demo from "./Demo";
import Live from "./Live";

export default function Bet() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [socket, setSocket] = useState();

  function getBetSocket() {
    const socketIo = io(URL, {
      query: {
        token,
      },
    });

    setSocket(socketIo);

    socketIo.on("connect", (res) => {
      console.log("connect");
      console.log(res);
    });

    socketIo.on("dividendrate", (res) => {
      console.log("dividendrate", res);
      dispatch(setDividObj(res));
    });

    socketIo.on("bet", (res) => {
      console.log("bet");
      console.log(res);
    });
  }

  useEffect(() => {
    getBetSocket();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="live" />} />
      <Route path="/live" element={<Live socket={socket} />} />
      <Route path="/demo" element={<Demo socket={socket} />} />
    </Routes>
  );
}
