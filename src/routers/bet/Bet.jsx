import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { io } from "socket.io-client";
import { URL } from "../../configs/api";
import Demo from "./Demo";
import Live from "./Live";

export default function Bet() {
  const token = localStorage.getItem("token");

  // const [socket, setSocket] = useState();

  function getRoomList() {
    const socket = io("http://litriggy.com:30708/noauth");
    // const socket = io("http://litriggy.com:30708/noauth", { query: token });

    socket.on("connect", (res) => {
      console.log("connect");
      console.log(res);
    });

    socket.onAny((event, ...args) => {
      console.log(`got ${event}`);
    });
  }

  useEffect(() => {
    getRoomList();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Live />} />
      <Route path="/demo" element={<Demo />} />
    </Routes>
  );
}
