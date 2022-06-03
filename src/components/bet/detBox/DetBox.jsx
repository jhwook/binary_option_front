import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { D_detCategoryList } from "../../../data/D_bet";
import Closed from "./Closed";
import Opened from "./Opened";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function DetBox({ off, mode }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [detCategory, setDetCategory] = useState(D_detCategoryList[0]);

  if (isMobile)
    return (
      <MdetBoxCont>
        <ul className="detCategoryList">
          {D_detCategoryList.map((v, i) => (
            <li
              key={i}
              className={`${detCategory === v && "on"}`}
              onClick={() => setDetCategory(v)}
            >
              {v}
            </li>
          ))}
        </ul>

        {detCategory === "Opened" && <Opened />}
        {detCategory === "Closed" && <Closed />}

        <footer>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>

          <strong className="explain">Trading history</strong>
        </footer>
      </MdetBoxCont>
    );
  else
    return (
      <PdetBoxCont className={`${mode && "on"}`}>
        <ul className="detCategoryList">
          {D_detCategoryList.map((v, i) => (
            <li
              key={i}
              className={`${detCategory === v && "on"}`}
              onClick={() => setDetCategory(v)}
            >
              {v}
            </li>
          ))}
        </ul>

        {detCategory === "Opened" && <Opened />}
        {detCategory === "Closed" && <Closed />}
      </PdetBoxCont>
    );
}

const MdetBoxCont = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  background: #0a0e17;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 6;

  .detCategoryList {
    display: flex;

    li {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 15.55vw;
      font-size: 5vw;
      color: rgba(255, 255, 255, 0.2);
      cursor: pointer;

      &.on {
        color: #fff;
        background: #111722;
      }
    }
  }

  .detContList {
    flex: 1;
    padding: 3.88vw 5.55vw;
    background: #111722;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  footer {
    display: flex;
    align-items: center;
    height: 15.55vw;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .exitBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 17.22vw;
      height: 100%;

      img {
        width: 4.44vw;
      }
    }

    .explain {
      padding: 0 5.55vw;
      margin: 3.33vw 0;
      font-size: 4.44vw;
      color: rgba(255, 255, 255, 0.6);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;

const PdetBoxCont = styled.div`
  display: flex;
  flex-direction: column;
  width: 0;
  height: 100%;
  margin: 0 0 0 10px;
  color: #fff;
  transition: all 0.3s;
  overflow: hidden;

  &.on {
    width: 300px;
  }

  .detCategoryList {
    display: flex;

    li {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.2);
      border-radius: 12px 12px 0px 0px;
      cursor: pointer;

      &.on {
        color: #fff;
        background: #111722;
      }
    }
  }

  .detContList {
    flex: 1;
    padding: 14px 20px;
    background: #111722;
  }
`;
