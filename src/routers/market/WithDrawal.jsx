import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { API } from "../../configs/api";
import L_loader from "../../img/loader/L_loader.png";
import I_alarmYellow from "../../img/icon/I_alarmYellow.svg";
import T_usdt from "../../img/token/T_usdt.png";
import TokenSelectPopup from "../../components/common/TokenSelectPopup";

import { setToast, strDot } from "../../util/Util";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import PopupBg from "../../components/common/PopupBg";
import { useSelector } from "react-redux";
import DefaultHeader from "../../components/header/DefaultHeader";
import { useNavigate } from "react-router-dom";

export default function WithDrawal() {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [tokenPopup, setTokenPopup] = useState(false);
  const [token, setToken] = useState({ icon: T_usdt, text: "USDT" });
  const [settings, setSettings] = useState({
    commision: 0,
    minWithdraw: 5,
    maxTransactions: -1,
  });
  const [tokenList, setTokenList] = useState([{ icon: T_usdt, text: "USDT" }]);
  const [process, setProcess] = useState(false);
  const [loader, setLoader] = useState("");

  async function onClickDrawalBtn() {
    setLoader("drawalBtn");
    setProcess(true);
    const jtoken = localStorage.getItem("token");

    if (jtoken) {
      axios
        .patch(`${API.TRANS_WITHDRAW}/${amount}`, {
          rxaddr: address,
          tokentype: token.text,
        })
        .then(async ({ data }) => {
          console.log(data.payload.resp);
          if (data.payload.resp.status == "OK") {
            if (data.payload.resp.message) {
              //Transaction Success
              setToast({ type: "alarm", cont: "Submission Successful" });
              setProcess(true);
              setTimeout(() => {
                window.location.reload(false);
              }, 3000);
            }
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoader());
    } else setLoader();
  }

  if (isMobile)
    return (
      <>
        <DefaultHeader title="Withdrawal" />

        <MwithDrawalBox>
          <section className="innerBox">
            {process ? (
              <article className="onProcess">
                <div className="titleBox">
                  <strong className="key">You will get</strong>
                  <strong className="value">
                    {amount} {token.text}
                  </strong>
                </div>

                <ul className="infoList">
                  <li>
                    <p className="key">Withdrawal to</p>
                    <strong className="value">{strDot(address, 5, 4)}</strong>
                  </li>

                  <li>
                    <p className="key">Fee</p>
                    <strong className="value">0 {token.text}</strong>
                  </li>

                  <li>
                    <p className="key">Withdrawal Amount</p>
                    <strong className="value">
                      {amount} {token.text}
                    </strong>
                  </li>

                  <li>
                    <p className="key">Funds will arrive</p>
                    <strong className="value">Within 30 mins</strong>
                  </li>
                </ul>

                <div className="explainBox">
                  <p className="explain">
                    Transfer usually take under 30minutes. Depends on the speed
                    of your transaction. a delay may occur.
                  </p>

                  <button
                    className="viewBtn"
                    onClick={() => navigate("/market/history")}
                  >
                    View history
                  </button>
                </div>
              </article>
            ) : (
              <article className="unProcess">
                <ul className="inputList">
                  <li className="tokenBox">
                    <p className="key">Asset</p>

                    <div className="selectBox">
                      <button
                        className={`${tokenPopup && "on"} selBtn`}
                        onClick={() => setTokenPopup(true)}
                      >
                        <img className="token" src={token.icon} alt="" />
                        <strong className="name">{token.text}</strong>

                        <img className="arw" src={I_dnPolWhite} />
                      </button>

                      {tokenPopup && (
                        <>
                          <TokenSelectPopup
                            off={setTokenPopup}
                            list={tokenList}
                            setCont={setToken}
                          />
                          <PopupBg off={setTokenPopup} />
                        </>
                      )}
                    </div>
                  </li>

                  <li className="amountBox">
                    <p className="key">Amount</p>

                    <div className="valueBox">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder=""
                      />
                      <strong className="unit">USDT</strong>
                    </div>
                  </li>

                  <li className="addressBox">
                    <p className="key">Withdrawal address</p>

                    <div className="valueBox">
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder=""
                      />
                    </div>
                  </li>
                </ul>

                <div className="drawalBox">
                  <ul className="infoList">
                    <li>
                      <p className="key">Commission</p>
                      <p className="value">{settings.commision}%</p>
                    </li>
                    <li>
                      <p className="key">Minimum withdraw amount</p>
                      <p className="value">{settings.minWithdraw} USDT</p>
                    </li>
                    <li>
                      <p className="key">Max amount per transaction</p>
                      <p className="value">
                        {settings.maxTransactions == -1
                          ? "no limits"
                          : settings.maxTransactions}
                      </p>
                    </li>
                  </ul>

                  <button
                    className={`${
                      loader === "drawalBtn" && "loading"
                    } drawalBtn`}
                    disabled={!(amount && address)}
                    onClick={onClickDrawalBtn}
                  >
                    <p className="common">Withdrawal</p>
                    <img className="loader" src={L_loader} alt="" />
                  </button>
                </div>
              </article>
            )}
          </section>
        </MwithDrawalBox>
      </>
    );
  else
    return (
      <PwithDrawalBox>
        <article className="contArea">
          <div className="key">
            <span className="count">1</span>

            <strong className="title">Withdraw</strong>
          </div>

          <div className="value">
            <ul className="inputList">
              <li className="tokenBox">
                <p className="key">Asset</p>

                <div className="selectBox">
                  <button
                    className={`${tokenPopup && "on"} selBtn`}
                    onClick={() => setTokenPopup(true)}
                  >
                    <img className="token" src={token.icon} alt="" />
                    <strong className="name">{token.text}</strong>

                    <img className="arw" src={I_dnPolWhite} />
                  </button>

                  {tokenPopup && (
                    <>
                      <TokenSelectPopup
                        off={setTokenPopup}
                        list={tokenList}
                        setCont={setToken}
                      />
                      <PopupBg off={setTokenPopup} />
                    </>
                  )}
                </div>
              </li>

              <li className="amountBox">
                <p className="key">Amount</p>

                <div className="valueBox">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder=""
                  />
                  <strong className="unit">USDT</strong>
                </div>
              </li>

              <li className="addressBox">
                <p className="key">Withdrawal address</p>

                <div className="valueBox">
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder=""
                  />
                </div>
              </li>
            </ul>

            <div className="drawalBox">
              <ul className="infoList">
                <li>
                  <p className="key">Commission</p>
                  <p className="value">{settings.commision}%</p>
                </li>
                <li>
                  <p className="key">Minimum withdraw amount</p>
                  <p className="value">{settings.minWithdraw} USDT</p>
                </li>
                <li>
                  <p className="key">Max amount per transaction</p>
                  <p className="value">
                    {settings.maxTransactions == -1
                      ? "no limits"
                      : settings.maxTransactions}
                  </p>
                </li>
              </ul>

              <button
                className={`${loader === "drawalBtn" && "loading"} drawalBtn`}
                disabled={!(amount && address)}
                onClick={onClickDrawalBtn}
              >
                <p className="common">Withdrawal</p>
                <img className="loader" src={L_loader} alt="" />
              </button>
            </div>
          </div>
        </article>

        <article className="detailArea">
          <div className="key">
            <span className="count">2</span>

            <strong className="title">Withdrawal Confrimation</strong>
          </div>

          {process ? (
            <div className={`onProcess value`}>
              <div className="titleBox">
                <strong className="key">You will get</strong>
                <strong className="value">
                  {amount} {token.text}
                </strong>
              </div>

              <ul className="infoList">
                <li>
                  <p className="key">Withdrawal to</p>
                  <strong className="value">{strDot(address, 5, 4)}</strong>
                </li>

                <li>
                  <p className="key">Fee</p>
                  <strong className="value">0 {token.text}</strong>
                </li>

                <li>
                  <p className="key">Withdrawal Amount</p>
                  <strong className="value">
                    {amount} {token.text}
                  </strong>
                </li>

                <li>
                  <p className="key">Funds will arrive</p>
                  <strong className="value">Within 30 mins</strong>
                </li>
              </ul>

              <div className="explainBox">
                <img src={I_alarmYellow} alt="" />

                <p>
                  Transfer usually take under 30minutes. Depends on the speed of
                  your transaction. a delay may occur.
                </p>
              </div>
            </div>
          ) : (
            <div className={`unProcess value`}>
              <p className="head">Important :</p>

              <ul className="bodyList">
                <li>
                  Please make sure that only USDT deposit is made via this
                  address. Otherwise, your deposited funds will not be added to
                  your available balance — nor will it be refunded.
                </li>
                <li>
                  Please make sure that your Betbit deposit address is correct.
                  Otherwise, your deposited funds will not be added to your
                  available balance — nor will it be refunded.
                </li>
                <li>
                  Please note that the current asset does not support deposit
                  via the smart contract. If used, your deposited funds will not
                  be added to your available balance — nor will it be refunded.
                </li>
              </ul>
            </div>
          )}
        </article>
      </PwithDrawalBox>
    );
}

const MwithDrawalBox = styled.main`
  padding: 20px;
  height: 100%;

  .innerBox {
    height: 100%;
    overflow-y: scroll;

    .onProcess {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 14px 0 0;

      .titleBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;

        .key {
          font-size: 16px;
        }

        .value {
          font-size: 26px;
        }
      }

      .infoList {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        padding: 20px;
        margin: 20px 0 0;
        font-size: 14px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;

        li {
          display: flex;
          justify-content: space-between;

          .key {
            opacity: 0.6;
          }
        }
      }

      .explainBox {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 40px 0 0;
        color: #f7ab1f;

        .explain {
          padding: 0 24px;
          font-size: 14px;
          text-align: center;
        }

        .viewBtn {
          height: 50px;
          font-size: 16px;
          border: 2px solid rgba(247, 171, 31, 0.8);
          border-radius: 10px;
        }
      }
    }

    .unProcess {
      display: flex;
      flex-direction: column;
      gap: 54px;

      .inputList {
        display: flex;
        flex-direction: column;
        gap: 14px;

        li {
          &.tokenBox {
            .selectBox {
              margin: 10px 0 0 0;
              background: rgba(255, 255, 255, 0.1);
              border: 1.4px solid rgba(0, 0, 0, 0);
              border-radius: 10px;
              position: relative;

              .selBtn {
                display: flex;
                align-items: center;
                gap: 8px;
                width: 100%;
                height: 50px;
                padding: 0 22px;
                font-size: 18px;
                font-weight: 700;

                &.on {
                  .arw {
                    opacity: 1;
                    transform: rotate(180deg);
                  }
                }

                .token {
                  width: 30px;
                  aspect-ratio: 1;
                }

                .name {
                  text-align: start;
                  flex: 1;
                }

                .arw {
                  height: 8px;
                  opacity: 0.4;
                }
              }
            }
          }

          &.amountBox {
            .optList {
              display: flex;
              gap: 10px;
              margin: 10px 0 0 0;
              font-size: 16px;
              overflow-x: scroll;

              .optBtn {
                flex: 1;
                height: 34px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                color: rgba(255, 255, 255, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.4);

                &.on {
                  color: #fff;
                  border: 1px solid #fff;
                }
              }
            }
          }

          .key {
            font-size: 14px;
          }

          .valueBox {
            display: flex;
            align-items: center;
            gap: 8px;
            height: 50px;
            padding: 0 22px;
            margin: 10px 0 0 0;
            font-size: 18px;
            font-weight: 700;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            border: 1.4px solid rgba(0, 0, 0, 0);
            cursor: pointer;
            position: relative;

            input {
              flex: 1;
              height: 100%;
            }

            &:focus-within {
              border-color: #f7ab1f;
            }
          }
        }
      }

      .drawalBox {
        .infoList {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px 14px 14px;
          background: rgba(0, 0, 0, 0.6);

          li {
            display: flex;
            justify-content: space-between;
            font-size: 14px;

            .key {
              opacity: 0.6;
            }

            .value {
            }
          }
        }

        .drawalBtn {
          width: 100%;
          height: 50px;
          font-size: 16px;
          font-weight: 700;
          color: #4e3200;
          background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
          border-radius: 10px;

          &:disabled {
            color: #f7ab1f;
            background: #fff;
          }
        }
      }
    }
  }
`;

const PwithDrawalBox = styled.main`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 100px;
  padding: 70px 140px;

  @media (max-width: 1440px) {
    max-width: 1020px;
    min-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 40px;

    & > .key {
      display: flex;
      align-items: center;
      gap: 12px;

      .count {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        font-size: 14px;
        color: #2a2a2a;
        border-radius: 50%;
        background: #f7ab1f;
      }

      .title {
        font-size: 24px;
      }
    }

    &.contArea {
      width: 454px;
      min-width: 392px;

      & > .value {
        display: flex;
        flex-direction: column;
        gap: 40px;

        .inputList {
          display: flex;
          flex-direction: column;
          gap: 20px;

          li {
            &.tokenBox {
              .selectBox {
                margin: 10px 0 0 0;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                border: 1.4px solid rgba(0, 0, 0, 0);
                position: relative;

                .selBtn {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  width: 100%;
                  height: 56px;
                  padding: 0 24px;
                  font-size: 20px;
                  font-weight: 700;

                  &.on {
                    .arw {
                      opacity: 1;
                      transform: rotate(180deg);
                    }
                  }

                  .token {
                    width: 38px;
                    aspect-ratio: 1;
                    filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4));
                  }

                  .name {
                    text-align: start;
                    flex: 1;
                  }

                  .arw {
                    height: 8px;
                    opacity: 0.4;
                  }
                }
              }
            }

            &.amountBox {
              .optList {
                display: flex;
                gap: 12px;
                margin: 14px 0 0 0;
                font-size: 20px;
                overflow-x: scroll;

                .optBtn {
                  flex: 1;
                  height: 42px;
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 8px;
                  color: rgba(255, 255, 255, 0.6);
                  border: 1px solid rgba(255, 255, 255, 0.4);

                  &.on {
                    color: #fff;
                    border: 1px solid #fff;
                  }
                }
              }
            }

            &.addressBox {
            }

            .key {
              font-size: 16px;
            }

            .valueBox {
              display: flex;
              align-items: center;
              gap: 10px;
              height: 56px;
              padding: 0 24px;
              margin: 10px 0 0 0;
              font-size: 20px;
              font-weight: 700;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
              border: 1.4px solid rgba(0, 0, 0, 0);
              cursor: pointer;
              position: relative;

              input {
                flex: 1;
                height: 100%;
              }

              &:focus-within {
                border-color: #f7ab1f;
              }
            }
          }
        }

        .drawalBox {
          .infoList {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 16px 18px 20px;
            background: rgba(0, 0, 0, 0.6);

            li {
              display: flex;
              justify-content: space-between;
              font-size: 16px;

              .key {
                opacity: 0.6;
              }

              .value {
              }
            }
          }

          .drawalBtn {
            width: 100%;
            height: 56px;
            font-size: 18px;
            font-weight: 700;
            color: #4e3200;
            background: linear-gradient(
              99.16deg,
              #604719 3.95%,
              #f7ab1f 52.09%
            );
            border-radius: 10px;

            &:disabled {
              color: #f7ab1f;
              background: #fff;
            }
          }
        }
      }
    }

    &.detailArea {
      width: 472px;

      & > .value {
        height: 510px;
        padding: 70px 34px 0;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.4),
          0px 10px 40px rgba(255, 255, 255, 0.2);

        &.onProcess {
          display: flex;
          flex-direction: column;
          align-items: center;

          .titleBox {
            display: flex;
            flex-direction: column;
            gap: 8px;
            text-align: center;

            .key {
              font-size: 16px;
              opacity: 0.6;
            }

            .value {
              font-size: 26px;
            }
          }

          .infoList {
            display: flex;
            flex-direction: column;
            gap: 6px;
            width: 100%;
            padding: 22px 20px 24px;
            margin: 34px 0 0;
            font-size: 14px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;

            li {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .key {
                opacity: 0.6;
              }
            }
          }

          .explainBox {
            display: flex;
            gap: 6px;
            margin: 44px 0 0;
            font-size: 14px;
            line-height: 18px;
            color: #f7ab1f;

            img {
              margin: 2px 0;
              height: 14px;
            }
          }
        }

        &.unProcess {
          padding: 40px 28px;

          .head {
            font-size: 16px;
          }

          .bodyList {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin: 14px 0 0 0;

            li {
              margin: 0 0 0 20px;
              font-size: 14px;
              opacity: 0.4;
              list-style-type: disc;
            }
          }
        }
      }
    }
  }
`;
