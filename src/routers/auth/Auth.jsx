import { Route, Routes } from "react-router";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import Index from "./Index";
import Login from "./Login";
import Signup from "./SignUp";

export default function Auth() {
  return (
    <>
      <DefaultHeader white />

      <CopyRight>© 2022 Betbit.com. All rights reserved</CopyRight>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

const CopyRight = styled.p`
  font-size: 12px;
  bottom: 30px;
  left: 50%;
  position: fixed;
  transform: translate(-50%);
`;
