import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { API } from "../../configs/api";
import { gCliId } from "../../configs/setting";

export default function EventListener() {
  const location = useLocation();

  function getLoginChk() {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${API.LOGIN_CHECK}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async ({ data }) => {
          console.log(data);
        })
        .catch((err) => localStorage.removeItem("token"));
    }
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
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <></>;
}
