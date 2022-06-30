import { useEffect, useState } from "react";
import styled from "styled-components";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import I_chkOrange from "../../img/icon/I_chkOrange.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../configs/api";

export default function MyBalancePopup({ off, setAddPopup }) {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);
  const token = localStorage.getItem("token");
  const balanceType = localStorage.getItem("balanceType");

  const [stateBalanceType, setStateBalanceType] = useState(
    balanceType || "Demo"
  );
  const [balanceData, setBalanceData] = useState("");

  function onClickConfirmBtn(nextProc, isNotNavigate) {
    off();
    if(isNotNavigate)
    nextProc(true);
    else
    navigate("/market/deposit")
  }

  function getBalance() {
    if (token) {

      axios
        .get(`${API.USER_BALANCE}`)
        .then(({ data }) => {
          console.log(data.respdata);
          setBalanceData(data.respdata);
        })
        .catch((err) => console.error(err));
    }
  }

  function onClickBalanceType(type) {
    setStateBalanceType(type);

    localStorage.setItem("balanceType", type);
  }

  useEffect(() => {
    getBalance();
  }, []);

  if (isMobile)
    return (
      <MmyBalancePopup className="defaultPopup">
        <article className="topArea">
          <span className="blank" />

          <p className="title">My balance</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="targetBox">
            <div className="leftBox">
              <p className="type">{`${stateBalanceType} balance`}</p>
              <p className="balance">
                {stateBalanceType === "Live" && balanceData?.LIVE?.avail}
                {stateBalanceType === "Demo" && balanceData?.DEMO?.avail} USD
              </p>
              <p className="type"></p>
            </div>

            {stateBalanceType === "Live" && (
              <button
                className="actionBtn"
                onClick={() => onClickConfirmBtn(navigate("/market/deposit"), false)}
              >
                Deposit
              </button>
            )}

            {stateBalanceType === "Demo" && (
              <button
                className="actionBtn"
                onClick={() => onClickConfirmBtn(setAddPopup, true)}
              >
                Add
              </button>
            )}
          </div>

          <ul className="typeList">
            <li
              className={`${stateBalanceType === "Live" && "on"}`}
              onClick={() => onClickBalanceType("Live")}
            >
              <img src={I_chkOrange} alt="" />
              <p className="key">Live balance</p>

              <strong className="value">{`${balanceData?.LIVE?.avail} USD`}</strong>
            </li>

            <li
              className={`${stateBalanceType === "Demo" && "on"}`}
              onClick={() => onClickBalanceType("Demo")}
            >
              <img src={I_chkOrange} alt="" />
              <p className="key">Demo balance</p>

              <strong className="value">{`${balanceData?.DEMO?.avail} USD`}</strong>
            </li>
          </ul>
        </article>
      </MmyBalancePopup>
    );
  else
    return (
      <PmyBalancePopup className="defaultPopup">
        <article className="topArea">
          <span className="blank" />

          <p className="title">My balance</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="targetBox">
            <div className="leftBox">
              <p className="type">{`${stateBalanceType} balance`}</p>
              <p className="balance">
                {stateBalanceType === "Live" && balanceData?.LIVE?.avail}
                {stateBalanceType === "Demo" && balanceData?.DEMO?.avail} USD
              </p>
              <p className="type"></p>
            </div>

            {stateBalanceType === "Live" && (
              <button
                className="actionBtn"
                onClick={() => onClickConfirmBtn(navigate("/market/deposit"), false)}
              >
                Deposit
              </button>
            )}

            {stateBalanceType === "Demo" && (
              <button
                className="actionBtn"
                onClick={() => onClickConfirmBtn(setAddPopup, true)}
              >
                Add
              </button>
            )}
          </div>

          <ul className="typeList">
            <li
              className={`${stateBalanceType === "Live" && "on"}`}
              onClick={() => onClickBalanceType("Live")}
            >
              <img src={I_chkOrange} alt="" />
              <p className="key">Live balance</p>

              <strong className="value">{`${balanceData?.LIVE?.avail} USD`}</strong>
            </li>

            <li
              className={`${stateBalanceType === "Demo" && "on"}`}
              onClick={() => onClickBalanceType("Demo")}
            >
              <img src={I_chkOrange} alt="" />
              <p className="key">Demo balance</p>

              <strong className="value">{`${balanceData?.DEMO?.avail} USD`}</strong>
            </li>
          </ul>
        </article>
      </PmyBalancePopup>
    );
}

const MmyBalancePopup = styled.section`
  width: 91.11vw;
  max-height: 80vh;
  overflow-y: scroll;
  color: #fff;
  z-index: 7;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 16.66vw;
    padding: 0 8.33vw;

    .title {
      font-size: 4.44vw;
    }

    .blank,
    .exitBtn img {
      width: 4.44vw;
    }
  }

  .contArea {
    padding: 2.77vw 6.66vw 8.33vw;

    .targetBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20vw;

      .leftBox {
        display: flex;
        flex-direction: column;
        gap: 0.55vw;

        .type {
          font-size: 3.33vw;
          height: 4.44vw;
        }

        .balance {
          font-size: 5vw;
        }
      }

      .actionBtn {
        width: 22.77vw;
        height: 8.33vw;
        font-size: 3.88vw;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.1);
        border: 1.4px solid #fff;
        border-radius: 5.55vw;

        &:hover {
          color: #f7ab1f;
          background: rgba(247, 171, 31, 0.1);
          border-color: #f7ab1f;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
        }
      }
    }

    .typeList {
      display: flex;
      flex-direction: column;
      gap: 2.22vw;

      li {
        display: flex;
        align-items: center;
        gap: 3.88vw;
        height: 11.11vw;
        padding: 0 5.55vw;
        font-size: 3.88vw;
        background: rgba(0, 0, 0, 0.4);
        border: 1.4px solid transparent;
        border-radius: 1.66vw;
        cursor: pointer;

        &.on {
          border-color: rgba(247, 171, 31, 0.4);

          img {
            opacity: 1;
          }
        }

        img {
          opacity: 0;
          width: 5vw;
        }

        .key {
          flex: 1;
        }

        .value {
        }
      }
    }
  }
`;

const PmyBalancePopup = styled.section`
  width: 500px;
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

    .blank,
    .exitBtn img {
      width: 16px;
    }
  }

  .contArea {
    padding: 30px 40px 60px;

    .targetBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;

      .leftBox {
        display: flex;
        flex-direction: column;
        gap: 6px;

        .type {
          font-size: 14px;
          height: 18px;
        }

        .balance {
          font-size: 24px;
        }
      }

      .actionBtn {
        height: 40px;
        padding: 0 20px;
        font-size: 16px;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.1);
        border: 1.4px solid #fff;
        border-radius: 20px;

        &:hover {
          color: #f7ab1f;
          background: rgba(247, 171, 31, 0.1);
          border-color: #f7ab1f;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
        }
      }
    }

    .typeList {
      display: flex;
      flex-direction: column;
      gap: 10px;

      li {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 48px;
        padding: 0 24px;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.4);
        border: 1.4px solid transparent;
        border-radius: 10px;
        cursor: pointer;

        &.on {
          border-color: rgba(247, 171, 31, 0.4);

          img {
            opacity: 1;
          }
        }

        img {
          opacity: 0;
          width: 18px;
        }

        .key {
          flex: 1;
        }

        .value {
        }
      }
    }
  }
`;
