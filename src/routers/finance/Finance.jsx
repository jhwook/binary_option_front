import { Route, Routes } from "react-router";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import LeftNav from "../../components/common/LeftNav";
import { D_financeNavList } from "../../data/D_setting";
import Data from "./Data";

export default function Finance() {
  return (
    <FinanceBox>
      <DefaultHeader border/>

      <LeftNav list={D_financeNavList} baseUrl={"finance"} />

      <Routes>
        <Route path="/data" element={<Data />} />
      </Routes>
    </FinanceBox>
  );
}

const FinanceBox = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 60px 0 0 0;
  color: #fff;
  background: #0a0e17;
`;
