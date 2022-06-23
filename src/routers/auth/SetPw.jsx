import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function SetPw() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [pw, setPw] = useState("");
  const [pwAlarm, setPwAlarm] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [confirmPwAlarm, setConfirmPwAlarm] = useState("");

  function validatePw(str) {
    const regex = /(?=.*\d)(?=.*[A-Z]).{8,}/;
    return regex.test(str);
  }

  function onClickContBtn() {
    navigate("/auth/comppw");
  }

  useEffect(() => {
    if (pw && !validatePw(pw))
      setPwAlarm(
        "Password must be at least 8 characters with 1 upper case letter and 1 number."
      );
    else setPwAlarm("");
  }, [pw]);

  useEffect(() => {
    if (!(pw && confirmPw)) return;

    if (pw === confirmPw) setConfirmPwAlarm("");
    else setConfirmPwAlarm("Passwords do not match.");
  }, [pw, confirmPw]);

  if (isMobile)
    return (
      <>
        <MsetPwBox>
          <section className="innerBox">
            <div className="titleBox">
              <strong className="pgTitle">Reset Your Password</strong>
            </div>

            <article className="contArea">
              <div className="loginArc">
                <div className="contBox">
                  <ul className="inputList">
                    <li>
                      <p className="key">New Password</p>
                      <div className="value">
                        <div className={`${pwAlarm && "alarm"} inputBox`}>
                          <input
                            type="password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            placeholder=""
                          />
                        </div>

                        {pwAlarm && <p className="alarm">{pwAlarm}</p>}
                      </div>
                    </li>

                    <li>
                      <p className="key">Confirm Password</p>

                      <div className="value">
                        <div
                          className={`${confirmPwAlarm && "alarm"} inputBox`}
                        >
                          <input
                            type="password"
                            value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                            placeholder=""
                          />
                        </div>

                        {confirmPwAlarm && (
                          <p className="alarm">{confirmPwAlarm}</p>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="btnBox">
                  <button
                    className="loginBtn"
                    disabled={!(pw && confirmPw) || pwAlarm || confirmPwAlarm}
                    onClick={onClickContBtn}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </article>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </MsetPwBox>
      </>
    );
  else
    return (
      <>
        <PsetPwBox>
          <section className="innerBox">
            <div className="titleBox">
              <strong className="pgTitle">Reset Your Password</strong>
            </div>

            <article className="contArea">
              <div className="loginArc">
                <div className="contBox">
                  <ul className="inputList">
                    <li>
                      <p className="key">New Password</p>
                      <div className="value">
                        <div className={`${pwAlarm && "alarm"} inputBox`}>
                          <input
                            type="password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            placeholder=""
                          />
                        </div>

                        {pwAlarm && <p className="alarm">{pwAlarm}</p>}
                      </div>
                    </li>

                    <li>
                      <p className="key">Confirm Password</p>

                      <div className="value">
                        <div
                          className={`${confirmPwAlarm && "alarm"} inputBox`}
                        >
                          <input
                            type="password"
                            value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                            placeholder=""
                          />
                        </div>

                        {confirmPwAlarm && (
                          <p className="alarm">{confirmPwAlarm}</p>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="btnBox">
                  <button
                    className="loginBtn"
                    disabled={!(pw && confirmPw) || pwAlarm || confirmPwAlarm}
                    onClick={onClickContBtn}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </article>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </PsetPwBox>
      </>
    );
}

const MsetPwBox = styled.main`
  padding: 15.55vw 0 0 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 11.11vw;
    padding: 11.11vw 4.44vw 0;

    .titleBox {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .pgTitle {
        font-size: 6.11vw;
      }
    }

    .contArea {
      .loginArc {
        .contBox {
          .inputList {
            display: flex;
            flex-direction: column;
            gap: 5.55vw;

            li {
              display: flex;
              flex-direction: column;
              gap: 2.22vw;
              font-size: 3.88vw;

              .key {
              }

              .value {
                display: flex;
                flex-direction: column;
                gap: 2.22vw;

                .inputBox {
                  display: flex;
                  align-items: center;
                  height: 12.22vw;
                  padding: 0 5.55vw;
                  border-radius: 2.22vw;
                  border: 1px solid #ddd;

                  &:focus-within {
                    border-color: #f7ab1f;
                  }

                  &.alarm {
                    border-color: #f00;
                  }

                  input {
                    flex: 1;
                  }

                  .delBtn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 4.44vw;
                    height: 4.44vw;
                    background: #ddd;
                    border-radius: 50%;

                    img {
                      width: 2.22vw;
                    }
                  }

                  .getCodeBtn {
                    font-size: 3.88vw;
                    color: #f7ab1f;
                  }
                }

                p.alarm {
                  font-size: 3.33vw;
                  color: #ff5353;
                }
              }
            }
          }
        }

        .btnBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3.88vw;
          margin: 8.33vw 0 0 0;

          button {
            width: 100%;
            height: 13.88vw;
            font-size: 4.44vw;
            border-radius: 2.22vw;

            &.loginBtn {
              font-weight: 700;
              color: #fff;
              background: #2a2a2a;
            }
          }
        }
      }
    }
  }

  .cpRight {
    font-size: 3.33vw;
    white-space: nowrap;
    color: #ddd;
    bottom: 30px;
    left: 50%;
    position: fixed;
    transform: translate(-50%);
  }
`;

const PsetPwBox = styled.main`
  display: flex;
  justify-content: center;
  padding: 70px 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 44px;
    padding: 90px 0;

    .titleBox {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .pgTitle {
        font-size: 28px;
      }
    }

    .contArea {
      .loginArc {
        width: 400px;

        .contBox {
          .inputList {
            display: flex;
            flex-direction: column;
            gap: 20px;

            li {
              display: flex;
              flex-direction: column;
              gap: 8px;
              font-size: 14px;

              .key {
              }

              .value {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .inputBox {
                  display: flex;
                  align-items: center;
                  height: 44px;
                  padding: 0 16px;
                  border-radius: 8px;
                  border: 1px solid #ddd;

                  &:focus-within {
                    border-color: #f7ab1f;
                  }

                  &.alarm {
                    border-color: #f00;
                  }

                  input {
                    flex: 1;
                  }

                  .delBtn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 16px;
                    height: 16px;
                    background: #ddd;
                    border-radius: 50%;

                    img {
                      width: 8px;
                    }
                  }
                }

                p.alarm {
                  font-size: 12px;
                  color: #ff5353;
                }
              }
            }
          }
        }

        .btnBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin: 40px 0 0 0;

          button {
            width: 100%;
            height: 56px;
            font-size: 18px;
            border-radius: 8px;

            &.loginBtn {
              font-weight: 700;
              color: #fff;
              background: #2a2a2a;
            }

            &.googleBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 14px;
              border: 1px solid #e6e6e6;
            }
          }

          .or {
            font-size: 16px;
          }
        }

        .utilBox {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          margin: 24px 0 0 0;
          font-size: 14px;

          button {
            color: #f7ab1f;
          }
        }
      }

      .qrArea {
        display: flex;
        flex-direction: column;
        gap: 40px;
        width: 240px;

        .qrBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 240px;
          height: 240px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 14px;
        }

        .textBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;

          .title {
            font-size: 16px;
          }

          .explain {
            font-size: 14px;
            color: #888;
            text-align: center;
          }
        }
      }
    }
  }

  .cpRight {
    font-size: 12px;
    bottom: 30px;
    left: 50%;
    position: fixed;
    transform: translate(-50%);
  }
`;