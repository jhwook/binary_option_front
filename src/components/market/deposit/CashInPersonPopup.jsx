import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function CashInPersonPopup({ off, setConfirm, setData }) {
  const { t } = useTranslation();
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
      <McashInPersonPopup>
        <article className="topArea">
          <span className="blank" />

          <p className="title">{t("Complete Identity Verification")}</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <ul className="inputList">
            <li>
              <p className="key">*{t("Name")}</p>

              <div className="inputBox">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("Enter Name")}
                />
              </div>
            </li>

            <li>
              <p className="key">*{t("Card No")}</p>

              <div className="inputBox">
                <input
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  placeholder={t("Please enter your bank card no")}
                />
              </div>
            </li>

            <li>
              <p className="key">{t("Bank Code")}</p>

              <div className="inputBox">
                <input
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                  placeholder={t("Enter Bank Code")}
                />
              </div>
            </li>

            <li>
              <p className="key">{t("Bank Name")}</p>

              <div className="inputBox">
                <input
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder={t("Enter Bank Name")}
                />
              </div>
            </li>
          </ul>

          <div className="btnBox">
            <button className="confirmBtn" onClick={onClickConfirmBtn}>
              {t("Confirm")}
            </button>
          </div>
        </article>
      </McashInPersonPopup>
    );
  else
    return (
      <PcashInPersonPopup className="defaultPopup">
        <article className="topArea">
          <span className="blank" />

          <p className="title">{t("Complete Identity Verification")}</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <ul className="inputList">
            <li>
              <p className="key">*{t("Name")}</p>

              <div className="inputBox">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("Enter Name")}
                />
              </div>
            </li>

            <li>
              <p className="key">*{t("Card No")}</p>

              <div className="inputBox">
                <input
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                  placeholder={t("Please enter your bank card no")}
                />
              </div>
            </li>

            <li>
              <p className="key">{t("Bank Code")}</p>

              <div className="inputBox">
                <input
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                  placeholder={t("Enter Bank Code")}
                />
              </div>
            </li>

            <li>
              <p className="key">{t("Bank Name")}</p>

              <div className="inputBox">
                <input
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder={t("Enter Bank Name")}
                />
              </div>
            </li>
          </ul>

          <div className="btnBox">
            <button className="confirmBtn" onClick={onClickConfirmBtn}>
              {t("Confirm")}
            </button>

            <button className="cancelBtn" onClick={() => off()}>
              {t("Cancel")}
            </button>
          </div>
        </article>
      </PcashInPersonPopup>
    );
}

const McashInPersonPopup = styled.section`
  max-height: 80vh;
  overflow-y: scroll;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px 20px 0px 0px;
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
    height: 60px;
    padding: 0 27px;

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
    gap: 44px;
    padding: 14px 20px 16px;

    .inputList {
      display: flex;
      flex-direction: column;
      gap: 14px;

      li {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .key {
          font-size: 14px;
        }

        .inputBox {
          display: flex;
          align-items: center;
          font-size: 14px;
          height: 50px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid transparent;
          border-radius: 8px;

          &:focus-within {
            border-color: #fff;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
          }

          input {
            flex: 1;
            height: 100%;
            padding: 0 18px;
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
        height: 50px;
        font-size: 16px;
        font-weight: 700;
        border-radius: 10px;

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

const PcashInPersonPopup = styled.section`
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
