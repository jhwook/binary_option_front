import { Route, Routes } from "react-router";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import LeftBar from "../../components/market/LeftBar";
import Deposit from "./Deposit";

export default function Market() {
  return (
    <MarketBox>
      <DefaultHeader />

      <LeftBar />

      <Routes>
        <Route path="/deposit" element={<Deposit />} />
      </Routes>
    </MarketBox>
  );
}

const MarketBox = styled.main`
  height: 100vh;
  padding: 60px 0 0 348px;
  color: #fff;
  background: #0a0e17;
`;
