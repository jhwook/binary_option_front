import { Route, Routes } from "react-router";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import LeftNav from "../../components/common/LeftNav";
import Deposit from "./Deposit";
import { D_marketLeftBarList } from "../../data/D_market";

export default function Market() {
  return (
    <MarketBox>
      <DefaultHeader />

      <LeftNav list={D_marketLeftBarList} baseUrl={"market"}/>

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