import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function Email({ userData, setUserData }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  function validateEmail(str) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(str);
  }

  function validatePw(str) {
    const regex = /(?=.*\d)(?=.*[A-Z]).{8,}/;
    return regex.test(str);
  }

  useEffect(() => {
    if (userData.email && !validateEmail(userData.email))
      setUserData({
        ...userData,
        emailAlarm: "Please enter a correct email address.",
      });
    else setUserData({ ...userData, emailAlarm: "" });
  }, [userData.email]);

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
        <MemailBox>
          <li>
            <p className="key">Email</p>
            <div className="value">
              <div className={`${userData.emailAlarm && "alarm"} inputBox`}>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                  placeholder=""
                />

                {userData.email && (
                  <button
                    className="delBtn"
                    onClick={() => setUserData({ ...userData, email: "" })}
                  >
                    <img src={I_xWhite} alt="" />
                  </button>
                )}
              </div>

              {userData.emailAlarm && (
                <p className="alarm">{userData.emailAlarm}</p>
              )}
            </div>
          </li>

          <li>
            <p className="key">Password</p>
            <div className="value">
              <div className={`${userData.pwAlarm && "alarm"} inputBox`}>
                <input
                  type="password"
                  value={userData.pw}
                  onChange={(e) =>
                    setUserData({ ...userData, pw: e.target.value })
                  }
                  placeholder=""
                />
              </div>

              {userData.pwAlarm && <p className="alarm">{userData.pwAlarm}</p>}
            </div>
          </li>
        </MemailBox>
      </>
    );
  else
    return (
      <>
        <PemailBox>
          <li>
            <p className="key">Email</p>
            <div className="value">
              <div className={`${userData.emailAlarm && "alarm"} inputBox`}>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                  placeholder=""
                />

                {userData.email && (
                  <button
                    className="delBtn"
                    onClick={() => setUserData({ ...userData, email: "" })}
                  >
                    <img src={I_xWhite} alt="" />
                  </button>
                )}
              </div>

              {userData.emailAlarm && (
                <p className="alarm">{userData.emailAlarm}</p>
              )}
            </div>
          </li>

          <li>
            <p className="key">Password</p>
            <div className="value">
              <div className={`${userData.pwAlarm && "alarm"} inputBox`}>
                <input
                  type="password"
                  value={userData.pw}
                  onChange={(e) =>
                    setUserData({ ...userData, pw: e.target.value })
                  }
                  placeholder=""
                />
              </div>

              {userData.pwAlarm && <p className="alarm">{userData.pwAlarm}</p>}
            </div>
          </li>
        </PemailBox>
      </>
    );
}

const MemailBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5.55vw;

  li {
    display: flex;
    flex-direction: column;
    gap: 2.22vw;
    font-size: 3.88vw;

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

const PemailBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;

  li {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;

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
