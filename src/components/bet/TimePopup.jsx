import styled from "styled-components";
import I_plusWhite from "../../img/icon/I_plusWhite.svg";
import I_minusWhite from "../../img/icon/I_minusWhite.svg";
import { useState } from "react";
import { D_timeBtnList } from "../../data/D_bet";
import { useSelector } from "react-redux";

export default function TimePopup({ off }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [time, setTime] = useState(0);

  function onClickSetBtn(v) {
    if (time + v < 0) return;
    else setTime(time + v);
  }
  if (isMobile)
    return (
      <MtimePopupBox>
        <ul className="btnList">
          {D_timeBtnList.map((v, i) => (
            <li
              key={i}
              className={`${time === v.value && "on"}`}
              onClick={() => setTime(v.value)}
            >
              {v.key}
            </li>
          ))}
        </ul>
      </MtimePopupBox>
    );
  else
    return (
      <PtimePopupBox>
        <ul className="timeList">
          <li>
            <button
              className="plusBtn setBtn"
              onClick={() => onClickSetBtn(3600)}
            >
              <img src={I_plusWhite} alt="" />
            </button>

            <p>{`${Math.floor(time / 3600)}`.padStart(2, "0")}</p>

            <button
              className="plusBtn setBtn"
              onClick={() => onClickSetBtn(-3600)}
            >
              <img src={I_minusWhite} alt="" />
            </button>
          </li>
          <span className="dot">:</span>

          <li>
            <button
              className="plusBtn setBtn"
              onClick={() => onClickSetBtn(60)}
            >
              <img src={I_plusWhite} alt="" />
            </button>

            <p>{`${Math.floor((time % 3600) / 60)}`.padStart(2, "0")}</p>

            <button
              className="plusBtn setBtn"
              onClick={() => onClickSetBtn(-60)}
            >
              <img src={I_minusWhite} alt="" />
            </button>
          </li>
        </ul>

        <ul className="btnList">
          {D_timeBtnList.map((v, i) => (
            <li
              key={i}
              className={`${time === v.value && "on"}`}
              onClick={() => setTime(v.value)}
            >
              {v.key}
            </li>
          ))}
        </ul>
      </PtimePopupBox>
    );
}

const MtimePopupBox = styled.section`
  width: 46vw;
  padding: 3.33vw;
  background: rgba(255, 255, 255, 0.1);
  border: 1.4px solid rgba(255, 255, 255, 0.14);
  border-radius: 2.22vw;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.4),
    0px 10px 40px rgba(0, 0, 0, 0.2);
  left: 0;
  bottom: 13.33vw;
  position: absolute;
  z-index: 6;

  .btnList {
    display: flex;
    flex-wrap: wrap;
    gap: 2.22vw;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 11.11vw;
      height: 8.33vw;
      font-size: 3.88vw;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid transparent;
      border-radius: 1.11vw;

      &.on {
        color: #f7ab1f;
        background: rgba(247, 171, 31, 0.1);
        border-color: #f7ab1f;
        box-shadow: 0px 0px 10px rgba(247, 171, 31, 0.6);
      }
    }
  }
`;

const PtimePopupBox = styled.section`
  width: 202px;
  padding: 20px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1.4px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.4),
    0px 10px 40px rgba(0, 0, 0, 0.2);
  top: 0;
  right: 170px;
  position: absolute;
  z-index: 6;

  .timeList {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    font-size: 24px;
    padding: 0 0 18px 0;

    .dot {
    }

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      width: 30px;

      .setBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: inherit;
        height: 24px;
        border-radius: 4px;

        &:hover {
          background: rgba(255, 255, 255, 0.1);

          img {
            opacity: 1;
          }
        }

        img {
          width: 12px;
          opacity: 0.4;
        }
      }
    }
  }

  .btnList {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 18px 0 0 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 34px;
      font-size: 16px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid transparent;
      border-radius: 8px;

      &.on {
        color: #f7ab1f;
        background: rgba(247, 171, 31, 0.1);
        border-color: #f7ab1f;
        box-shadow: 0px 0px 10px rgba(247, 171, 31, 0.6);
      }
    }
  }
`;
