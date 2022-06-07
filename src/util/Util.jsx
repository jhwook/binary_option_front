import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import I_highArwGreen from "../img/icon/I_highArwGreen.svg";
import I_chkOrange from "../img/icon/I_chkOrange.svg";

export function strDot(str, startNum = 0, endNum = 0) {
  if (!str?.length) return;
  return `${str.slice(0, startNum)}...${str.slice(-endNum)}`;
}

export function chkValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

export function putCommaAtPrice(data) {
  let str;

  if (data !== undefined) {
    data = Number(data);

    // if (data < 1000)
    //   return data.toFixed(3);

    str = data.toString().split(".");

    str[0] = `${str[0]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }
  return 0;
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

export function GetExchange({ price, unit }) {
  const [exchange, setExchange] = useState("");

  useEffect(() => {
    if (!(unit && price)) return;

    fetch(`https://api.bithumb.com/public/ticker/${unit}`)
      .then((res) => res.text())
      .then((resT) => {
        let resArray = resT.replace(/"/g, "").split(",");

        let lastPrice =
          resArray.filter((e) => e.indexOf("closing") !== -1)[0].split(":")[1] *
          1;

        setExchange(price * lastPrice);
      })
      .catch(() => {
        console.error("exchagne get Err");
      });
  }, []);

  return <>{exchange.toLocaleString("eu", "US")}</>;
}

export function setToast({ type, cont }) {
  switch (type) {
    case "placed":
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
              <p className="value">$1</p>
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
    default:
      break;
  }
}
