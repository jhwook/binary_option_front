import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function BalancePopup({ off, setConfirm, setData }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");

  function onClickConfirmBtn() {
    setData({ name, card, bankCode, bankName });
    setConfirm(true);
    off();
  }

  if (isMobile)
    return (
      <MbalancePopupBox>
        <article className="topArea">
          <span className="blank" />

          <p className="title">Cash in Person</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <ul className="inputList">
            <li>
              <p className="key">*Name</p>

              <div className="inputBox">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
              </div>
            </li>

            <li>
              <p className="key">*Card No</p>

              <div className="inputBox">
                <input
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  placeholder="Please enter your bank card no"
                />
              </div>
            </li>

            <li>
              <p className="key">Bank Code</p>

              <div className="inputBox">
                <input
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                  placeholder="Enter Bank Code"
                />
              </div>
            </li>

            <li>
              <p className="key">Bank Name</p>

              <div className="inputBox">
                <input
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Enter Bank Name"
                />
              </div>
            </li>
          </ul>

          <div className="btnBox">
            <button className="confirmBtn" onClick={onClickConfirmBtn}>
              Confirm
            </button>
          </div>
        </article>
      </MbalancePopupBox>
    );
  else
    return (
      <PbalancePopupBox className="defaultPopup">
        <article className="topArea">
          <span className="blank" />

          <p className="title">Cash in Person</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <ul className="inputList">
            <li>
              <p className="key">*Name</p>

              <div className="inputBox">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
              </div>
            </li>

            <li>
              <p className="key">*Card No</p>

              <div className="inputBox">
                <input
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  placeholder="Please enter your bank card no"
                />
              </div>
            </li>

            <li>
              <p className="key">Bank Code</p>

              <div className="inputBox">
                <input
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                  placeholder="Enter Bank Code"
                />
              </div>
            </li>

            <li>
              <p className="key">Bank Name</p>

              <div className="inputBox">
                <input
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Enter Bank Name"
                />
              </div>
            </li>
          </ul>

          <div className="btnBox">
            <button className="confirmBtn" onClick={onClickConfirmBtn}>
              Confirm
            </button>

            <button className="cancelBtn" onClick={() => off()}>
              Cancel
            </button>
          </div>
        </article>
      </PbalancePopupBox>
    );
}

const MbalancePopupBox = styled.section`
  max-height: 80vh;
  overflow-y: scroll;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5.55vw 5.55vw 0px 0px;
  box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 6;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 16.66vw;
    padding: 0 7.5vw;

    .title {
      font-size: 4.44vw;
    }

    .exitBtn {
      img {
        width: 4.44vw;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 44px;
    padding: 3.88vw 5.55vw 11.66vw;

    .inputList {
      display: flex;
      flex-direction: column;
      gap: 3.88vw;

      li {
        display: flex;
        flex-direction: column;
        gap: 2.77vw;

        .key {
          font-size: 3.88vw;
        }

        .inputBox {
          display: flex;
          align-items: center;
          font-size: 3.88vw;
          height: 12.22vw;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid transparent;
          border-radius: 2.22vw;

          &:focus-within {
            border-color: #fff;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
          }

          input {
            flex: 1;
            height: 100%;
            padding: 0 5vw;
          }
        }
      }
    }

    .btnBox {
      display: flex;
      align-items: center;
      gap: 20px;

      button {
        flex: 1;
        height: 13.88vw;
        font-size: 4.44vw;
        font-weight: 700;
        border-radius: 2.77vw;

        &.confirmBtn {
          color: #4e3200;
          background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
        }

        &.cancelBtn {
          color: #f7ab1f;
          border: 2px solid #f7ab1f;
        }
      }
    }
  }
`;

const PbalancePopupBox = styled.section`
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

    .exitBtn {
      img {
        width: 16px;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 44px;
    padding: 20px 30px 60px;

    .inputList {
      display: flex;
      flex-direction: column;
      gap: 20px;

      li {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .key {
          font-size: 14px;
        }

        .inputBox {
          display: flex;
          align-items: center;
          font-size: 16px;
          height: 48px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid transparent;
          border-radius: 10px;

          &:focus-within {
            border-color: #fff;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
          }

          input {
            flex: 1;
            height: 100%;
            padding: 0 20px;
          }
        }
      }
    }

    .btnBox {
      display: flex;
      align-items: center;
      gap: 20px;

      button {
        flex: 1;
        height: 56px;
        font-size: 18px;
        font-weight: 700;
        border-radius: 12px;

        &.confirmBtn {
          color: #4e3200;
          background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
        }

        &.cancelBtn {
          color: #f7ab1f;
          border: 2px solid #f7ab1f;
        }
      }
    }
  }
`;
