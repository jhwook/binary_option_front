import { Route, Routes } from "react-router";
import Demo from "./Demo";
import Live from "./Live";

export default function Bet() {
  return (
    <Routes>
      <Route path="/" element={<Live />} />
      <Route path="/demo" element={<Demo />} />
    </Routes>
  );
}
