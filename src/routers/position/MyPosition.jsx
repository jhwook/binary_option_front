import { useSelector } from "react-redux";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import T_dia from "../../img/tier/T_dia.svg";
import I_upPolGreen from "../../img/icon/I_upPolGreen.svg";

export default function MyPosition() {
  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <>
        <DefaultHeader title="My Positions" />

        <MmyPositionBox>
          <section className="innerBox">
            <article className="posArea">
              <span className="posBox">
                <img src={T_dia} alt="" />

                <div className="textBox">
                  <strong className="pos">Diamond</strong>

                  <p className="cashBack">{`Cashback 0%`}</p>
                </div>
              </span>

              <ul className="balanceList">
                <li>
                  <p className="key">Total</p>
                  <strong className="value">60 USDT</strong>
                </li>
                <li>
                  <p className="key">Safe Balance</p>
                  <strong className="value">60 USDT</strong>
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
                    <p className="key">Deals:</p>
                    <p className="value">0</p>
                  </li>
                  <li>
                    <p className="key">Trading profit</p>
                    <p className="value">$0</p>
                  </li>
                  <li>
                    <p className="key">Profitable deals:</p>
                    <p className="value">0%</p>
                  </li>

                  <li>
                    <p className="key">Average profit:</p>
                    <p className="value">$0</p>
                  </li>
                  <li>
                    <p className="key">Net turnover:</p>
                    <p className="value">$0</p>
                  </li>
                  <li>
                    <p className="key">Hedged trades:</p>
                    <p className="value">$0</p>
                  </li>

                  <li>
                    <p className="key">Min trade amount:</p>
                    <p className="value">$0</p>
                  </li>
                  <li>
                    <p className="key">Max trade amount:</p>
                    <p className="value">$0</p>
                  </li>
                  <li>
                    <p className="key">Max trade profit:</p>
                    <p className="value">$0</p>
                  </li>
                </div>
              </div>
              <div className="chartBox"></div>
            </article>
          </section>
        </MmyPositionBox>
      </>
    );
  else
    return (
      <PmyPositionBox>
        <section className="innerBox">
          <article className="posArea">
            <span className="posBox">
              <img src={T_dia} alt="" />

              <div className="textBox">
                <strong className="pos">Diamond</strong>

                <p className="cashBack">{`Cashback 0%`}</p>
              </div>
            </span>

            <ul className="balanceList">
              <li>
                <p className="key">Total</p>
                <strong className="value">60 USDT</strong>
              </li>
              <li>
                <p className="key">Safe Balance</p>
                <strong className="value">60 USDT</strong>
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
      </PmyPositionBox>
    );
}

const MmyPositionBox = styled.main`
  height: 100%;

  .innerBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;

    .posArea {
      .posBox {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 20px;

        img {
          height: 74px;
        }

        .textBox {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .pos {
            font-size: 20px;
          }

          .cashBack {
            font-size: 14px;
            opacity: 0.4;
          }
        }
      }

      .balanceList {
        display: flex;
        padding: 12px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.2);

        li {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 4px 20px;

          &:nth-of-type(n + 2) {
            border-left: 1px solid rgba(255, 255, 255, 0.2);
          }

          .key {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.4);
          }

          .value {
            font-size: 16px;
          }
        }
      }
    }

    .detArea {
      .detBox {
        .posBox {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 16px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);

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
          flex-direction: column;
          gap: 10px;
          padding: 16px 20px;
          font-size: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);

          li {
            display: flex;
            justify-content: space-between;

            .key {
              white-space: nowrap;
              opacity: 0.4;
            }
          }
        }
      }

      .chartBox {
        min-width: 730px;
        width: 730px;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const PmyPositionBox = styled.main`
  flex: 1;
  padding: 70px 140px;

  @media (max-width: 1440px) {
    max-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 50px;
    height: 100%;
    overflow-y: scroll;

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
      overflow-x: scroll;

      .detBox {
        display: flex;
        flex-direction: column;
        min-width: 562px;

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
        min-width: 730px;
        width: 730px;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
`;
