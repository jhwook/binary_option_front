import { Route, Routes } from "react-router";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import LeftNav from "../../components/common/LeftNav";
import { D_financeNavList } from "../../data/D_setting";
import Data from "./Data";
import { useSelector } from "react-redux";
import Orders from "./Orders";
import CashBack from "./CashBack";

export default function Finance() {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MfinanceBox>
        <Routes>
          <Route path="/data" element={<Data />} />
          <Route path="/data/cashback" element={<CashBack />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </MfinanceBox>
    );
  else
    return (
      <PfinanceBox>
        <DefaultHeader border />

        <LeftNav list={D_financeNavList} baseUrl={"finance"} />

        <Routes>
          <Route path="/data" element={<Data />} />
          <Route path="/data/cashback" element={<CashBack />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </PfinanceBox>
    );
}

const MfinanceBox = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 56px 0 0;
  color: #fff;
  background: #0a0e17;
  overflow: hidden;
`;

const PfinanceBox = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 60px 0 0 0;
  color: #fff;
  background: #0a0e17;
`;
