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
import L_coins from "../../img/logo/L_coins.svg";

export default function Login() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [category, setCategory] = useState(D_loginCategoryList[0]);
  const [userData, setUserData] = useState(D_joinData);
  const [refCode, setRefCode] = useState("")

  function onClickLoginBtn() {
    console.log('asdf')
    const token = localStorage.getItem("token");
   axios.patch(API.EDIT_REF,{refcode: refCode, 
    headers: {
      Authorization: `${token}`,
    },})
    .then(({data})=>{
      console.log(data)
      let {tokenId} = data.result;
      if(tokenId){
        localStorage.setItem("token", tokenId);
        navigate("/");
      }
    })
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
              <img className="titleLogo" src={L_coins}/>
              <div className="pgTitle">
                <strong className="main">Got a promo code?</strong>
                <p className="sub">Enter your code to redeem it.</p>
              </div>
            </div>

            <article className="contArea">
              <div className="loginArc">
              <li>
                <div className="value">
                  <div className={`inputBox`}>
                    <input
                      value={refCode}
                      onChange={(e) =>{setRefCode(e.target.value)}
                      }
                      placeholder="Enter the code."
                    />
                  </div>
                </div>
              </li>
                <div className="btnCont">
                  <button className="loginBtn" onClick={onClickLoginBtn}>
                    Redeem
                  </button>
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
      flex-direction: row;
      gap: 10px;

      .pgTitle {
        flex-direction: column;
        margin-left: 20px;
        height: 100%;
        justify-content: center;
        align-items: center;
        .main{
          margin-top: 30px;
          font-family: 'Oxygen';
          font-style: normal;
          font-weight: 700;
          font-size: 28px;
          line-height: 35px;
          display: flex;
          align-items: center;
        }
        .sub{
          font-family: 'Oxygen';
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          display: flex;
          align-items: center;
        }
      }
      .titleLogo{
        width: 70px;
      }
    }

    .contArea {
      display: flex;
      gap: 125px;
      .loginArc {
        width: 400px;
        li{
          .value{
            gap: 10px;
            .inputBox {
              display: flex;
              align-items: center;
              height: 48px;
              padding: 0 16px;
              border-radius: 8px;
              border: 1px solid #ddd;

              &:focus-within {
                border-color: #f7ab1f;
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
          }
        }

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
          margin: 20px 0 0 0;

          button {
            width: 100%;
            height: 50px;
            font-size: 18px;
            border-radius: 8px;

            &.loginBtn {
              font-weight: 700;
              color: #F7AB1F;
              border: 2px solid #F7AB1F;
              border-radius: 8px;
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
