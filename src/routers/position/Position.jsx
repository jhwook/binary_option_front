import { Route, Routes } from "react-router";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import LeftBar from "../../components/common/LeftNav";
import { D_posNavList } from "../../data/D_position";
import MyPosition from "./MyPosition";
import TradingHistory from "./TradingHistory";
import { useSelector } from "react-redux";

export default function Position() {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MpositionBox>
        <Routes>
          <Route path="/my" element={<MyPosition />} />
          <Route path="/history" element={<TradingHistory />} />
        </Routes>
      </MpositionBox>
    );
  else
    return (
      <PpositionBox>
        <DefaultHeader border />

        <LeftBar list={D_posNavList} baseUrl={"position"} />

        <Routes>
          <Route path="/my" element={<MyPosition />} />
          <Route path="/history" element={<TradingHistory />} />
        </Routes>
      </PpositionBox>
    );
}

const MpositionBox = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 56px 0 0;
  color: #fff;
  background: #0a0e17;
  overflow: hidden;
`;

const PpositionBox = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 60px 0 0 0;
  color: #fff;
  background: #0a0e17;
  overflow: hidden;
`;
