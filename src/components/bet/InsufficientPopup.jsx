import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { API } from "../../configs/api";
import I_xWhite from "../../img/icon/I_xWhite.svg";

export default function InsufficientPopup({ off, amount, type, nextProc }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [balance, setBalance] = useState();

  function onClickConfirm() {
    off();
    nextProc(true);
  }

  function getBalance() {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${API.USER_BALANCE}`)
      .then(async ({ data }) => {
        console.log(data);
        setBalance({ ...data.respdata });
      })
      .catch((err) => {
        console.error(err);
        localStorage.clear();
      });
  }

  useEffect(() => {
    getBalance();
  }, []);

  if (isMobile)
    return (
      <MinsufficientPopupBox className="defaultPopup">
        <article className="topArea">
          <p className="title">Insufficient Balance</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <ul className="balanceList">
            <li>
              <p className="key">Your balance</p>
              <p className="value">
                ${type === "Live" && Number(balance?.LIVE?.avail).toFixed(2)}
                {type === "Demo" && Number(balance?.DEMO?.avail).toFixed(2)}
              </p>
            </li>
            <li>
              <p className="key">Trace balance</p>
              <p className="value">{`$${Number(amount).toFixed(2)}`}</p>
            </li>
          </ul>

          <button className="addBtn" onClick={onClickConfirm}>
            Add funds
          </button>
        </article>
      </MinsufficientPopupBox>
    );
  else
    return (
      <PinsufficientPopupBox className="defaultPopup">
        <article className="topArea">
          <p className="title">Insufficient Balance</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <ul className="balanceList">
            <li>
              <p className="key">Your balance</p>
              <p className="value">
                ${type === "Live" && Number(balance?.LIVE?.avail).toFixed(2)}
                {type === "Demo" && Number(balance?.DEMO?.avail).toFixed(2)}
              </p>
            </li>
            <li>
              <p className="key">Trace balance</p>
              <p className="value">{`$${Number(amount).toFixed(2)}`}</p>
            </li>
          </ul>

          <button className="addBtn" onClick={onClickConfirm}>
            Add funds
          </button>
        </article>
      </PinsufficientPopupBox>
    );
}

const MinsufficientPopupBox = styled.section`
  width: 328px;
  color: #fff;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 30px;

    .title {
      font-size: 16px;
    }

    .exitBtn {
      img {
        width: 16px;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 24px 30px;

    .balanceList {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0 6px;
      font-size: 14px;

      li {
        display: flex;
        justify-content: space-between;
      }
    }

    .addBtn {
      height: 50px;
      font-size: 18px;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 8px;
    }
  }
`;

const PinsufficientPopupBox = styled.section`
  width: 380px;
  color: #fff;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 30px;

    .title {
      font-size: 18px;
    }

    .exitBtn {
      img {
        width: 16px;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 10px 30px 40px;

    .balanceList {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0 10px;
      font-size: 14px;

      li {
        display: flex;
        justify-content: space-between;
      }
    }

    .addBtn {
      height: 56px;
      font-size: 18px;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 12px;
    }
  }
`;
