import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { gCliId } from "../../configs/setting";
import { useDispatch } from "react-redux";
import { setMobile } from "../../reducers/common";
import { AxiosInterCept } from "../../util/Util";

export default function EventListener() {
  const location = useLocation();
  const dispatch = useDispatch();

  function handleResize() {
    if (window.innerWidth >= 1200) dispatch(setMobile(false));
    else dispatch(setMobile(true));
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
    initGApi();

    handleResize();

    AxiosInterCept(localStorage.getItem("token"));

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <></>;
}
