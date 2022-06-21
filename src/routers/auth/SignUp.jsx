import { useState } from "react";
import styled from "styled-components";
import { D_joinData, D_loginCategoryList } from "../../data/D_auth";
import Email from "./common/Email";
import I_dnPol from "../../img/icon/I_dnPol.svg";
import I_chkOrange from "../../img/icon/I_chkOrange.svg";
import Phone from "./common/Phone";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router";
import axios from "axios";
import { API } from "../../configs/api";
import { useSelector } from "react-redux";

export default function Signup() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [category, setCategory] = useState(D_loginCategoryList[0]);
  const [chkTerm, setChkTerm] = useState(false);
  const [userData, setUserData] = useState(D_joinData);

  function onClickSignup() {
    let signDataForm;

    if (category.key === "Email")
      signDataForm = {
        email: userData.email,
        password: userData.pw,
        refcode: userData.referral,
      };
    else if (category.key === "Phone Number")
      signDataForm = {
        phone: userData.phone,
        countryNum: userData.phoneLoc,
        password: userData.pw,
        refcode: userData.referral,
      };

    console.log(signDataForm);

    axios
      .post(`${API.SIGNUP}/${category.value}`, signDataForm)
      .then(({ data }) => {
        console.log(data);

        if (data.message === "TOKEN_CREATED") {
          localStorage.setItem("token", data.result.tokenId);
          navigate("/");
        }

        else if(data.message ==="INVALID-CODE")
        {
          setUserData({...userData, referralAlarm:""})
        }
      })
      .catch((err) => console.error(err));
  }

  if (isMobile)
    return (
      <>
        <MsignupBox>
          <section className="innerBox">
            <div className="titleBox">
              <strong className="pgTitle">Create Betbit Account</strong>
            </div>

            <article className="contArea">
              <div className="loginArc">
                <div className="contBox">
                  <ul className="categoryList">
                    {D_loginCategoryList.map((v, i) => (
                      <li
                        key={i}
                        className={`${category.key === v.key && "The referral code you have entered does not coincide"}`}
                      >
                        <button onClick={() => setCategory(v)}>{v.key}</button>
                      </li>
                    ))}
                  </ul>

                  {category.key === "Email" && (
                    <Email userData={userData} setUserData={setUserData} />
                  )}

                  {category.key === "Phone Number" && (
                    <Phone userData={userData} setUserData={setUserData} />
                  )}

                  <details className="referralDet">
                    <summary>
                      <p>Referral ID (Optional)</p>
                      <img src={I_dnPol} alt="" />
                    </summary>

                    <div className="inputCont">
                      <div
                        className={`${
                          userData.referralAlarm && "alarm"
                        } inputBox`}
                      >
                        <input
                          value={userData.referral}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              referral: e.target.value,
                            })
                          }
                          placeholder=""
                        />
                      </div>

                      {userData.referralAlarm && (
                        <p className="alarm">{userData.referralAlarm}</p>
                      )}
                    </div>
                  </details>
                </div>

                <div className="btnBox">
                  <div className="termBox">
                    <button
                      className={`${chkTerm && "on"} chkBtn`}
                      onClick={() => setChkTerm(!chkTerm)}
                    >
                      <img src={I_chkOrange} alt="" />
                    </button>

                    <span className="agreeBox">
                      <p className="agree">I have read and agree to Betbit’s</p>
                      <button className="termBtn" onClick={() => {}}>
                        Terms of Service
                      </button>
                    </span>
                  </div>

                  <button
                    className="nextBtn"
                    disabled={
                      !chkTerm ||
                      !(userData.email || userData.phone) ||
                      !userData.pw ||
                      userData.emailAlarm ||
                      userData.pwAlarm
                    }
                    onClick={onClickSignup}
                  >
                    Next
                  </button>
                </div>

                <div className="utilBox">
                  <span className="loginBox">
                    <p className="login">Already registered?</p>&nbsp;
                    <button
                      className="loginBtn"
                      onClick={() => navigate("/auth/login")}
                    >
                      LogIn
                    </button>
                  </span>
                </div>
              </div>
            </article>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </MsignupBox>
      </>
    );
  else
    return (
      <>
        <PsignupBox>
          <section className="innerBox">
            <div className="titleBox">
              <strong className="pgTitle">Create Betbit Account</strong>
              <p className="explain">Register with your email or mobile</p>
            </div>

            <article className="contArea">
              <div className="loginArc">
                <div className="contBox">
                  <ul className="categoryList">
                    {D_loginCategoryList.map((v, i) => (
                      <li
                        key={i}
                        className={`${category.key === v.key && "on"}`}
                      >
                        <button onClick={() => setCategory(v)}>{v.key}</button>
                      </li>
                    ))}
                  </ul>

                  {category.key === "Email" && (
                    <Email userData={userData} setUserData={setUserData} />
                  )}

                  {category.key === "Phone Number" && (
                    <Phone userData={userData} setUserData={setUserData} />
                  )}

                  <details className="referralDet">
                    <summary>
                      <p>Referral ID (Optional)</p>
                      <img src={I_dnPol} alt="" />
                    </summary>

                    <div className="inputCont">
                      <div
                        className={`${
                          userData.referralAlarm && "alarm"
                        } inputBox`}
                      >
                        <input
                          value={userData.referral}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              referral: e.target.value,
                            })
                          }
                          placeholder=""
                        />
                      </div>

                      {userData.referralAlarm && (
                        <p className="alarm">{userData.referralAlarm}</p>
                      )}
                    </div>
                  </details>
                </div>

                <div className="btnBox">
                  <div className="termBox">
                    <button
                      className={`${chkTerm && "on"} chkBtn`}
                      onClick={() => setChkTerm(!chkTerm)}
                    >
                      <img src={I_chkOrange} alt="" />
                    </button>

                    <span className="agreeBox">
                      <p className="agree">I have read and agree to Betbit’s</p>
                      &nbsp;
                      <button className="termBtn" onClick={() => {}}>
                        Terms of Service
                      </button>
                    </span>
                  </div>

                  <button
                    className="nextBtn"
                    disabled={
                      !chkTerm ||
                      !(userData.email || userData.phone) ||
                      !userData.pw ||
                      userData.emailAlarm ||
                      userData.pwAlarm
                    }
                    onClick={onClickSignup}
                  >
                    Next
                  </button>
                </div>

                <div className="utilBox">
                  <span className="loginBox">
                    <p className="login">Already registered?</p>&nbsp;
                    <button
                      className="loginBtn"
                      onClick={() => navigate("/auth/login")}
                    >
                      LogIn
                    </button>
                  </span>
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
        </PsignupBox>
      </>
    );
}

const MsignupBox = styled.main`
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

          .referralDet {
            margin: 5.55vw 0 0 0;

            &[open] {
              summary {
                img {
                  transform: rotate(180deg);
                }
              }
            }

            summary {
              display: flex;
              align-items: center;
              gap: 1.66vw;
              font-size: 3.88vw;

              img {
                width: 2.22vw;
              }
            }

            .inputCont {
              display: flex;
              flex-direction: column;
              gap: 2.22vw;
              margin: 2.22vw 0 0 0;

              .inputBox {
                display: flex;
                align-items: center;
                height: 12.22vw;
                padding: 0 4.44vw;
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
              }

              p.alarm {
                font-size: 3.33vw;
                color: #ff5353;
              }
            }
          }
        }

        .btnBox {
          display: flex;
          flex-direction: column;
          gap: 3.88vw;
          margin: 11.11vw 0 0 0;

          .termBox {
            display: flex;
            align-items: flex-start;
            gap: 2.77vw;

            .chkBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 5.55vw;
              height: 5.55vw;
              border-radius: 1.11vw;
              box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.3);

              &.on {
                img {
                  display: block;
                }
              }

              img {
                display: none;
                width: 3.88vw;
              }
            }

            .agreeBox {
              font-size: 3.88vw;

              .termBtn {
                color: #f7ab1f;
              }
            }
          }

          .nextBtn {
            height: 13.88vw;
            font-size: 4.44vw;
            font-weight: 700;
            color: #fff;
            background: #2a2a2a;
            border-radius: 2.22vw;
          }
        }

        .utilBox {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2.77vw;
          margin: 5.55vw 0 0 0;
          font-size: 3.88vw;

          .loginBox {
            display: flex;
            align-items: center;
          }

          button {
            font-size: 3.88vw;
            color: #f7ab1f;
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

const PsignupBox = styled.main`
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

          .referralDet {
            margin: 24px 0 0 0;

            &[open] {
              summary {
                img {
                  transform: rotate(180deg);
                }
              }
            }

            summary {
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 14px;

              img {
                width: 8px;
              }
            }

            .inputCont {
              display: flex;
              flex-direction: column;
              gap: 10px;
              margin: 8px 0 0 0;

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
              }

              p.alarm {
                font-size: 12px;
                color: #ff5353;
              }
            }
          }
        }

        .btnBox {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 40px 0 0 0;

          .termBox {
            display: flex;
            align-items: center;
            gap: 8px;

            .chkBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 20px;
              height: 20px;
              border-radius: 4px;
              box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.3);

              &.on {
                img {
                  display: block;
                }
              }

              img {
                display: none;
                width: 14px;
              }
            }

            .agreeBox {
              display: flex;
              align-items: center;
              font-size: 14px;

              .termBtn {
                color: #f7ab1f;
              }
            }
          }

          .nextBtn {
            height: 56px;
            font-size: 18px;
            font-weight: 700;
            color: #fff;
            background: #2a2a2a;
            border-radius: 8px;
          }
        }

        .utilBox {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          margin: 24px 0 0 0;
          font-size: 14px;

          .loginBox {
            display: flex;
            align-items: center;
          }

          button {
            font-size: 14px;
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
