import styled from "styled-components";
import { useNavigate } from "react-router";
import GoogleLogin from "react-google-login";
import L_google from "../../img/logo/L_google.svg";
import B_auth from "../../img/bg/auth/B_auth.svg";
import { gCliId } from "../../configs/setting";
import axios from "axios";
import { API } from "../../configs/api";
import { useSelector } from "react-redux";

export default function Index() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

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
        <MindexBox>
          <section className="innerBox">
            <article className="bgArea">
              <img src={B_auth} alt="" />
            </article>

            <article className="contArea">
              <div className="titleBox">
                <strong className="pgTitle">Welcome to Betbit</strong>
              </div>

              <div className="btnBox">
                <button
                  className="signUpBtn"
                  onClick={() => navigate("/auth/signup")}
                >
                  Sign up with phone or email
                </button>

                <p className="or">or</p>

                <GoogleLogin
                  clientId={gCliId}
                  onSuccess={resGLogin}
                  onFailure={(err) => console.error(err)}
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
            </article>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </MindexBox>
      </>
    );
  else
    return (
      <>
        <PindexBox>
          <section className="innerBox">
            <article className="contArea">
              <div className="titleBox">
                <strong className="pgTitle">Welcome to Betbit</strong>
                <p className="explain">
                  By creating an account you agree to our Terms and Conditions
                  and Data Protection Guidelines.
                </p>
              </div>

              <div className="btnBox">
                <button
                  className="signUpBtn"
                  onClick={() => navigate("/auth/signup")}
                >
                  Sign up with phone or eamail
                </button>

                <p className="or">or</p>

                <GoogleLogin
                  clientId={gCliId}
                  onSuccess={resGLogin}
                  onFailure={(err) => console.error(err)}
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
            </article>

            <article className="bgArea">
              <img src={B_auth} alt="" />
            </article>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </PindexBox>
      </>
    );
}

const MindexBox = styled.main`
  display: flex;
  justify-content: center;
  padding: 15.55vw 0 0 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6.66vw;
    width: 100%;
    padding: 12.22vw 4.44vw 0;

    .bgArea {
      img {
        width: 50vw;
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      width: 100%;

      .titleBox {
        display: flex;
        flex-direction: column;
        gap: 2.77vw;

        .pgTitle {
          font-size: 6.66vw;
        }
      }

      .btnBox {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;
        margin: 6.66vw 0 0 0;

        .signUpBtn,
        .googleBtn {
          height: 13.88vw;
          font-size: 4.44vw;
          font-weight: 700;
          border-radius: 2.22vw;

          &.signUpBtn {
            color: #fff;
            background: #000;
          }

          &.googleBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 3.88vw;
            border: 1px solid #e6e6e6;
          }
        }

        .or {
          font-size: 4.44vw;
          text-align: center;
        }
      }

      .utilBox {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2.77vw;
        margin: 3.88vw 0 0 0;
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

const PindexBox = styled.main`
  display: flex;
  justify-content: center;
  padding: 70px 0;

  .innerBox {
    display: flex;
    gap: 118px;
    padding: 90px 0;

    .contArea {
      width: 440px;

      .titleBox {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .pgTitle {
          font-size: 28px;
        }
      }

      .btnBox {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin: 40px 0 0 0;

        .signUpBtn,
        .googleBtn {
          height: 60px;
          font-size: 18px;
          font-weight: 700;
          border-radius: 8px;

          &.signUpBtn {
            color: #fff;
            background: #000;
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
          text-align: center;
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

    .bgArea {
      img {
        width: 394px;
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
