import { useState } from "react";
import styled from "styled-components";
import { D_balanceList } from "../../data/D_header";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import I_chkOrange from "../../img/icon/I_chkOrange.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InsufficientPopup({ off, setAddPopup }) {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [balanceType, setBalanceType] = useState(D_balanceList[0]);

  function onClickConfirmBtn(nextProc) {
    off();
    nextProc(true);
  }

  if (isMobile)
    return (
      <MinsufficientPopupBox className="defaultPopup">
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
              <p className="type">{`${balanceType} balance`}</p>
              <p className="balance">1033 USDT</p>
              <p className="type"></p>
            </div>

            {balanceType === "Live" && (
              <button
                className="actionBtn"
                onClick={() => onClickConfirmBtn(navigate("/market/deposit"))}
              >
                Deposit
              </button>
            )}

            {balanceType === "Demo" && (
              <button
                className="actionBtn"
                onClick={() => onClickConfirmBtn(setAddPopup)}
              >
                Add
              </button>
            )}
          </div>

          <ul className="typeList">
            {D_balanceList.map((v, i) => (
              <li
                key={i}
                className={`${balanceType === v && "on"}`}
                onClick={() => setBalanceType(v)}
              >
                <img src={I_chkOrange} alt="" />
                <p className="key">{v} balance</p>

                <strong className="value">{`100 USDT`}</strong>
              </li>
            ))}
          </ul>
        </article>
      </MinsufficientPopupBox>
    );
  else
    return (
      <PinsufficientPopupBox className="defaultPopup">
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
              <p className="type">{`${balanceType} balance`}</p>
              <p className="balance">1033 USDT</p>
              <p className="type"></p>
            </div>

            {balanceType === "Live" && (
              <button
                className="actionBtn"
                onClick={() => onClickConfirmBtn(navigate("/market/deposit"))}
              >
                Deposit
              </button>
            )}

            {balanceType === "Demo" && (
              <button
                className="actionBtn"
                onClick={() => onClickConfirmBtn(setAddPopup)}
              >
                Add
              </button>
            )}
          </div>

          <ul className="typeList">
            {D_balanceList.map((v, i) => (
              <li
                key={i}
                className={`${balanceType === v && "on"}`}
                onClick={() => setBalanceType(v)}
              >
                <img src={I_chkOrange} alt="" />
                <p className="key">{v} balance</p>

                <strong className="value">{`100 USDT`}</strong>
              </li>
            ))}
          </ul>
        </article>
      </PinsufficientPopupBox>
    );
}

const MinsufficientPopupBox = styled.section`
  width: 91.11vw;
  color: #fff;

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

const PinsufficientPopupBox = styled.section`
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
