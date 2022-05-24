import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import { D_tokenList } from "../../data/D_bet";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import I_starYellow from "../../img/icon/I_starYellow.svg";
import I_qnaWhite from "../../img/icon/I_qnaWhite.svg";
import I_langWhite from "../../img/icon/I_langWhite.svg";
import I_timeWhite from "../../img/icon/I_timeWhite.svg";
import I_dollarWhite from "../../img/icon/I_dollarWhite.svg";
import I_highArwGreen from "../../img/icon/I_highArwGreen.svg";
import I_lowArwRed from "../../img/icon/I_lowArwRed.svg";
import I_plusWhite from "../../img/icon/I_plusWhite.svg";

export default function Bet() {
  return (
    <>
      <DefaultHeader />
      <BetBox>
        <section className="innerBox">
          <article className="tokenArea">
            <button className="selectBox" onClick={() => {}}>
              <button className="selectBtn" onClick={() => {}}>
                <p>Ethereum</p>
                <img src={I_dnPolWhite} alt="" />
              </button>
            </button>

            <ul className="tokenList">
              {D_tokenList.map((v, i) => (
                <li key={i}>
                  <img src={I_starYellow} alt="" />
                  <span className="textBox">
                    <p className="key">{v.key}</p>
                    <p className="value">{v.value}</p>
                  </span>
                </li>
              ))}

              <span className="filter" />
            </ul>
          </article>

          <article className="contArea">
            <div className="chartBox"></div>

            <div className="actionBox">
              <div className="timeBox">
                <div className="key">
                  <p>Time</p>

                  <img src={I_qnaWhite} alt="" />
                </div>

                <div className="value">
                  <p>00:01:00</p>

                  <img src={I_timeWhite} alt="" />
                </div>
              </div>

              <div className="amountBox">
                <div className="key">
                  <p>Amount</p>

                  <img src={I_qnaWhite} alt="" />
                </div>

                <div className="value">
                  <p>$ 100</p>

                  <img src={I_dollarWhite} alt="" />
                </div>
              </div>

              <p className="payout">Your payout : $3.40</p>

              <button className="highBtn" onClick={() => {}}>
                <img src={I_highArwGreen} alt="" />
                <p>HIGH</p>
              </button>

              <button className="lowBtn" onClick={() => {}}>
                <img src={I_lowArwRed} alt="" />
                <p>LOW</p>
              </button>
            </div>

            <button className="plusBtn" onClick={() => {}}>
              <img src={I_plusWhite} alt="" />
            </button>
          </article>

          <footer>
            <button className="qnaBtn" onClick={() => {}}>
              <img src={I_qnaWhite} alt="" />
            </button>

            <button className="langBtn" onClick={() => {}}>
              <img src={I_langWhite} alt="" />
            </button>
          </footer>
        </section>
      </BetBox>
    </>
  );
}

const BetBox = styled.main`
  height: 100vh;
  padding: 60px 0 0 0;
  color: #fff;
  background: #0a0e17;

  .innerBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 30px;

    .tokenArea {
      display: flex;
      align-items: center;
      gap: 30px;
      height: 60px;

      .selectBox {
        .selectBtn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 154px;
          height: 40px;
          padding: 0 24px;
          font-size: 16px;
          font-weight: 700;
          border: 1px solid #ffffff;
          border-radius: 20px;

          img {
            width: 8px;
          }
        }
      }

      .tokenList {
        flex: 1;
        display: flex;
        gap: 8px;
        overflow-x: scroll;
        position: relative;

        li {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 40px;
          padding: 0 20px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 20px;

          img {
            width: 15px;
          }

          .textBox {
            display: flex;
            gap: 20px;
            font-size: 14px;
            cursor: pointer;

            p {
              white-space: nowrap;
            }
          }
        }

        .filter {
          width: 120px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.94)
          );
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
        }
      }
    }

    .contArea {
      flex: 1;
      display: flex;

      .chartBox {
        flex: 1;
        background: #181c25;
        border-radius: 12px;
      }

      .actionBox {
        display: flex;
        flex-direction: column;
        gap: 14px;
        width: 180px;
        padding: 20px;
        margin: 0 0 0 10px;
        background: #181c25;
        border-radius: 12px;

        .timeBox,
        .amountBox {
          display: flex;
          flex-direction: column;
          gap: 6px;

          .key {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            opacity: 0.4;

            img {
              width: 12px;
            }
          }

          .value {
            display: flex;
            align-items: center;
            height: 48px;
            padding: 18px;
            font-size: 16px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 8px;

            p {
              flex: 1;
            }

            img {
              height: 20px;
            }
          }
        }

        .payout {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 22px;
          font-size: 12px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 8px;
        }

        .highBtn,
        .lowBtn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          height: 48px;
          font-size: 16px;
          font-weight: 700;
          border: 1.2px solid;
          border-radius: 8px;

          &.highBtn {
            color: #3fb68b;
            border-color: #3fb68b;
          }

          &.lowBtn {
            color: #ff5353;
            border-color: #ff5353;
          }
        }
      }

      .plusBtn {
        height: 12px;
        opacity: 0.4;

        img {
          height: 100%;
        }
      }
    }

    footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 14px;
      height: 70px;

      button {
        img {
          height: 22px;
        }
      }
    }
  }
`;
