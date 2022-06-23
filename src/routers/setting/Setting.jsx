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
import axios from "axios";
import { API } from "../../configs/api";
import { useState, useEffect } from "react";

export default function Setting() {
  const isMobile = useSelector((state) => state.common.isMobile);
  const [userData, setUserData] = useState({})
  
  useEffect(()=>{
    axios
      .get(`${API.AUTH}`, {
        headers: {
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then(async ({ data }) => {
        console.log(data);

        setUserData(data.result);
      });
  }, [])

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
          <Route path="/prof" element={<MyProfile userData={userData}/>} />
          <Route path="/referral" element={<Referral userData={userData}/>} />
          <Route path="/noti" element={<Notifications userData={userData}/>} />
          <Route path="/security" element={<Security userData={userData}/>} />
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
