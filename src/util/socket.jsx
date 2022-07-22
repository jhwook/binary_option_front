import { io } from "socket.io-client";
import { URL } from "../configs/api";

const token = localStorage.getItem("token");
export const socketIo = io(URL, {
  query: {
    token,
  },
});

export const connectSocketIo = () => {
  socketIo.on("connect", (res) => {
    console.log("connect");
  });

  socketIo.on("connect_error", (res) => {
    console.error("auth", res);
  });
};
