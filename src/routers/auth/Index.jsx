import styled from "styled-components";
import { useNavigate } from "react-router";
import GoogleLogin from "react-google-login";
import L_google from "../../img/logo/L_google.svg";
import B_auth from "../../img/bg/B_auth.png";

export default function Index() {
  const navigate = useNavigate();

  function responseGoogle(e) {
    console.log(e);
  }

  return (
    <>
      <IndexBox>
        <section className="innerBox">
          <article className="contArea">
            <div className="titleBox">
              <strong className="pgTitle">Welcome to Betbit</strong>
              <p className="explain">
                By creating an account you agree to our Terms and Conditions and
                Data Protection Guidelines.
              </p>
            </div>

            <div className="btnBox">
              <button
                className="signUpBtn"
                onClick={() => navigate("/auth/signup")}
              >
                Sign up with phone or amail
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
      </IndexBox>
    </>
  );
}

const IndexBox = styled.main`
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
`;
