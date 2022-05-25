import axios from "axios";
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { API } from "../../configs/api";

export default function EventListener() {
  const location = useLocation();

  useLayoutEffect(() => {
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
          //   // if (data.status == "OK")
          //   //   localStorage.setItem("address", data.username.toLowerCase());
          //   // else localStorage.clear();
        });
    }
    //dispatch(setLogin(token));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <></>;
}