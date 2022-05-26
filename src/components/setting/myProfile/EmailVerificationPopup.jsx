import { useEffect, useState } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import I_spinnerYellow from "../../../img/icon/I_spinnerYellow.svg";

export default function EmailVerificationPopup({ off }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  return (
    <EmailVerificationPopupBox>
      {loading ? (
        <img className="spinner" src={I_spinnerYellow} alt="" />
      ) : (
        <>
          <p className="title">Email verification</p>

          <p className="explain">
            Please complete your email address validation in order to secure
            your account and funds on it.
          </p>

          <button className="confirmBtn" onClick={() => off()}>
            Confirm
          </button>
        </>
      )}
    </EmailVerificationPopupBox>
  );
}

const spin = keyframes`
  0%{
    transform: rotate(0deg)
  }
  100%{
    transform: rotate(360deg)
  }
`;

const EmailVerificationPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  min-height: 280px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border: 1.4px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  backdrop-filter: blur(40px);
  box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.4),
    0px 10px 40px rgba(0, 0, 0, 0.2);
  -webkit-backdrop-filter: blur(40px);
  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 6;

  .spinner {
    width: 74px;
    animation: ${spin} 1.4s infinite linear;
  }

  .title {
    font-size: 16px;
  }

  .explain {
    margin: 54px 0 0 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }

  .confirmBtn {
    width: 100%;
    height: 56px;
    margin: 44px 0 0 0;
    font-size: 18px;
    font-weight: 700;
    color: #4e3200;
    background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
    border-radius: 12px;
  }
`;
