import { useState } from "react";
import styled from "styled-components";
import T_usdt from "../../img/token/T_usdt.png";

export default function Deposit() {
  const [amount, setAmount] = useState("");

  return (
    <DepositBox>
      <article className="deposit">
        <div className="key">
          <span className="count">1</span>

          <strong className="title">Deposit</strong>
        </div>

        <div className="value">
          <div className="tokenBox">
            <img src={T_usdt} alt="" />
            <strong>USDT</strong>
          </div>

          <ul className="infoList">
            <li>
              <p className="key">Commission</p>
              <p className="value">0%</p>
            </li>
            <li>
              <p className="key">Minimum deposit amount</p>
              <p className="value">5 USDT</p>
            </li>
            <li>
              <p className="key">Max amount per transaction</p>
              <p className="value">0no limits</p>
            </li>
          </ul>

          <div className="amountBox">
            <p className="key">Amount</p>

            <div className="valueBox">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder=""
              />
              <strong className="unit">USDT</strong>
            </div>
          </div>
        </div>
      </article>
    </DepositBox>
  );
}

const DepositBox = styled.main`
  display: flex;
  gap: 100px;
  padding: 70px 140px;

  article {
    display: flex;
    flex-direction: column;
    gap: 40px;

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

    &.deposit {
      width: 454px;

      & > .value {
        .tokenBox {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 24px;

          img {
            width: 50px;
            height: 50px;
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

        .amountBox {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 44px 0 0 0;

          .key {
            font-size: 16px;
          }

          .valueBox {
            display: flex;
            align-items: center;
            height: 56px;
            padding: 0 24px;
            font-size: 20px;
            font-weight: 700;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;

            &:focus-within {
              border: 1.4px solid #f7ab1f;
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
      }
    }
  }
`;
