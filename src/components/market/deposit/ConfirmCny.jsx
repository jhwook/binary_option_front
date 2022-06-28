import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import I_alarmYellow from "../../../img/icon/I_alarmYellow.svg";
import I_xCircleYellow from "../../../img/icon/I_xCircleYellow.svg";
import PopupBg from "../../common/PopupBg";
import ConfirmationPopup from "./ConfirmationPopup";
import TimeOutPopup from "./TimeOutPopup";

export default function ConfirmCny({ setConfirm, amount, setOk }) {
  const isMobile = useSelector((state) => state.common.isMobile);
  let time = 1800;
  // let time = 1;

  const [limit, setLimit] = useState(time);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [timeOutPopup, setTimeOutPopup] = useState(false);

  useEffect(() => {
    let intervalId = setInterval(() => {
      time--;
      setLimit(time);

      if (time <= 0) {
        setTimeOutPopup(true);
        clearInterval(intervalId);
      }
    }, [1000]);

    return () => clearInterval(intervalId);
  }, []);

  if (isMobile)
    return (
      <>
        <MconfirmCnyBox className="value on">
          <div className="headArea">
            <strong className="head">Complete Your Payment Within</strong>

            {limit > 0 && (
              <div className="timerBox">
                <span className="hour">{Math.floor(limit / 60)}</span>:
                <span className="minute">
                  {`${limit % 60}`.padStart(2, "0")}
                </span>
              </div>
            )}
          </div>

          <div className="contArea">
            <div className="listCont">
              <div className="listBox">
                <strong className="title">Order Info</strong>

                <ul>
                  <li>
                    <p className="key">Pay</p>
                    <p className="value">{amount} CNY</p>
                  </li>

                  <li>
                    <p className="key">Receive</p>
                    <p className="value">1.267427 USDT</p>
                  </li>
                </ul>
              </div>

              <div className="listBox">
                <strong className="title">Bank details</strong>

                {limit > 0 ? (
                  <ul>
                    <li>
                      <p className="key">BIC</p>
                      <p className="value">CLJUGB21</p>
                    </li>

                    <li>
                      <p className="key">Bank Name</p>
                      <p className="value">Clear Junction Limited</p>
                    </li>

                    <li>
                      <p className="key">Bank Address</p>
                      <p className="value">15 Kingsway London Wc2b 6un, UK</p>
                    </li>
                  </ul>
                ) : (
                  <p className="cancel">Your order has been canceled.</p>
                )}
              </div>
            </div>

            {limit > 0 ? (
              <div className="confirmBox">
                <div className="explain">
                  <img src={I_alarmYellow} alt="" />

                  <p>
                    Please complete the payment within 15 minute(s). The coins
                    you've bought will be credited to your Funding Account.
                  </p>
                </div>

                <button
                  className="confirmBtn"
                  onClick={() => setConfirmationPopup(true)}
                >
                  Confirm
                </button>
              </div>
            ) : (
              <div className="canceledBox">
                <button className="cancelBtn" onClick={() => setConfirm(false)}>
                  <img src={I_xCircleYellow} alt="" />
                </button>

                <p>
                  Unable to retrieve the payment method! The order has already
                  been canceled.
                </p>
              </div>
            )}
          </div>
        </MconfirmCnyBox>

        {confirmationPopup && (
          <>
            <ConfirmationPopup
              off={() => {
                setConfirmationPopup();
                setOk(true);
              }}
            />
            <PopupBg off={setConfirmationPopup} />
          </>
        )}

        {timeOutPopup && (
          <>
            <TimeOutPopup off={setTimeOutPopup} />
            <PopupBg off={setTimeOutPopup} />
          </>
        )}
      </>
    );
  else
    return (
      <>
        <PconfirmCnyBox className="value on">
          <div className="headArea">
            <strong className="head">Complete Your Payment Within</strong>

            {limit > 0 && (
              <div className="timerBox">
                <span className="hour">{Math.floor(limit / 60)}</span>:
                <span className="minute">
                  {`${limit % 60}`.padStart(2, "0")}
                </span>
              </div>
            )}
          </div>

          <div className="contArea">
            <div className="listCont">
              <div className="listBox">
                <strong className="title">Order Info</strong>

                <ul>
                  <li>
                    <p className="key">Pay</p>
                    <p className="value">{amount} CNY</p>
                  </li>

                  <li>
                    <p className="key">Receive</p>
                    <p className="value">1.267427 USDT</p>
                  </li>
                </ul>
              </div>

              <div className="listBox">
                <strong className="title">Bank details</strong>

                {limit > 0 ? (
                  <ul>
                    <li>
                      <p className="key">BIC</p>
                      <p className="value">CLJUGB21</p>
                    </li>

                    <li>
                      <p className="key">Bank Name</p>
                      <p className="value">Clear Junction Limited</p>
                    </li>

                    <li>
                      <p className="key">Bank Address</p>
                      <p className="value">15 Kingsway London Wc2b 6un, UK</p>
                    </li>
                  </ul>
                ) : (
                  <p className="cancel">Your order has been canceled.</p>
                )}
              </div>
            </div>

            {limit > 0 ? (
              <div className="confirmBox">
                <div className="explain">
                  <img src={I_alarmYellow} alt="" />

                  <p>
                    Please complete the payment within 15 minute(s). The coins
                    you've bought will be credited to your Funding Account.
                  </p>
                </div>

                <button
                  className="confirmBtn"
                  onClick={() => setConfirmationPopup(true)}
                >
                  Confirm
                </button>
              </div>
            ) : (
              <div className="canceledBox">
                <button className="cancelBtn" onClick={() => setConfirm(false)}>
                  <img src={I_xCircleYellow} alt="" />
                </button>

                <p>
                  Unable to retrieve the payment method! The order has already
                  been canceled.
                </p>
              </div>
            )}
          </div>
        </PconfirmCnyBox>

        {confirmationPopup && (
          <>
            <ConfirmationPopup
              off={() => {
                setConfirmationPopup();
                setOk(true);
              }}
            />
            <PopupBg off={setConfirmationPopup} />
          </>
        )}

        {timeOutPopup && (
          <>
            <TimeOutPopup off={setTimeOutPopup} />
            <PopupBg off={setTimeOutPopup} />
          </>
        )}
      </>
    );
}

const MconfirmCnyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11.66vw;

  .headArea {
    display: flex;
    align-items: center;
    gap: 2.77vw;

    .timerBox {
      display: flex;
      align-items: center;
      gap: 0.83vw;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6.66vw;
        aspect-ratio: 1;
        font-size: 3.88vw;
        font-weight: 700;
        color: #000;
        background: #fff;
        border-radius: 0.55vw;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 12.22vw;

    .listCont {
      display: flex;
      flex-direction: column;

      .listBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;
        font-size: 3.88vw;

        &:nth-of-type(1) {
          padding: 0 0 3.88vw;
        }

        &:nth-of-type(2) {
          padding: 3.88vw 0 0;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
        }

        .title {
        }

        ul {
          display: flex;
          flex-direction: column;
          gap: 1.11vw;

          li {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .key {
              opacity: 0.6;
            }

            .value {
            }
          }
        }

        .cancel {
          opacity: 0.6;
        }
      }
    }

    .confirmBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5.55vw;

      .explain {
        display: flex;
        align-items: flex-start;
        gap: 1.66vw;
        font-size: 3.88vw;
        line-height: 5vw;
        color: #f7ab1f;

        img {
          height: 14px;
          margin: 0.55vw 0;
          aspect-ratio: 1;
        }
      }

      .confirmBtn {
        width: 100%;
        height: 13.88vw;
        font-size: 5vw;
        font-weight: 700;
        color: #f7ab1f;
        border: 2px solid #f7ab1f;
        border-radius: 2.77vw;
      }
    }

    .canceledBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      .cancelBtn {
        display: flex;
        align-items: center;

        img {
          width: 30px;
          aspect-ratio: 1;
        }
      }

      p {
        font-size: 14px;
        color: #f7ab1f;
        text-align: center;
      }
    }
  }
`;

const PconfirmCnyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;

  .headArea {
    display: flex;
    align-items: center;
    gap: 10px;

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
    display: flex;
    flex-direction: column;
    gap: 44px;

    .listCont {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .listBox {
        display: flex;
        flex-direction: column;
        gap: 14px;
        font-size: 14px;

        .title {
        }

        ul {
          display: flex;
          flex-direction: column;
          gap: 4px;

          li {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .key {
              opacity: 0.6;
            }

            .value {
            }
          }
        }

        .cancel {
          opacity: 0.6;
        }
      }
    }

    .confirmBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;

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

      .confirmBtn {
        width: 200px;
        height: 50px;
        font-size: 18px;
        font-weight: 700;
        color: #f7ab1f;
        border: 2px solid #f7ab1f;
        border-radius: 10px;
      }
    }

    .canceledBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      .cancelBtn {
        display: flex;
        align-items: center;

        img {
          width: 30px;
          aspect-ratio: 1;
        }
      }

      p {
        font-size: 14px;
        color: #f7ab1f;
        text-align: center;
      }
    }
  }
`;
