import styled from "styled-components";
import E_dia from "../../img/example/E_dia.png";
import I_upPolGreen from "../../img/icon/I_upPolGreen.svg";

export default function MyPosition() {
  return (
    <MyPositionBox>
      <section className="innerBox">
        <article className="posArea">
          <span className="posBox">
            <img src={E_dia} alt="" />

            <div className="textBox">
              <strong className="pos">Diamond</strong>

              <p className="cashBack">{`Cashback 0%`}</p>
            </div>
          </span>

          <ul className="balanceList">
            <li>
              <p className="key">Total</p>
              <strong className="price">60 USDT</strong>
            </li>
            <li>
              <p className="key">safe balance</p>
              <strong className="price">60 USDT</strong>
            </li>
          </ul>
        </article>

        <article className="detArea">
          <div className="detBox">
            <div className="posBox">
              <p className="key">Positions</p>

              <div className="value">
                <strong className="price">${(0).toFixed(2)}</strong>

                <div className="changeBox">
                  <img src={I_upPolGreen} alt="" />

                  <span className="text">
                    <p className="change">$0.00 (0.00%)</p>&nbsp;
                    <p className="time">Today</p>
                  </span>
                </div>
              </div>
            </div>

            <div className="detPriceList">
              <li>
                <div>
                  <p className="key">Deals:</p>
                  <p className="value">0</p>
                </div>
                <div>
                  <p className="key">Trading profit</p>
                  <p className="value">$0</p>
                </div>
                <div>
                  <p className="key">Profitable deals:</p>
                  <p className="value">0%</p>
                </div>
              </li>
              <li>
                <div>
                  <p className="key">Average profit:</p>
                  <p className="value">$0</p>
                </div>
                <div>
                  <p className="key">Net turnover:</p>
                  <p className="value">$0</p>
                </div>
                <div>
                  <p className="key">Hedged trades:</p>
                  <p className="value">$0</p>
                </div>
              </li>
              <li>
                <div>
                  <p className="key">Min trade amount:</p>
                  <p className="value">$0</p>
                </div>
                <div>
                  <p className="key">Max trade amount:</p>
                  <p className="value">$0</p>
                </div>
                <div>
                  <p className="key">Max trade profit:</p>
                  <p className="value">$0</p>
                </div>
              </li>
            </div>
          </div>
          <div className="chartBox"></div>
        </article>
      </section>
    </MyPositionBox>
  );
}

const MyPositionBox = styled.main`
  padding: 58px 140px;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 1292px;

    .posArea {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .posBox {
        display: flex;
        align-items: center;
        gap: 12px;

        img {
          height: 74px;
        }

        .textBox {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .pos {
            font-size: 24px;
          }

          .cashBack {
            font-size: 14px;
            opacity: 0.4;
          }
        }
      }

      .balanceList {
        display: flex;
        height: 42px;

        li {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          padding: 0 14px;

          &:nth-of-type(n + 2) {
            border-left: 1px solid rgba(255, 255, 255, 0.2);
          }

          &:last-of-type {
            padding: 0 0 0 14px;
          }

          .key {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.4);
          }

          .value {
            font-size: 16px;
          }
        }
      }
    }

    .detArea {
      display: flex;
      height: 256px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;

      .detBox {
        display: flex;
        flex-direction: column;
        width: 562px;

        .posBox {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 18px 30px;

          .key {
            font-size: 14px;
            opacity: 0.4;
          }

          .value {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .price {
              font-size: 24px;
            }

            .changeBox {
              display: flex;
              align-items: center;
              gap: 4px;

              img {
                width: 10px;
              }

              .text {
                display: flex;
                font-size: 14px;

                .change {
                  color: #3fb68b;
                }

                .time {
                  opacity: 0.4;
                }
              }
            }
          }
        }

        .detPriceList {
          flex: 1;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.2);

          li {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 0 20px;
            font-size: 14px;

            &:nth-of-type(n + 2) {
              border-left: 1px solid rgba(255, 255, 255, 0.2);
            }

            div {
              display: flex;
              justify-content: space-between;

              .key {
                white-space: nowrap;
                opacity: 0.4;
              }
            }
          }
        }
      }

      .chartBox {
        flex: 1;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
`;
