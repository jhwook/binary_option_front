import { useState } from "react";
import styled from "styled-components";
import { D_locNumList, D_loginCategoryList } from "../../data/D_auth";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import I_dnPol from "../../img/icon/I_dnPol.svg";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import PopupBg from "../../components/common/PopupBg";
import SelectPhoneLocPopup from "../../components/auth/SelectPhoneLocPopup";
import QRCode from "react-qr-code";

export default function ResetPw() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [category, setCategory] = useState(0);
  const [email, setEmail] = useState("");
  const [phoneLoc, setPhoneLoc] = useState("82");
  const [phone, setPhone] = useState("");
  const [selLocPopup, setSelLocPopup] = useState(false);
  const [code, setCode] = useState("");

  function onBlurPhone() {
    if (phone[0] === "0") setPhone(phone.slice(1));
  }

  function onClickContBtn() {
    navigate("/auth/setpw/123");
  }

  if (isMobile)
    return (
      <>
        <MloginBox>
          <section className="innerBox">
            <div className="titleBox">
              <strong className="pgTitle">Reset Your Password</strong>
            </div>

            <article className="contArea">
              <div className="loginArc">
                <div className="contBox">
                  <ul className="categoryList">
                    {D_loginCategoryList.map((v, i) => (
                      <li key={i} className={`${category === i && "on"}`}>
                        <button onClick={() => setCategory(i)}>{v}</button>
                      </li>
                    ))}
                  </ul>

                  {category === 0 && (
                    <ul className="inputList">
                      <li>
                        <p className="key">Email</p>
                        <div className="value">
                          <div className={`inputBox`}>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder=""
                            />

                            {email && (
                              <button
                                className="delBtn"
                                onClick={() => setEmail("")}
                              >
                                <img src={I_xWhite} alt="" />
                              </button>
                            )}
                          </div>
                        </div>
                      </li>

                      {email && (
                        <li>
                          <p className="key">Email Verification Code</p>

                          <div className="value">
                            <div className={`inputBox`}>
                              <input
                                type="number"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder=""
                              />

                              <button className="getCodeBtn" onClick={() => {}}>
                                Get code
                              </button>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  )}

                  {category === 1 && (
                    <ul className="inputList">
                      <li className="phoneNumBox">
                        <p className="key">Phone Number</p>
                        <div className="value">
                          <div className="selectBox local">
                            <button
                              className="selectBtn"
                              onClick={() => setSelLocPopup(true)}
                            >
                              <p>+{phoneLoc}</p>

                              <img src={I_dnPol} alt="" />
                            </button>

                            {selLocPopup && (
                              <>
                                <SelectPhoneLocPopup
                                  setCont={setPhoneLoc}
                                  off={setSelLocPopup}
                                />
                                <PopupBg off={setSelLocPopup} />
                              </>
                            )}
                          </div>

                          <div className="inputBox">
                            <input
                              type="number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              onBlur={onBlurPhone}
                              placeholder=""
                            />
                          </div>
                        </div>
                      </li>

                      {phone && (
                        <li>
                          <p className="key">Phone Number Verification Code</p>

                          <div className="value">
                            <div className={`inputBox`}>
                              <input
                                type="number"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder=""
                              />

                              <button className="getCodeBtn" onClick={() => {}}>
                                Get code
                              </button>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                <div className="btnBox">
                  <button className="loginBtn" onClick={onClickContBtn}>
                    Continue
                  </button>
                </div>
              </div>
            </article>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </MloginBox>
      </>
    );
  else
    return (
      <>
        <PloginBox>
          <section className="innerBox">
            <div className="titleBox">
              <strong className="pgTitle">Reset Your Password</strong>
            </div>

            <article className="contArea">
              <div className="loginArc">
                <div className="contBox">
                  <ul className="categoryList">
                    {D_loginCategoryList.map((v, i) => (
                      <li key={i} className={`${category === i && "on"}`}>
                        <button onClick={() => setCategory(i)}>{v}</button>
                      </li>
                    ))}
                  </ul>

                  {category === 0 && (
                    <ul className="inputList">
                      <li>
                        <p className="key">Email</p>
                        <div className="value">
                          <div className={`inputBox`}>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder=""
                            />

                            {email && (
                              <button
                                className="delBtn"
                                onClick={() => setEmail("")}
                              >
                                <img src={I_xWhite} alt="" />
                              </button>
                            )}
                          </div>
                        </div>
                      </li>

                      {email && (
                        <li>
                          <p className="key">Email Verification Code</p>

                          <div className="value">
                            <div className={`inputBox`}>
                              <input
                                type="number"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder=""
                              />

                              <button className="getCodeBtn" onClick={() => {}}>
                                Get code
                              </button>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  )}

                  {category === 1 && (
                    <ul className="inputList">
                      <li className="phoneNumBox">
                        <p className="key">Phone Number</p>
                        <div className="value">
                          <div className="selectBox local">
                            <button
                              className="selectBtn"
                              onClick={() => setSelLocPopup(true)}
                            >
                              <p>+{phoneLoc}</p>

                              <img src={I_dnPol} alt="" />
                            </button>

                            {selLocPopup && (
                              <>
                                <SelectPhoneLocPopup
                                  setCont={setPhoneLoc}
                                  off={setSelLocPopup}
                                />
                                <PopupBg off={setSelLocPopup} />
                              </>
                            )}
                          </div>

                          <div className="inputBox">
                            <input
                              type="number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              onBlur={onBlurPhone}
                              placeholder=""
                            />
                          </div>
                        </div>
                      </li>

                      {phone && (
                        <li>
                          <p className="key">Phone Number Verification Code</p>

                          <div className="value">
                            <div className={`inputBox`}>
                              <input
                                type="number"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder=""
                              />

                              <button className="getCodeBtn" onClick={() => {}}>
                                Get code
                              </button>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                <div className="btnBox">
                  <button className="loginBtn" onClick={onClickContBtn}>
                    Continue
                  </button>
                </div>
              </div>

              <div className="qrArea">
                <div className="qrBox">
                  <QRCode
                    size={220}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={"http://users.options1.net/#/auth/login"}
                    viewBox={`0 0 220 220`}
                  />
                </div>

                <div className="textBox">
                  <strong className="title">Mobile with QR code</strong>

                  <p className="explain">
                    Scan this code and you will be taken to your mobile login.
                  </p>
                </div>
              </div>
            </article>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </PloginBox>
      </>
    );
}

const MloginBox = styled.main`
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
          .categoryList {
            display: flex;
            margin: 0 0 11.11vw 0;

            li {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 8.88vw;
              color: #ddd;

              &.on {
                color: inherit;
                border: solid transparent;
                border-width: 2px 2px 0 2px;
                background-image: linear-gradient(#fff, #fff),
                  linear-gradient(
                    180deg,
                    #000000 -12.12%,
                    rgba(0, 0, 0, 0) 131.82%
                  );
                border-radius: 2.22vw 2.22vw 0 0;
                background-origin: border-box;
                background-clip: content-box, border-box;
              }

              button {
                width: 100%;
                height: 100%;
                padding: 0 5.55vw;
              }
            }
          }

          .inputList {
            display: flex;
            flex-direction: column;
            gap: 5.55vw;
            margin: 11.11vw 0 0 0;

            li {
              display: flex;
              flex-direction: column;
              gap: 8px;
              font-size: 3.88vw;

              &.phoneNumBox {
                .value {
                  display: flex;
                  flex-direction: row;
                  gap: 2.77vw;

                  .selectBox {
                    width: 25vw;
                    border-radius: 2.22vw;
                    border: 1px solid #ddd;
                    position: relative;

                    &:focus-within {
                      border-color: #f7ab1f;
                    }

                    .selectBtn {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      width: 100%;
                      height: 100%;
                      padding: 0 4.44vw;
                      font-size: 3.88vw;
                    }
                  }

                  .inputBox {
                    flex: 1;
                  }
                }
              }

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

const PloginBox = styled.main`
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
      display: flex;
      gap: 125px;
      .loginArc {
        width: 400px;

        .contBox {
          .categoryList {
            display: flex;
            margin: 0 0 40px 0;

            li {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 34px;
              color: #ddd;

              &.on {
                color: inherit;
                border: solid transparent;
                border-width: 2px 2px 0 2px;
                background-image: linear-gradient(#fff, #fff),
                  linear-gradient(
                    180deg,
                    #000000 -12.12%,
                    rgba(0, 0, 0, 0) 131.82%
                  );
                border-radius: 8px 8px 0 0;
                background-origin: border-box;
                background-clip: content-box, border-box;
              }

              button {
                width: 100%;
                height: 100%;
                padding: 0 22px;
              }
            }
          }

          .inputList {
            display: flex;
            flex-direction: column;
            gap: 24px;
            margin: 40px 0 0 0;

            li {
              display: flex;
              flex-direction: column;
              gap: 8px;
              font-size: 14px;

              &.phoneNumBox {
                .value {
                  display: flex;
                  flex-direction: row;
                  gap: 10px;

                  .selectBox {
                    width: 90px;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    position: relative;

                    &:focus-within {
                      border-color: #f7ab1f;
                    }

                    .selectBtn {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      width: 100%;
                      height: 100%;
                      padding: 0 16px;
                      font-size: 14px;
                    }
                  }

                  .inputBox {
                    flex: 1;
                  }
                }
              }

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

                  .getCodeBtn {
                    font-size: 14px;
                    color: #f7ab1f;
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
