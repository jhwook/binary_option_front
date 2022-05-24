import { useEffect } from "react";
import styled from "styled-components";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function Email({ userData, setUserData }) {
  function validateEmail(str) {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(str);
  }

  useEffect(() => {
    if (userData.email && !validateEmail(userData.email))
      setUserData({ ...userData, emailAlarm: true });
    else setUserData({ ...userData, emailAlarm: false });
  }, [userData.email]);

  return (
    <>
      <EmailBox>
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
          </div>
        </li>

        <li>
          <p className="key">Password</p>
          <div className="value">
            <div className="inputBox">
              <input
                type="password"
                value={userData.pw}
                onChange={(e) =>
                  setUserData({ ...userData, pw: e.target.value })
                }
                placeholder=""
              />
            </div>
          </div>
        </li>
      </EmailBox>
    </>
  );
}

const EmailBox = styled.ul`
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
    }
  }
`;
