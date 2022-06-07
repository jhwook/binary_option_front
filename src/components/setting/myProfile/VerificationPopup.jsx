import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { keyframes } from "styled-components";
import I_spinnerYellow from "../../../img/icon/I_spinnerYellow.svg";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function VerificationPopup({ title, explain, off }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (isMobile)
    return (
      <MverificationPopupBox className="defaultPopup">
        {loading ? (
          <img className="spinner" src={I_spinnerYellow} alt="" />
        ) : (
          <>
            <article className="topArea">
              <span className="blank" />

              <p className="title">{title}</p>

              <button className="exitBtn" onClick={() => off()}>
                <img src={I_xWhite} alt="" />
              </button>
            </article>

            <article className="contArea">
              <p className="explain">{explain}</p>

              <button className="confirmBtn" onClick={() => off()}>
                Confirm
              </button>
            </article>
          </>
        )}
      </MverificationPopupBox>
    );
  else
    return (
      <PverificationPopupBox className="defaultPopup">
        {loading ? (
          <img className="spinner" src={I_spinnerYellow} alt="" />
        ) : (
          <>
            <p className="title">{title}</p>

            <p className="explain">{explain}</p>

            <button className="confirmBtn" onClick={() => off()}>
              Confirm
            </button>
          </>
        )}
      </PverificationPopupBox>
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

const MverificationPopupBox = styled.section`
  width: 91.11vw;
  color: #fff;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 16.66vw;
    padding: 0 8.33vw;

    .title {
      font-size: 4.44vw;
    }

    .blank,
    .exitBtn img {
      width: 4.44vw;
      opacity: 0.4;
    }
  }

  .spinner {
    width: 74px;
    animation: ${spin} 1.4s infinite linear;
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 5.55vw;
    padding: 2.77vw 6.66vw 8.33vw;

    .explain {
      font-size: 3.88vw;
      color: rgba(255, 255, 255, 0.4);
      text-align: center;
    }

    .confirmBtn {
      width: 100%;
      height: 13.88vw;
      font-size: 5vw;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 2.22vw;
    }
  }
`;

const PverificationPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  min-height: 280px;
  padding: 30px;

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
