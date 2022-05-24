import { useState } from "react";
import styled from "styled-components";
import I_dnPol from "../../../img/icon/I_dnPol.svg";

export default function Phone({ userData, setUserData }) {
  return (
    <>
      <PhoneBox>
        <li className="phoneNumBox">
          <p className="key">Phone Number</p>
          <div className="value">
            <div className="selectBox local">
              <button className="selectBtn" onClick={() => {}}>
                <p>+{userData?.phoneLoc}</p>

                <img src={I_dnPol} alt="" />
              </button>
            </div>
            <div className="inputBox">
              <input
                type="number"
                value={userData?.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                placeholder=""
              />
            </div>
          </div>
        </li>

        <li>
          <p className="key">Password</p>
          <div className="value">
            <div className="inputBox">
              <input
                type="password"
                value={userData?.pw}
                onChange={(e) =>
                  setUserData({ ...userData, pw: e.target.value })
                }
                placeholder=""
              />
            </div>
          </div>
        </li>
      </PhoneBox>
    </>
  );
}

const PhoneBox = styled.ul`
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
        display: flex;
        gap: 10px;

        .selectBox {
          width: 90px;
          border-radius: 8px;
          border: 1px solid #ddd;

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
      }
    }

    .key {
    }

    .value {
      display: flex;

      .inputBox {
        flex: 1;
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 16px;
        border-radius: 8px;
        border: 1px solid #ddd;

        &:focus-within {
          border-color: #f7ab1f;
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
