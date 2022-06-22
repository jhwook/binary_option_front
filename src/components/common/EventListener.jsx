import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { API } from "../../configs/api";
import { gCliId } from "../../configs/setting";
import { useDispatch } from "react-redux";
import { setMobile } from "../../reducers/common";

export default function EventListener() {
  const location = useLocation();
  const dispatch = useDispatch();

  function handleResize() {
    if (window.innerWidth >= 1200) dispatch(setMobile(false));
    else dispatch(setMobile(true));
  }

  function getLoginChk() {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.defaults.headers.common["Authorization"] = `${token}`;

    axios
      .get(`${API.LOGIN_CHECK}`)
      .then(async ({ data }) => {
        console.log(data);

        localStorage.setItem("userid", data.id);
      })
      .catch((err) => localStorage.removeItem("token"));
  }

  function initGApi() {
    function start() {
      window.gapi.client.init({
        clientId: gCliId,
        scope: "email",
        plugin_name: "binary",
      });
    }

    window.gapi.load("client:auth2", start);
  }

  useLayoutEffect(() => {
    getLoginChk();
    initGApi();

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <></>;
}
