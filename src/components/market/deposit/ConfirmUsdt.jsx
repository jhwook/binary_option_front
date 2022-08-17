import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import contractaddr from "../../../configs/contractaddr";
import I_cpWhite from "../../../img/icon/I_cpWhite.svg";
import { onClickCopy } from "../../../util/Util";
import I_alarmYellow from "../../../img/icon/I_alarmYellow.svg";

export default function ConfirmUsdt({ amount, token }) {
  let time = 1800;

  const { t } = useTranslation();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [limit, setLimit] = useState(time);

  useEffect(() => {
    let intervalId = setInterval(() => {
      time--;
      setLimit(time);

      if (time <= 0) {
        clearInterval(intervalId);
      }
    }, [1000]);

    return () => clearInterval(intervalId);
  }, []);

  if (isMobile)
    return (
      <>
        <MconfirmUsdtBox className="value on">
          <div className="headArea">
            <strong className="head">
              {t("To complete the payment, please transfer")}
            </strong>
          </div>

          <div className="contArea">
            <ul>
              <li>
                <p className="key">{t("Deposit to")}</p>

                <button
                  className="value"
                  onClick={() => onClickCopy(contractaddr.admin)}
                >
                  <strong>{contractaddr.admin}</strong>
                  <img src={I_cpWhite} alt="" />
                </button>
              </li>

              <li>
                <p className="key">{t("Fee")}</p>
                <div className="value">
                  <strong>0 {token.text}</strong>
                </div>
              </li>

              <li>
                <p className="key">{t("Deposit Amount")}</p>
                <div className="value">
                  <strong>
                    {amount} {token.text}
                  </strong>
                </div>
              </li>

              <li>
                <p className="key">{t("Funds will arrive")}</p>
                <div className="value">
                  <strong>Within {Math.floor(limit / 60)} mins</strong>
                </div>
              </li>
            </ul>
          </div>

          <div className="explain">
            <img src={I_alarmYellow} alt="" />

            <p>
              {t(
                `Please complete the payment within ${
                  time / 60
                } minute(s). The coins you've bought will be credited to your Funding Account.`
              )}
            </p>
          </div>
        </MconfirmUsdtBox>
      </>
    );
  else
    return (
      <>
        <PconfirmUsdtBox className="value on">
          <div className="headArea">
            <strong className="head">
              {t("To complete the payment, please transfer")}
            </strong>
          </div>

          <div className="contArea">
            <ul>
              <li>
                <p className="key">{t("Deposit to")}</p>

                <button
                  className="value"
                  onClick={() => onClickCopy(contractaddr.admin)}
                >
                  <strong>{contractaddr.admin}</strong>
                  <img src={I_cpWhite} alt="" />
                </button>
              </li>

              <li>
                <p className="key">{t("Fee")}</p>
                <div className="value">
                  <strong>0 {token.text}</strong>
                </div>
              </li>

              <li>
                <p className="key">{t("Deposit Amount")}</p>
                <div className="value">
                  <strong>
                    {amount} {token.text}
                  </strong>
                </div>
              </li>

              <li>
                <p className="key">{t("Funds will arrive")}</p>
                <div className="value">
                  <strong>Within {Math.floor(limit / 60)} mins</strong>
                </div>
              </li>
            </ul>
          </div>

          <div className="explain">
            <img src={I_alarmYellow} alt="" />

            <p>
              {t(
                `Please complete the payment within ${
                  time / 60
                } minute(s). The coins you've bought will be credited to your Funding Account.`
              )}
            </p>
          </div>
        </PconfirmUsdtBox>
      </>
    );
}

const MconfirmUsdtBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow-y: scroll;

  .headArea {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;

    .timerBox {
      display: flex;
      align-items: center;
      gap: 3px;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        aspect-ratio: 1;
        font-size: 14px;
        font-weight: 700;
        color: #000;
        background: #fff;
        border-radius: 2px;
      }
    }
  }

  .contArea {
    ul {
      display: flex;
      flex-direction: column;
      gap: 4px;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .key {
          width: 130px;
          opacity: 0.6;
        }

        .value {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;

          strong {
            flex: 1;
            text-align: end;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .explain {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 14px;
    line-height: 18px;
    color: #f7ab1f;

    img {
      height: 14px;
      margin: 2px 0;
      aspect-ratio: 1;
    }
  }
`;

const PconfirmUsdtBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;

  .headArea {
    display: flex;
    justify-content: center;
    padding: 30px 0 0 0;
    font-size: 16px;
  }

  .contArea {
    ul {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 22px 20px;
      background: #2f3237;
      border-radius: 10px;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;

        .key {
          width: 130px;
          opacity: 0.6;
        }

        .value {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
          overflow: hidden;

          strong {
            flex: 1;
            text-align: end;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .explain {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    font-size: 14px;
    line-height: 18px;
    color: #f7ab1f;

    img {
      height: 14px;
      margin: 2px 0;
      aspect-ratio: 1;
    }
  }
`;
