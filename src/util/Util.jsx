import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import I_highArwGreen from "../img/icon/I_highArwGreen.svg";
import I_lowArwRed from "../img/icon/I_lowArwRed.svg";
import I_chkOrange from "../img/icon/I_chkOrange.svg";
import T_bronze from "../img/tier/T_bronze.svg";
import T_silver from "../img/tier/T_silver.svg";
import T_gold from "../img/tier/T_gold.svg";
import T_dia from "../img/tier/T_dia.svg";
import axios from "axios";

export function strDot(str, startNum = 0, endNum = 0) {
  if (!str?.length) return;
  return `${str.slice(0, startNum)}...${str.slice(-endNum)}`;
}

export function chkValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

export function getStyle(ref, getStyle) {
  const style = window.getComputedStyle(ref.current);
  let styleGap = style.getPropertyValue(getStyle);
  let numStyleGap = Number(styleGap.replace("px", ""));

  if (isNaN(numStyleGap)) return 0;
  else return numStyleGap;
}

export function isDeviceMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function onClickPreBtn(ref, itemList, index, setIndex) {
  if (!ref.current.children) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);
  const pageNum = Math.ceil(itemList.length / itemNumByPage);

  if (index > 0) setIndex(index - 1);
  else setIndex(pageNum - 1);
}

export function onClickNextBtn(ref, itemList, index, setIndex) {
  if (!ref.current.children) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);
  const pageNum = Math.ceil(itemList.length / itemNumByPage);

  if (index < pageNum - 1) setIndex(index + 1);
  else setIndex(0);
}

export function swiperListener(ref, index) {
  if (!ref || !ref.current || !ref.current.children[0]) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);

  if (ref.current?.scrollTo) {
    if (index === 0) {
      ref.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      ref.current.scrollTo({
        left:
          contWidth * itemNumByPage * index +
          index * getStyle(ref, "gap") * itemNumByPage,
        behavior: "smooth",
      });
    }
  }
}

export function getTotalPage(ref, list) {
  if (!ref || !ref.current || !ref.current.children[0]) return;

  const wrapWidth = ref.current.offsetWidth;
  const contWidth = ref.current.children[0].offsetWidth;
  const itemNumByPage = Math.floor(wrapWidth / contWidth);

  return Math.floor(list.length / itemNumByPage);
}

export function setCookie(name, value, expiredDay) {
  const expired = new Date();
  expired.setTime(expired.getTime() + expiredDay * 24 * 60 * 60 * 1000);
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    ";expires=" +
    expired.toUTCString() +
    ";path=/";
}

export function getCookie(name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? decodeURIComponent(value[2]) : null;
}

export function onClickCopy(str) {
  const textArea = document.createElement("textarea");
  document.body.appendChild(textArea);
  textArea.value = str;
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

export function setToast({ type, cont, amount }) {
  switch (type) {
    case "high":
      toast(
        <div className="customBox">
          <p className="title">Trade order placed</p>

          <ul className="infoList">
            <li>
              <strong>Bitcoin</strong>
              <img src={I_highArwGreen} alt="" />
            </li>

            <li>
              <p className="key">Forecast</p>
              <p className="value">Higher</p>
            </li>

            <li>
              <p className="key">Amount</p>
              <p className="value">{`$${amount}`}</p>
            </li>
          </ul>
        </div>,
        {
          toastId: "CustomToastBet",
        }
      );
      break;
    case "low":
      toast(
        <div className="customBox">
          <p className="title">Trade order placed</p>

          <ul className="infoList">
            <li>
              <strong>Bitcoin</strong>
              <img src={I_lowArwRed} alt="" />
            </li>

            <li>
              <p className="key">Forecast</p>
              <p className="value">Lower</p>
            </li>

            <li>
              <p className="key">Amount</p>
              <p className="value">{`$${amount}`}</p>
            </li>
          </ul>
        </div>,
        {
          toastId: "CustomToastBet",
        }
      );
      break;
    case "closed":
      toast(
        <div className="customBox">
          <p className="title">Trade closed</p>

          <ul className="infoList">
            <li>
              <strong>Bitcoin</strong>
              <img src={I_highArwGreen} alt="" />
            </li>

            <li>
              <p className="key">Payout</p>
              <p className="value">$0.00</p>
            </li>

            <li>
              <p className="key">Profit</p>
              <p className="value">$0</p>
            </li>
          </ul>
        </div>,
        {
          toastId: "CustomToastBet",
        }
      );
      break;
    case "alarm":
      toast(
        <div className="customBox">
          <span className="iconBox">
            <img src={I_chkOrange} alt="" />
          </span>

          <p className="cont">{cont}</p>
        </div>,
        {
          toastId: "CustomToastAlarm",
        }
      );
      break;
    case "alarm_black":
      toast(
        <div className="customBox">
          <span className="iconBox">
            <img src={I_chkOrange} alt="" />
          </span>

          <p className="cont">{cont}</p>
        </div>,
        {
          toastId: "CustomToastAlarmBlack",
        }
      );
      break;
    default:
      break;
  }
}

export function GetTier(v) {
  switch (v) {
    case "bronze":
      return T_bronze;
    case "silver":
      return T_silver;
    case "gold":
      return T_gold;
    case "dia":
      return T_dia;
    default:
      return null;
  }
}

export function AxiosInterCept() {
  const token = localStorage.getItem("token");
  if (!token) return;

  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = token;

    return config;
  });
}