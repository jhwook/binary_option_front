import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import axios from "axios";
import { API } from "../../../configs/api";
import { useSelector } from "react-redux";
import B_referral from "../../../img/bg/auth/signup/B_referral.svg";
import { useTranslation } from "react-i18next";
import { setToast } from "../../../util/Util";

export default function Referral() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [refCode, setRefCode] = useState("");
  const [alarm, setAlarm] = useState("");

  function onClickLoginBtn() {
    axios
      .patch(API.EDIT_REF, {
        refcode: refCode,
      })
      .then(({ data }) => {
        console.log(data);

        if (data.message === "REFERER-NOT-FOUND") {
          setToast({
            type: "alarm_black",
            cont: t("The referral ID doesn't exist."),
          });

          return;
        }

        let { tokenId } = data.result;
        if (tokenId) {
          localStorage.setItem("token", tokenId);
          navigate("/");
        }
      });
  }

  function onClickNoCode() {
    axios
      .get(API.REFRESH)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    setAlarm("");
  }, [refCode]);

  if (isMobile)
    return (
      <>
        <MreferralBox>
          <section className="innerBox">
            <div className="titleCont">
              <img src={B_referral} />

              <div className="titleBox">
                <strong className="title">{t("Got a promo code?")}</strong>
                <p className="sub">{t("Enter your code to redeem it.")}</p>
              </div>
            </div>

            <article className="contArea">
              <div className="inputBox">
                <input
                  className={`${alarm && "alarmBox"}`}
                  value={refCode}
                  onChange={(e) => {
                    setRefCode(e.target.value);
                  }}
                  placeholder="Enter the code."
                />

                <p className="alarm">{alarm}</p>
              </div>

              <button className="loginBtn" onClick={onClickLoginBtn}>
                {t("Redeem")}
              </button>

              <button className="noCode" onClick={onClickNoCode}>
                {t("No, there is no promo code.")}
              </button>
            </article>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </MreferralBox>
      </>
    );
  else
    return (
      <>
        <PreferralBox>
          <section className="innerBox">
            <div className="titleCont">
              <img src={B_referral} />

              <div className="titleBox">
                <strong className="title">{t("Got a promo code?")}</strong>
                <p className="sub">{t("Enter your code to redeem it.")}</p>
              </div>
            </div>

            <article className="contArea">
              <div className="inputBox">
                <input
                  className={`${alarm && "alarmBox"}`}
                  value={refCode}
                  onChange={(e) => {
                    setRefCode(e.target.value);
                  }}
                  placeholder={t("Enter the code.")}
                />

                <p className="alarm">{alarm}</p>
              </div>

              <button className="loginBtn" onClick={onClickLoginBtn}>
                {t("Redeem")}
              </button>

              <button className="noCode" onClick={onClickNoCode}>
                {t("No, there is no promo code.")}
              </button>
            </article>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </PreferralBox>
      </>
    );
}

const MreferralBox = styled.main`
  padding: 56px 0 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 32px 16px 0;

    .titleCont {
      display: flex;
      justify-content: center;
      gap: 16px;

      img {
        width: 60px;
      }

      .titleBox {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 4px;
        margin: 0 0 12px;

        .title {
          font-size: 22px;
        }

        .sub {
          font-size: 14px;
        }
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 18px;

      input {
        width: 100%;
        height: 50px;
        padding: 0 20px;
        font-size: 14px;
        border: 1.4px solid #e6e6e6;
        border-radius: 8px;

        &.alarmBox {
          border-color: #ff5353;
        }

        &:focus-within {
          border-color: #f7ab1f;
        }
      }

      .alarm {
        color: #ff5353;
      }

      .loginBtn {
        height: 50px;
        font-size: 16px;
        font-weight: 700;
        color: #f7ab1f;
        border: 2px solid #f7ab1f;
        border-radius: 8px;

        &:disabled {
          border-color: #e6e6e6;
        }
      }

      .noCode {
        font-size: 14px;
        color: #2a2a2a;
      }
    }
  }

  .cpRight {
    margin: 30px 0;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    color: #ddd;
  }
`;

const PreferralBox = styled.main`
  display: flex;
  justify-content: center;
  padding: 70px 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 80px 0;
    width: 400px;

    .titleCont {
      display: flex;
      flex-direction: row;
      gap: 10px;

      img {
        height: 106px;
      }

      .titleBox {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 8px;
        margin: 0 0 12px;
        color: #2a2a2a;

        .title {
          font-size: 26px;
        }

        .sub {
          font-size: 16px;
        }
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .inputBox {
        display: flex;
        flex-direction: column;
        gap: 8px;

        input {
          height: 50px;
          padding: 0 20px;
          font-size: 14px;
          border: 1.4px solid #e6e6e6;
          border-radius: 8px;

          &.alarmBox {
            border-color: #ff5353;
          }

          &:focus-within {
            border-color: #f7ab1f;
          }
        }

        .alarm {
          color: #ff5353;
        }
      }

      .loginBtn {
        height: 50px;
        font-size: 18px;
        font-weight: 700;
        color: #f7ab1f;
        border: 2px solid #f7ab1f;
        border-radius: 8px;

        &:disabled {
          border-color: #e6e6e6;
        }
      }

      .noCode {
        font-size: 16px;
        color: #2a2a2a;
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
