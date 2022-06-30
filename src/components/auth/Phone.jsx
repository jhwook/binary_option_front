import { useEffect, useState } from "react";
import styled from "styled-components";
import PopupBg from "../common/PopupBg";
import I_dnPol from "../../img/icon/I_dnPol.svg";
import { useSelector } from "react-redux";
import SelectPhoneLocPopup from "./SelectPhoneLocPopup";
import axios from "axios";
import { API } from "../../configs/api";

export default function Phone({ userData, setUserData }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [selLocPopup, setSelLocPopup] = useState(false);
  const [locList, setLocList] = useState([]);

  function onBlurPhone() {
    if (userData.phone[0] === "0")
      setUserData({ ...userData, phone: userData.phone.slice(1) });
  }

  function validatePw(str) {
    const regex = /(?=.*\d)(?=.*[A-Z]).{8,}/;
    return regex.test(str);
  }

  useEffect(() => {
    axios
      .get(`${API.PHONE_COUNTRY_CODE}`)
      .then(({ data }) => {
        console.log(data);
        setLocList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (userData.pw && !validatePw(userData.pw))
      setUserData({
        ...userData,
        pwAlarm:
          "Password must be at least 8 characters with 1 upper case letter and 1 number.",
      });
    else setUserData({ ...userData, pwAlarm: "" });
  }, [userData.pw]);

  if (isMobile)
    return (
      <>
        <MphoneBox>
          <li className="phoneNumBox">
            <p className="key">Phone Number</p>
            <div className="value">
              <div className="selectBox local">
                <button
                  className="selectBtn"
                  onClick={() => setSelLocPopup(true)}
                >
                  <p>{userData?.phoneLoc}</p>

                  <img src={I_dnPol} alt="" />
                </button>

                {selLocPopup && (
                  <>
                    <SelectPhoneLocPopup
                      setCont={(v) =>
                        setUserData({
                          ...userData,
                          phoneLoc: v,
                        })
                      }
                      off={setSelLocPopup}
                    />
                    <PopupBg off={setSelLocPopup} />
                  </>
                )}
              </div>
              <div className="inputBox">
                <input
                  type="number"
                  value={userData?.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  onBlur={onBlurPhone}
                  placeholder=""
                />
              </div>
            </div>
          </li>

          <li>
            <p className="key">Password</p>
            <div className="value">
              <div className={`${userData.pwAlarm && "alarm"} inputBox`}>
                <input
                  type="password"
                  value={userData?.pw}
                  onChange={(e) =>
                    setUserData({ ...userData, pw: e.target.value })
                  }
                  placeholder=""
                />
              </div>

              {userData.pwAlarm && <p className="alarm">{userData.pwAlarm}</p>}
            </div>
          </li>
        </MphoneBox>
      </>
    );
  else
    return (
      <>
        <PphoneBox>
          <li className="phoneNumBox">
            <p className="key">Phone Number</p>
            <div className="value">
              <div className="inputCont">
                <div className="selectBox local">
                  <button
                    className="selectBtn"
                    onClick={() => setSelLocPopup(true)}
                  >
                    <p>{userData?.phoneLoc}</p>

                    <img src={I_dnPol} alt="" />
                  </button>

                  {selLocPopup && (
                    <>
                      <SelectPhoneLocPopup
                        setCont={(v) =>
                          setUserData({
                            ...userData,
                            phoneLoc: v,
                          })
                        }
                        off={setSelLocPopup}
                      />
                      <PopupBg off={setSelLocPopup} />
                    </>
                  )}
                </div>

                <div className={`${userData.phoneAlarm && "alarm"} inputBox`}>
                  <input
                    type="number"
                    value={userData?.phone}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    onBlur={onBlurPhone}
                    placeholder=""
                  />
                </div>
              </div>

              {userData.phoneAlarm && (
                <p className="alarm">{userData.phoneAlarm}</p>
              )}
            </div>
          </li>

          <li>
            <p className="key">Password</p>
            <div className="value">
              <div className={`${userData.pwAlarm && "alarm"} inputBox`}>
                <input
                  type="password"
                  value={userData?.pw}
                  onChange={(e) =>
                    setUserData({ ...userData, pw: e.target.value })
                  }
                  placeholder=""
                />
              </div>

              {userData.pwAlarm && <p className="alarm">{userData.pwAlarm}</p>}
            </div>
          </li>
        </PphoneBox>
      </>
    );
}

const MphoneBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5.55vw;

  li {
    display: flex;
    flex-direction: column;
    gap: 2.22vw;
    font-size: 3.88vw;

    &.phoneNumBox {
      .value {
        display: flex;
        flex-direction: row;
        gap: 2.77vw;

        .selectBox {
          width: 25vw;
          border-radius: 2.22vw;
          border: 1px solid #ddd;
          position: relative;

          &:focus-within {
            border-color: #f7ab1f;
          }

          .selectBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 0 4.44vw;
            font-size: 3.88vw;

            img{
              width: 2.22vw;
            }
          }
        }

        .inputBox {
          flex: 1;
        }
      }
    }

    .key {
    }

    .value {
      display: flex;
      flex-direction: column;
      gap: 2.22vw;

      .inputBox {
        display: flex;
        align-items: center;
        height: 12.22vw;
        padding: 0 4.44vw;
        border-radius: 2.22vw;
        border: 1px solid #ddd;

        &:focus-within {
          border-color: #f7ab1f;
        }

        &.alarm {
          border-color: #f00;
        }

        input {
          flex: 1;
        }

        .delBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 4.44vw;
          height: 4.44vw;
          background: #ddd;
          border-radius: 50%;

          img {
            width: 2.22vw;
          }
        }
      }

      p.alarm {
        font-size: 3.33vw;
        color: #ff5353;
      }
    }
  }
`;

const PphoneBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;

  li {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;

    &.phoneNumBox {
      .value {
        .inputCont {
          display: flex;
          flex-direction: row;
          gap: 10px;

          .selectBox {
            width: 90px;
            border-radius: 8px;
            border: 1px solid #ddd;
            position: relative;

            &:focus-within {
              border-color: #f7ab1f;
            }

            .selectBtn {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              height: 100%;
              padding: 0 16px;
              font-size: 14px;
            }
          }

          .inputBox {
            flex: 1;
          }
        }
      }
    }

    .key {
    }

    .value {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .inputBox {
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 16px;
        border-radius: 8px;
        border: 1px solid #ddd;

        &:focus-within {
          border-color: #f7ab1f;
        }

        &.alarm {
          border-color: #f00;
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

      p.alarm {
        font-size: 12px;
        color: #ff5353;
      }
    }
  }
`;
