import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { API } from "../../configs/api";
import B_withDrawal from "../../img/bg/market/withDrawal/B_withDrawal.svg";
import B_withDrawal2 from "../../img/bg/market/withDrawal/B_withDrawal2.svg";
import SetErrorBar from "../../util/SetErrorBar";
import I_Arw from "../../img/icon/I_XSArw.svg";
import T_usdt from "../../img/token/T_usdt.png";
import T_usdc from "../../img/token/T_usdc.png";
import TokenSelectPopup from "../../components/common/TokenSelectPopup";
import { setToast } from "../../util/Util";

export default function WithDrawal() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [tokenType, setTokenType] = useState("USDC");
  const [tokenPopup, setTokenPopup] = useState(false);
  const [token, setToken] = useState({ icon: T_usdt, text: "USDT" });
  const [settings, setSettings] = useState({
    commision: 0,
    minWithdraw: 5,
    maxTransactions: -1,
  });

  async function onClickDrawalBtn() {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .patch(`${API.TRANS_WITHDRAW}/${amount}`, {
          rxaddr: address,
          tokentype: tokenType,
          headers: {
            Authorization: `${token}`,
          },
        })
        .then(async ({ data }) => {
          console.log(data);
          console.log(data.payload);
          console.log(data.payload.resp);
          if (data.payload.resp.status == "OK") {
            window.location.reload();
            if (data.payload.resp.message) {
              //Transaction Success
              setToast({ type: "alarm", cont: "Submission Successful" });
              setTimeout(()=>{window.location.reload(false);}, 3000)
            }
          }
        });
      //.catch((err) => localStorage.removeItem("token"));
    }
  }

  return (
    <WithDrawalBox>
      <article className="contArea">
        <div className="key">
          <span className="count">1</span>

          <strong className="title">Withdraw</strong>
        </div>

        <div className="value">
          <div className="tokenBoxre">
            <p className="key">Asset</p>

            <div
              className="valueBox"
              onClick={() => setTokenPopup(!tokenPopup)}
            >
              <div className="selectedToken">
                <img className="token" src={token.icon} alt="" />
                <strong className="unit">{token.text}</strong>
              </div>
              <img className="Arw" src={I_Arw} />
            </div>
            {tokenPopup && (
              <TokenSelectPopup
                off={setTokenPopup}
                list={[
                  { icon: T_usdt, text: "USDT" },
                  { icon: T_usdc, text: "USDC" },
                ]}
                setCont={setToken}
              />
            )}
          </div>

          <ul className="inputList">
            <li>
              <p className="key">Amount</p>

              <div className="valueBox">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder=""
                />
                <strong className="unit">USDT</strong>
              </div>
            </li>

            <li>
              <p className="key">Withdrawal address</p>

              <div className="valueBox">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder=""
                />
              </div>
            </li>
          </ul>

          <ul className="infoList">
            <li>
              <p className="key">Commission</p>
              <p className="value">{settings.commision}%</p>
            </li>
            <li>
              <p className="key">Minimum withdraw amount</p>
              <p className="value">{settings.minWithdraw} USDT</p>
            </li>
            <li>
              <p className="key">Max amount per transaction</p>
              <p className="value">
                {settings.maxTransactions == -1
                  ? "no limits"
                  : settings.maxTransactions}
              </p>
            </li>
          </ul>

          <button
            className="drawalBtn"
            disabled={!(amount && address)}
            onClick={onClickDrawalBtn}
          >
            Withdrawal
          </button>
        </div>
      </article>

      <article className="bgArea">
        <img src={B_withDrawal} alt="" />
        <strong className="title">WithDrawal</strong>
        <img src={B_withDrawal2} alt="" />
      </article>
    </WithDrawalBox>
  );
}

const WithDrawalBox = styled.main`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 100px;
  padding: 70px 140px;

  @media (max-width: 1440px) {
    max-width: 1020px;
    min-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  .contArea {
    width: 454px;

    & > .key {
      display: flex;
      align-items: center;
      gap: 12px;

      .count {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        font-size: 14px;
        color: #2a2a2a;
        border-radius: 50%;
        background: #f7ab1f;
      }
      .title {
        font-size: 24px;
      }
    }

    & > .value {
      .tokenBoxre {
        margin: 44px 0 0 0;
        .key {
          font-size: 16px;
        }

        .valueBox {
          display: flex;
          align-items: center;
          height: 56px;
          padding: 0 24px;
          margin: 10px 0 0 0;
          font-size: 20px;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          border: 1.4px solid rgba(0, 0, 0, 0);
          line-height: 56px;
          justify-content: space-between;
          cursor: pointer;
          .selectedToken {
            line-height: 56px;
            display: flex;
            justify-content: center;
            align-items: center;
            .token {
              width: 38px;
              height: 38px;
              margin-right: 10px;
            }
            .unit {
              text-align: center;
            }
          }
          .Arw {
          }

          &:focus-within {
            border-color: #f7ab1f;
          }

          input {
            flex: 1;
            height: 100%;
            font-weight: inherit;
          }
        }
      }
      .infoList {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 14px 18px;
        margin: 20px 0 0 0;
        background: rgba(0, 0, 0, 0.6);

        li {
          display: flex;
          justify-content: space-between;
          font-size: 16px;

          .key {
          }

          .value {
          }
        }
      }

      .inputList {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 20px 0 0 0;

        .key {
          font-size: 16px;
        }

        .valueBox {
          display: flex;
          align-items: center;
          height: 56px;
          padding: 0 24px;
          margin: 10px 0 0 0;
          font-size: 20px;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          border: 1.4px solid rgba(0, 0, 0, 0);

          &:focus-within {
            border-color: #f7ab1f;
          }

          input {
            flex: 1;
            height: 100%;
            font-weight: inherit;
          }

          .unit {
          }
        }
      }

      .drawalBtn {
        width: 100%;
        height: 56px;
        margin: 44px 0 0 0;
        font-size: 18px;
        font-weight: 700;
        color: #4e3200;
        background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
        border-radius: 10px;

        &:disabled {
          color: #f7ab1f;
          background: #fff;
        }
      }
    }
  }

  .bgArea {
    padding: 150px 0 0 26px;
    position: relative;

    img {
      width: 278px;
      position: absolute;

      &:nth-of-type(1) {
        top: 0;
        left: 0;
      }

      &:nth-of-type(2) {
        top: 308px;
        left: 30px;
      }
    }

    .title {
      font-size: 34px;
      position: relative;
      z-index: 1;
    }
  }
`;
