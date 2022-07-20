import { io } from "socket.io-client";
import { URL } from "../configs/api";

const token = localStorage.getItem("token");
export const noAuthSocket = io(`${URL}/noauth`);
export const authSocket = io(URL, {
  query: {
    token,
  },
});

export const initConnectNoAuthSocket = () => {
  noAuthSocket.on("connect", (res) => {
    console.log("connect");
  });

  noAuthSocket.on("connect_error", (res) => {
    console.error("noauth", res);
  });
};

export const initConnectAuthSocket = (authSocket) => {
  console.log(authSocket);
  authSocket.on("connect", (res) => {
    console.log("connect");
  });

  authSocket.on("connect_error", (res) => {
    console.error("auth", res);
  });
};
