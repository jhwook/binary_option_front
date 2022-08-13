import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { keyframes } from "styled-components";
import I_spinnerYellow from "../../../img/icon/I_spinnerYellow.svg";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function VerificationPopup({ title, explain, off }) {
  const { t } = useTranslation();
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
                {t("Confirm")}
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
              {t("Confirm")}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 91.11vw;
  min-height: 220px;
  color: #fff;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 30px;

    .title {
      font-size: 16px;
    }

    .blank,
    .exitBtn img {
      width: 16px;
      opacity: 0.4;
    }
  }

  .spinner {
    display: block;
    width: 74px;
    animation: ${spin} 1.4s infinite linear;
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px 24px 30px;

    .explain {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.4);
      text-align: center;
    }

    .confirmBtn {
      width: 100%;
      height: 50px;
      font-size: 18px;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 8px;
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
