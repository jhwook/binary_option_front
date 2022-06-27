import { useEffect, useState } from "react";
import styled from "styled-components";
import { D_joinData, D_loginCategoryList } from "../../data/D_auth";
import Email from "./common/Email";
import { GoogleLogin } from "react-google-login";
import L_google from "../../img/logo/L_google.svg";
import Phone from "./common/Phone";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router";
import axios from "axios";
import { API } from "../../configs/api";
import { gCliId } from "../../configs/setting";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [category, setCategory] = useState(D_loginCategoryList[0]);
  const [userData, setUserData] = useState(D_joinData);

  function onClickLoginBtn() {
    let loginDataForm;

    if (category.key === "Email")
      loginDataForm = { email: userData.email, password: userData.pw };
    else if (category.key === "Phone Number")
      loginDataForm = {
        phone: userData.phone,
        countryNum: userData.phoneLoc,
        password: userData.pw,
      };

    console.log(loginDataForm);

    axios
      .post(`${API.LOGIN}/${category.value}`, loginDataForm)
      .then(({ data }) => {
        console.log(data);

        if (data.message === "TOKEN_CREATED") {
          localStorage.setItem("token", data.result.tokenId);
          navigate("/");
        } else {
          setUserData({
            ...userData,
            pwAlarm: "The password you have entered does not coincide",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function resGLogin(data) {
    axios
      .post(`${API.LOGIN}/google`, { token: data.tokenId })
      .then(({ data }) => {
        console.log(data);
        let { isFirstSocial } = data;

        localStorage.setItem("token", data.result.tokenId);

        if (isFirstSocial) navigate("/auth/signup/referral");
        else navigate("/");
      })
      .catch((err) => console.error(err));
  }

  if (isMobile)
    return (
      <>
        <MloginBox>
          <section className="innerBox">
            <div className="titleBox">
              <strong className="pgTitle">Betbit Account Login</strong>
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
                </div>

                <div className="btnBox">
                  <button className="loginBtn" onClick={onClickLoginBtn}>
                    Login
                  </button>

                  <p className="or">or</p>

                  <GoogleLogin
                    style={{ border: "5px" }}
                    clientId={gCliId}
                    onSuccess={resGLogin}
                    onFailure={(err) => console.error(err)}
                    cookiePolicy="single_host_origin"
                    render={(renderProps) => (
                      <button
                        className="googleBtn"
                        onClick={renderProps.onClick}
                      >
                        <img src={L_google} alt="" />
                        <p>Continue with Google</p>
                      </button>
                    )}
                  />
                </div>

                <div className="utilBox">
                  <button
                    className="forgetBtn"
                    onClick={() => navigate("/auth/resetpw")}
                  >
                    Forgot password?
                  </button>

                  <button
                    className="signupBtn"
                    onClick={() => navigate("/auth/signup")}
                  >
                    Register now
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
              <strong className="pgTitle">Betbit Account Login</strong>
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
                </div>

                <div className="btnCont">
                  <button className="loginBtn" onClick={onClickLoginBtn}>
                    Login
                  </button>

                  <p className="or">or</p>

                  <GoogleLogin
                    clientId={gCliId}
                    onSuccess={resGLogin}
                    onFailure={(err) => console.error(err)}
                    cookiePolicy="single_host_origin"
                    render={(renderProps) => (
                      <button
                        className="googleBtn"
                        onClick={renderProps.onClick}
                      >
                        <img src={L_google} alt="" />
                        <p>Continue with Google</p>
                      </button>
                    )}
                  />
                </div>

                <div className="utilBox">
                  <button
                    className="forgetBtn"
                    onClick={() => {
                      navigate("/auth/resetpw");
                    }}
                  >
                    Forgot password?
                  </button>

                  <button
                    className="signupBtn"
                    onClick={() => navigate("/auth/signup")}
                  >
                    Register now
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

            &.googleBtn {
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 3.88vw;
              font-weight: 700;
              border: 1px solid #e6e6e6;
            }
          }

          .or {
            font-size: 4.44vw;
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
        }

        .btnCont {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
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
              font-weight: 700;
              border: 1px solid #e6e6e6;
            }
          }

          .btnBox {
            display: flex;
            flex-direction: column;
            gap: 18px;
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
