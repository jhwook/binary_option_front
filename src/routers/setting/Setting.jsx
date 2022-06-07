import { Route, Routes } from "react-router";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import LeftNav from "../../components/common/LeftNav";
import MyProfile from "./MyProfile";
import { D_settingNavList } from "../../data/D_setting";
import Referral from "./Referral";
import Notifications from "./Notifications";
import Security from "./Security";
import { useSelector } from "react-redux";

export default function Setting() {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MmarketBox>
        <Routes>
          <Route path="/prof" element={<MyProfile />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/noti" element={<Notifications />} />
          <Route path="/security" element={<Security />} />
        </Routes>
      </MmarketBox>
    );
  else
    return (
      <PmarketBox>
        <DefaultHeader />

        <LeftNav list={D_settingNavList} baseUrl={"setting"} />

        <Routes>
          <Route path="/prof" element={<MyProfile />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/noti" element={<Notifications />} />
          <Route path="/security" element={<Security />} />
        </Routes>
      </PmarketBox>
    );
}

const MmarketBox = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 15.55vw 0 0 0;
  color: #fff;
  background: #0a0e17;
  overflow: hidden;
`;

const PmarketBox = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 60px 0 0 0;
  color: #fff;
  background: #0a0e17;
  overflow: hidden;
`;
