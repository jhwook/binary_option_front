import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_x from "../../img/icon/I_x.svg";
import I_langGray from "../../img/icon/I_langGray.svg";
import L_yellow from "../../img/logo/L_yellow.svg";
import PopupBg from "../common/PopupBg";
import SelLngPopup from "./SelLngPopup";
import { useState } from "react";

export default function AuthPopup({ off }) {
  const navigate = useNavigate();

  const [lngPopup, setLngPopup] = useState(false);

  function onclickNavBtn(url) {
    navigate(url);
    off();
  }

  return (
    <>
      <AuthPopupBox>
        <article className="topArea">
          <button className="logoBtn" onClick={() => navigate("/")}>
            <img src={L_yellow} alt="" />
          </button>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="btnBox">
            <button
              className="loginBtn"
              onClick={() => onclickNavBtn("/auth")}
            >
              Login
            </button>

            <button
              className="registerBtn"
              onClick={() => onclickNavBtn("/auth/signup")}
            >
              Register
            </button>
          </div>

          <span className="lngBox">
            <button className="lngBtn" onClick={() => setLngPopup(true)}>
              <img src={I_langGray} alt="" />
            </button>
          </span>
        </article>
      </AuthPopupBox>

      {lngPopup && (
        <>
          <SelLngPopup white off={setLngPopup} />
          <PopupBg off={setLngPopup} />
        </>
      )}
    </>
  );
}

const AuthPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  background: #fff;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 6;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15.55vw;
    padding: 0 5.55vw;

    .logoBtn {
      display: flex;
      align-items: center;

      img {
        height: 5vw;
      }
    }

    .exitBtn {
      img {
        width: 5vw;
      }
    }
  }

  .contArea {
    flex: 1;
    padding: 11.11vw 4.44vw 0;

    .btnBox {
      display: flex;
      flex-direction: column;
      gap: 3.33vw;

      button {
        height: 13.88vw;
        font-size: 4.44vw;
        font-weight: 700;
        border-radius: 2.22vw;

        &.loginBtn {
          color: #f7ab1f;
          border: 1px solid #f7ab1f;
        }

        &.registerBtn {
          color: #4e3200;
          background: linear-gradient(98.13deg, #604719 -9.29%, #f7ab1f 45.07%);
        }
      }
    }

    .lngBox {
      bottom: 5.55vw;
      right: 5.55vw;
      position: fixed;

      .lngBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10vw;
        aspect-ratio: 1;
        background: #e6e6e6;
        border-radius: 50%;

        img {
          width: 5.55vw;
        }
      }
    }
  }
`;
