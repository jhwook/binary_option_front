import { useState } from "react";
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

export default function Login() {
  const navigate = useNavigate();

  const [category, setCategory] = useState(0);
  const [userData, setUserData] = useState(D_joinData);

  function onClickLoginBtn() {
    let signDataForm;

    if (category)
      signDataForm = {
        phone: `${userData.phoneLoc}${userData.phone}`,
        password: userData.pw,
      };
    else signDataForm = { email: userData.email, password: userData.pw };

    console.log(signDataForm);

    axios
      .post(`${API.LOGIN}`, signDataForm)
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("token", data.accessToken);
      })
      .catch((err) => console.error(err));
  }

  function responseGoogle(e) {
    console.log(e);
  }

  return (
    <>
      <LoginBox>
        <section className="innerBox">
          <div className="titleBox">
            <strong className="pgTitle">Betbit Account Login</strong>
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
                  <Email userData={userData} setUserData={setUserData} />
                )}
                {category === 1 && (
                  <Phone userData={userData} setUserData={setUserData} />
                )}
              </div>

              <div className="btnBox">
                <button className="loginBtn" onClick={onClickLoginBtn}>
                  Login
                </button>

                <p className="or">or</p>

                <GoogleLogin
                  clientId="511516218336-9gbsps8s7q5kqvr4jrno5e9nemp5a14t.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy="single_host_origin"
                  render={(renderProps) => (
                    <button className="googleBtn" onClick={renderProps.onClick}>
                      <img src={L_google} alt="" />
                      <p>Continue with Google</p>
                    </button>
                  )}
                />
              </div>

              <div className="utilBox">
                <button className="forgetBtn" onClick={() => {}}>
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
      </LoginBox>
    </>
  );
}

const LoginBox = styled.main`
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
`;
