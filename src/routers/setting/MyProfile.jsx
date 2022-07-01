import { useEffect, useState } from "react";
import styled from "styled-components";
import PopupBg from "../../components/common/PopupBg";
import VerificationPopup from "../../components/setting/myProfile/VerificationPopup";
import axios from "axios";
import { API } from "../../configs/api";
import { useSelector } from "react-redux";
import DefaultHeader from "../../components/header/DefaultHeader";
import { setToast } from "../../util/Util";
import SelectPhoneLocPopup from "../../components/auth/SelectPhoneLocPopup";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";

export default function MyProfile({ userData }) {
  const isMobile = useSelector((state) => state.common.isMobile);

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
  const [countryNum, setCountryNum] = useState("");
  const [selLocPopup, setSelLocPopup] = useState(false);
  const [phone, setPhone] = useState("");
  const [verificationPopup, setVerificationPopup] = useState(false);

  function validatePw(str) {
    const regex = /(?=.*\d)(?=.*[A-Z]).{8,}/;
    return regex.test(str);
  }

  // function getProfData() {
  //   axios
  //     .get(`${API.AUTH}`
  //     )
  //     .then(async ({ data }) => {
  //       console.log(data);
  //       userData.id && setUid(userData.id);
  //       userData.email && setEmail(userData.email);
  //       userData.phone && setPhone(userData.phone);

  //       userData.firstname && setFirstName(userData.firstname);
  //       userData.lastname && setLastName(userData.lastname);
  //       userData.countryNum && setCountryNum(userData.countryNum);

  //       setProfData(data);
  //     });
  // }

  function onClickVeriEmailBtn() {
    setVerificationPopup("email");

    axios
      .post(API.USER_CERTIFICATION_EMAIL, { email })
      .then((res) => {
        console.log(res);
        setVerificationPopup("email");
      })
      .then((err) => console.error(err));
  }

  function onClickVeriPhoneBtn() {
    setVerificationPopup("phone");
  }

  function onclickSaveBtn() {
    let patchData = {
      email,
      firstName,
      lastName,
    };

    if (pw) patchData.password = pw;
    if (pw) patchData.phone = phone;

    console.log(patchData);

    axios.patch(`${API.USER_PROFILE}`, patchData).then(({ data }) => {
      console.log(data);

      if (data.message === "successfully updated") window.location.reload();
      else setToast({ type: "alarm", cont: data.message });
    });

    setToast({ type: "alarm", cont: "Your changes have been saved." });
  }

  // useEffect(() => {
  //   getProfData();

  //   window.addEventListener("focus", getProfData);

  //   return () => {
  //     window.removeEventListener("focus", getProfData);
  //   };
  // }, []);

  useEffect(() => {
    if (!(pw && pwChk)) return;

    if (!validatePw(pw)) {
      setPwAlarm(
        "Password must be at least 8 characters with 1 upper case letter and 1 number."
      );
      return;
    }

    if (pw !== pwChk) {
      setPwAlarm("The password you have entered does not coincide");
      return;
    }

    setPwAlarm("");
  }, [pw, pwChk]);

  function onBlurPhone() {
    if (phone[0] === "0") setPhone(phone.slice(1));
  }

  useEffect(() => {
    if (!userData) return;
    console.log(userData);

    userData.id && setUid(userData.id);
    userData.email && setEmail(userData.email);
    userData.phone && setPhone(userData.phone);
    userData.firstname && setFirstName(userData.firstname);
    userData.lastname && setLastName(userData.lastname);
    userData.countryNum && setCountryNum(userData.countryNum);
  }, [userData]);

  if (isMobile)
    return (
      <>
        <DefaultHeader title="History" />

        <MmyProfileBox>
          <section className="innerBox">
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
                      disabled={!changePw}
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

                  <div className="selectBox local">
                    <button
                      className="selectBtn"
                      onClick={() => setSelLocPopup(true)}
                    >
                      <p>{countryNum} </p>

                      <img src={I_dnPolWhite} alt="" />
                    </button>

                    {selLocPopup && (
                      <>
                        <SelectPhoneLocPopup
                          setCont={(v) => setCountryNum(v)}
                          off={setSelLocPopup}
                        />
                        <PopupBg off={setSelLocPopup} />
                      </>
                    )}
                  </div>

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
        </MmyProfileBox>

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
  else
    return (
      <>
        <PmyProfileBox>
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
                    <div className="inputBox">
                      <input disabled value={uid} />
                    </div>
                  </div>
                </li>

                <li>
                  <p className="key">Password*</p>
                  <div className="value">
                    <div className={`${pwAlarm && "alarmBox"} inputBox`}>
                      <input
                        type="password"
                        value={pw}
                        disabled={!changePw}
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
                  </div>
                </li>
                {changePw && (
                  <li>
                    <p className="key">Confirm Password*</p>
                    <div className="value">
                      <div className={`${pwAlarm && "alarmBox"} inputBox`}>
                        <input
                          type="password"
                          value={pwChk}
                          onChange={(e) => setPwChk(e.target.value)}
                          placeholder=""
                        />
                      </div>
                    </div>

                    {pwAlarm && <p className="alarm">{pwAlarm}</p>}
                  </li>
                )}

                <li>
                  <p className="key">First name*</p>
                  <div className="value">
                    <div className="inputBox">
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder=""
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <p className="key">Last name*</p>
                  <div className="value">
                    <div className="inputBox">
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder=""
                      />
                    </div>
                  </div>
                </li>

                <li>
                  <p className="key">Email*</p>
                  <div className="value">
                    <div className="inputBox">
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
                  </div>
                </li>

                <li>
                  <p className="key">Phone</p>
                  <div className="value">
                    <div className="selectBox local">
                      <button
                        className="selectBtn"
                        onClick={() => setSelLocPopup(true)}
                      >
                        <p>{countryNum}</p>

                        <img src={I_dnPolWhite} alt="" />
                      </button>

                      {selLocPopup && (
                        <>
                          <SelectPhoneLocPopup
                            setCont={(v) => setCountryNum(v)}
                            off={setSelLocPopup}
                          />
                          <PopupBg off={setSelLocPopup} />
                        </>
                      )}
                    </div>

                    <div className="inputBox">
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
        </PmyProfileBox>

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

const MmyProfileBox = styled.main`
  height: 100%;
  overflow: hidden;

  .innerBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 5.55vw;
    overflow-y: scroll;

    .contArea {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16.66vw;
      padding: 6.66vw 5.55vw;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 5.55vw;

      .inputList {
        display: flex;
        flex-direction: column;
        gap: 5.55vw;
        font-size: 4.44vw;

        li {
          display: flex;
          flex-direction: column;
          gap: 2.22vw;

          .key {
          }

          .selectBox {
            display: flex;
            align-items: center;
            height: 12.22vw;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid transparent;
            border-radius: 2.77vw;
            position: relative;

            .selectBtn {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              height: 100%;
              padding: 0 5vw;

              img {
                width: 4vw;
              }
            }

            .selectPopup {
              background: rgba(0, 0, 0, 0.4);
              backdrop-filter: blur(40px);
              -webkit-backdrop-filter: blur(40px);
              left: 0;
              top: unset;
              bottom: 14.44vw;
              border: 2px solid rgba(255, 255, 255, 0.1);
            }
          }

          .value {
            display: flex;
            align-items: center;
            height: 12.22vw;
            padding: 0 5vw;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid transparent;
            border-radius: 2.77vw;

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
            margin: 2.77vw 0 0 0;
            font-size: 3.88vw;
            color: #ff5353;
          }
        }
      }

      .saveBtn {
        width: 100%;
        height: 13.88vw;
        font-size: 5vw;
        font-weight: 700;
        color: #f7ab1f;
        background: rgba(247, 171, 31, 0.1);
        border: 1px solid #f7ab1f;
        border-radius: 3.33vw;
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

const PmyProfileBox = styled.main`
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
            gap: 8px;

            .selectBox {
              display: flex;
              align-items: center;
              width: 90px;
              height: 48px;
              border: 1px solid transparent;
              background: rgba(0, 0, 0, 0.4);
              border-radius: 10px;
              position: relative;

              .selectBtn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 100%;
                padding: 0 16px;
                font-size: 14px;
              }

              .selectPopup {
                background: rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(40px);
                -webkit-backdrop-filter: blur(40px);
                left: 0;
                border: 2px solid rgba(255, 255, 255, 0.1);
              }
            }

            .inputBox {
              flex: 1;
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
