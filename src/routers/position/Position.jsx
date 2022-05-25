import { Route, Routes } from "react-router";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import LeftBar from "../../components/common/LeftNav";

import { D_posNavList } from "../../data/D_position";
import MyPosition from "./MyPosition";
import TradingHistory from "./TradingHistory";

export default function Position() {
  return (
    <PositionBox>
      <DefaultHeader />

      <LeftBar list={D_posNavList} baseUrl={"position"} />

      <Routes>
        <Route path="/my" element={<MyPosition />} />
        <Route path="/history" element={<TradingHistory />} />
      </Routes>
    </PositionBox>
  );
}

const PositionBox = styled.main`
  height: 100vh;
  padding: 60px 0 0 348px;
  color: #fff;
  background: #0a0e17;
`;
