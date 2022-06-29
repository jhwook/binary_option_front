import { useEffect, useState } from "react";
import styled from "styled-components";
import { D_joinData, D_loginCategoryList } from "../../../data/D_auth";
import Email from "../common/Email";
import Phone from "../common/Phone";
import { useNavigate } from "react-router";
import axios from "axios";
import { API } from "../../../configs/api";
import { useSelector } from "react-redux";
import B_referral from "../../../img/bg/auth/signup/B_referral.svg";

export default function Referral() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isMobile = useSelector((state) => state.common.isMobile);

  const [refCode, setRefCode] = useState("");
  const [alarm, setAlarm] = useState("");

  function onClickLoginBtn() {
    console.log("asdf");

    axios
      .patch(API.EDIT_REF, {
        refcode: refCode,
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);

        if (data.message === "REFERER-NOT-FOUND") {
          setAlarm("The password you have entered does not coincide");
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
                <strong className="title">Got a promo code?</strong>
                <p className="sub">Enter your code to redeem it.</p>
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
                Redeem
              </button>

              <button className="noCode" onClick={onClickNoCode}>
                No, there is no promo code.
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
                <strong className="title">Got a promo code?</strong>
                <p className="sub">Enter your code to redeem it.</p>
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
                Redeem
              </button>

              <button className="noCode" onClick={onClickNoCode}>
                No, there is no promo code.
              </button>
            </article>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </PreferralBox>
      </>
    );
}

const MreferralBox = styled.main`
  padding: 15.55vw 0 0 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 11.11vw;
    padding: 30.55vw 4.44vw 0;

    .titleCont {
      display: flex;
      justify-content: center;
      gap: 4.44vw;

      .titleBox {
        display: flex;
        flex-direction: column;
        gap: 1.11vw;
        margin: 0 0 3.33vw;

        .title {
          font-size: 6.11vw;
        }

        .sub {
          font-size: 3.88vw;
        }
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 5vw;

      input {
        height: 12.22vw;
        padding: 0 5.55vw;
        font-size: 3.88vw;
        border: 1.4px solid #e6e6e6;
        border-radius: 2.22vw;

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
        height: 12.22vw;
        font-size: 4.44vw;
        font-weight: 700;
        color: #f7ab1f;
        border: 2px solid #f7ab1f;
        border-radius: 2.22vw;

        &:disabled {
          border-color: #e6e6e6;
        }
      }

      .noCode {
        font-size: 3.88vw;
        color: #2a2a2a;
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

const PreferralBox = styled.main`
  display: flex;
  justify-content: center;
  padding: 70px 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 80px 0;
    width: 384px;

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
          font-size: 28px;
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
