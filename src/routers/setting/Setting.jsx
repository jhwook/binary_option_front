import { Route, Routes } from "react-router";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import LeftNav from "../../components/common/LeftNav";
import MyProfile from "./MyProfile";
import { D_settingNavList } from "../../data/D_setting";
import Referral from "./Referral";
import Notifications from "./Notifications";
import Security from "./Security";

export default function Setting() {
  return (
    <MarketBox>
      <DefaultHeader />

      <LeftNav list={D_settingNavList} baseUrl={"setting"} />

      <Routes>
        <Route path="/prof" element={<MyProfile />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/noti" element={<Notifications />} />
        <Route path="/security" element={<Security />} />
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
