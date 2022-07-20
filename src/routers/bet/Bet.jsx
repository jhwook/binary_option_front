import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router";
import { setDividObj } from "../../reducers/bet";
import { socketIo, connectSocketIo } from "../../util/socket";
import Demo from "./Demo";
import Live from "./Live";

export default function Bet() {
  const dispatch = useDispatch();

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
