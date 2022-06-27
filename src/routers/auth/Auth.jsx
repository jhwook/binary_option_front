import { Route, Routes } from "react-router";
import DefaultHeader from "../../components/header/DefaultHeader";
import CompPw from "./CompPw";
import Index from "./Index";
import Login from "./Login";
import ResetPw from "./ResetPw";
import SetPw from "./SetPw";
import Signup from "./signup/SignUp";
import Referral from "./signup/Referral";

export default function Auth() {
  return (
    <>
      <DefaultHeader white />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/resetpw" element={<ResetPw />} />
        <Route path="/setpw/:code" element={<SetPw />} />
        <Route path="/comppw" element={<CompPw />} />
        <Route path="/signup/referral" element={<Referral />} />
      </Routes>
    </>
  );
}
