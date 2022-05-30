import { useEffect, useState } from "react";
import styled from "styled-components";
import PopupBg from "../../components/common/PopupBg";
import VerificationPopup from "../../components/setting/myProfile/VerificationPopup";
import axios from "axios";
import { API } from "../../configs/api";

export default function MyProfile() {
  const [profData, setProfData] = useState("");
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const [pw, setPw] = useState("");
  const [changePw, setChangePw] = useState(false);
  const [pwChk, setPwChk] = useState("");
  const [pwAlarm, setPwAlarm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationPopup, setVerificationPopup] = useState(false);

  function getProfData() {
    axios
      .get(`${API.LOGIN_CHECK}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(async ({ data }) => {
        console.log(data);
        data.id && setUid(data.id);
        data.email && setEmail(data.email);
        data.phone && setPhone(data.phone);
        data.firstName && setFirstName(data.firstName);
        data.lastName && setLastName(data.lastName);

        setProfData(data);
      });
  }

  function onClickVeriEmailBtn() {
    setVerificationPopup("email");
    // axios
    //   .post(API.USER_CERTIFICATION_EMAIL, { email })
    //   .then((res) => {
    //     console.log(res);
    //     setVerificationPopup("email");
    //   })
    //   .then((err) => console.error(err));
  }

  function onClickVeriPhoneBtn() {
    setVerificationPopup("phone");
  }

  function onclickSaveBtn() {
    axios.patch(
      `${API.USER_PROFILE}`,
      { email, password: pw, firstName, lastName, phone },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  useEffect(() => {
    getProfData();

    window.addEventListener("focus", getProfData);

    return () => {
      window.removeEventListener("focus", getProfData);
    };
  }, []);

  useEffect(() => {
    if (!(pw && pwChk)) return;

    if (pw === pwChk) setPwAlarm("");
    else setPwAlarm("The password you have entered does not coincide");
  }, [pw, pwChk]);

  function onBlurPhone() {
    if (phone[0] === "0") setPhone(phone.slice(1));
  }

  return (
    <>
      <MyProfileBox>
        <section className="innerBox">
          <article className="titleArea">
            <strong className="title">My Profile</strong>
            <p className="explain">
              Please for your security, please fill out the following form
            </p>
          </article>

          <article className="contArea">
            <ul className="inputList">
              <li>
                <p className="key">UID</p>
                <div className="value">
                  <input disabled value={uid} />
                </div>
              </li>

              <li>
                <p className="key">Password*</p>
                <div className={`${pwAlarm && "alarmBox"} value`}>
                  <input
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder=""
                  />

                  <button
                    className="changeBtn"
                    onClick={() => setChangePw(true)}
                  >
                    Change
                  </button>
                </div>
              </li>
              {changePw && (
                <li>
                  <p className="key">Confirm Password*</p>
                  <div className={`${pwAlarm && "alarmBox"} value`}>
                    <input
                      type="password"
                      value={pwChk}
                      onChange={(e) => setPwChk(e.target.value)}
                      placeholder=""
                    />
                  </div>

                  {pwAlarm && <p className="alarm">{pwAlarm}</p>}
                </li>
              )}

              <li>
                <p className="key">First name*</p>
                <div className="value">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder=""
                  />
                </div>
              </li>

              <li>
                <p className="key">Last name*</p>
                <div className="value">
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder=""
                  />
                </div>
              </li>

              <li>
                <p className="key">Email*</p>
                <div className="value">
                  <input
                    type="email"
                    disabled={profData.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                  />

                  {profData.email_certification ? (
                    <p className="verified">Verified</p>
                  ) : (
                    <button
                      className={`${!emailSend && "init"} sendBtn`}
                      onClick={onClickVeriEmailBtn}
                    >
                      {emailSend ? "Resend" : "Unverified"}
                    </button>
                  )}
                </div>
              </li>

              <li>
                <p className="key">Phone</p>
                <div className="value">
                  <input
                    type="number"
                    value={phone}
                    disabled={profData.phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder=""
                    onBlur={onBlurPhone}
                  />

                  {profData.phone_certification ? (
                    <p className="verified">Verified</p>
                  ) : (
                    <button
                      className={`${!emailSend && "init"} sendBtn`}
                      onClick={onClickVeriPhoneBtn}
                    >
                      {emailSend ? "Resend" : "Unverified"}
                    </button>
                  )}
                </div>
              </li>
            </ul>

            <button
              className="saveBtn"
              disabled={!(firstName && lastName) || (changePw && !pwChk)}
              onClick={onclickSaveBtn}
            >
              Save
            </button>
          </article>
        </section>
      </MyProfileBox>

      {verificationPopup === "email" && (
        <>
          <VerificationPopup
            title="Email verification"
            explain="Please complete your email address validation in order to secure
            your account and funds on it."
            off={setVerificationPopup}
          />
          <PopupBg off={setVerificationPopup} />
        </>
      )}

      {verificationPopup === "phone" && (
        <>
          <VerificationPopup
            title="Phone Number verification"
            off={setVerificationPopup}
          />
          <PopupBg off={setVerificationPopup} />
        </>
      )}
    </>
  );
}

const MyProfileBox = styled.main`
  flex: 1;
  padding: 70px 140px;

  @media (max-width: 1440px) {
    max-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: 100%;
    overflow-y: scroll;

    .titleArea {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .title {
        font-size: 24px;
      }

      .explain {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 900px;
      padding: 34px 40px;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;

      .inputList {
        display: flex;
        flex-direction: column;
        gap: 24px;
        font-size: 16px;

        li {
          display: flex;
          flex-direction: column;
          gap: 8px;

          .key {
          }

          .value {
            display: flex;
            align-items: center;
            height: 48px;
            padding: 0 22px;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid transparent;
            border-radius: 10px;

            &:focus-within {
              border-color: #fff;

              button {
                color: #fff;
              }
            }

            &.alarmBox {
              border-color: #ff5353;
            }

            input {
              flex: 1;
              height: 100%;
            }

            .verified {
              color: #f7ab1f;
            }

            .sendBtn {
              color: rgba(255, 255, 255, 0.4);

              &.init {
                color: #ff5353;
              }
            }
          }

          .alarm {
            margin: 6px 0 0 0;
            font-size: 16px;
            color: #ff5353;
          }
        }
      }

      .saveBtn {
        width: 200px;
        height: 56px;
        font-size: 18px;
        font-weight: 700;
        color: #f7ab1f;
        background: rgba(247, 171, 31, 0.1);
        border: 1px solid #f7ab1f;
        border-radius: 12px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);

        &:disabled {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          border-color: #fff;
        }
      }
    }
  }
`;
