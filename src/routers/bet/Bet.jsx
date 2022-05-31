import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import {
  D_candleChartList,
  D_screenList,
  D_tokenList,
  D_volumeChartList,
} from "../../data/D_bet";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import I_starYellow from "../../img/icon/I_starYellow.svg";
import I_qnaWhite from "../../img/icon/I_qnaWhite.svg";
import I_langWhite from "../../img/icon/I_langWhite.svg";
import I_timeWhite from "../../img/icon/I_timeWhite.svg";
import I_dollarWhite from "../../img/icon/I_dollarWhite.svg";
import I_highArwGreen from "../../img/icon/I_highArwGreen.svg";
import I_lowArwRed from "../../img/icon/I_lowArwRed.svg";
import I_plusWhite from "../../img/icon/I_plusWhite.svg";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import I_upPolWhite from "../../img/icon/I_upPolWhite.svg";
import I_candleChartWhite from "../../img/icon/I_candleChartWhite.svg";
import I_3dotWhite from "../../img/icon/I_3dotWhite.svg";
import { createChart } from "lightweight-charts";
import { useEffect, useState } from "react";
import { chartOpt } from "../../configs/setting";
import LiveTradePopup from "../../components/bet/LiveTradePopup";
import PopupBg from "../../components/common/PopupBg";
import SelectPopup from "../../components/common/SelectPopup";
import ChartPopup from "../../components/bet/ChartPopup";

export default function Bet() {
  let a = 1;

  const [candleChart, setCandleChart] = useState("");
  const [volumeChart, setVolumeChart] = useState("");
  const [liveTradePopup, setLiveTradePopup] = useState(false);
  const [chartPopup, setChartPopup] = useState(false);
  const [hotKeyPopup, setHotKeyPopup] = useState(true);
  const [screen, setScreen] = useState(D_screenList[0]);
  const [screenPopup, setScreenPopup] = useState(false);

  function markUpChart() {
    const chartBox = document.getElementById("ChartBox");
    if (!chartBox) return;

    var chart = createChart(chartBox, {
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      layout: {
        backgroundColor: "#181c25",
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: {
          color: "rgba(42, 46, 57, 0)",
        },
        horzLines: {
          color: "rgba(42, 46, 57, 0.6)",
        },
      },
    });

    let candleChart = chart.addCandlestickSeries({
      upColor: chartOpt.color.upColor,
      downColor: chartOpt.color.dnColor,
      borderUpColor: chartOpt.color.upColor,
      borderDownColor: chartOpt.color.dnColor,
      wickUpColor: chartOpt.color.upColor,
      wickDownColor: chartOpt.color.dnColor,
    });

    setCandleChart(candleChart);

    var volumeChart = chart.addHistogramSeries({
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    setVolumeChart(volumeChart);

    candleChart.setData(D_candleChartList);

    volumeChart.setData(D_volumeChartList);
  }

  function getChartLive(candleChart) {
    const d = new Date();

    candleChart.update({
      open: 59.21,
      high: 59.66,
      low: a,
      close: a,
      time: {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate() + a,
      },
    });

    volumeChart.update({
      time: {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate() + a,
      },
      value: 21737523.0 + a * 1000000,
      color: "rgba(0, 150, 136, 0.8)",
    });

    a++;
  }

  function handleKeyDown(e) {
    if (e.key === "W" && e.shiftKey) {
      console.log("A");
    }
  }

  useEffect(() => {
    markUpChart();

    setLiveTradePopup(true);

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const chartInterval = setInterval(() => {
      getChartLive(candleChart);
    }, 200);

    return () => clearInterval(chartInterval);
  }, [candleChart]);

  return (
    <>
      <DefaultHeader border />

      <BetBox onKeyDown={handleKeyDown}>
        <section className="innerBox">
          <article className="tokenArea">
            <div className="selectBox">
              <button className="selectBtn" onClick={() => {}}>
                <p>Ethereum</p>
                <img src={I_dnPolWhite} alt="" />
              </button>
            </div>

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
            <div className="chartBox">
              {/* <div className="chartBox" id="ChartBox"> */}
              <span className="utilBox">
                <ul className="btnList">
                  <li>
                    <button
                      className="chartBtn"
                      onClick={() => setChartPopup(true)}
                    >
                      <img src={I_candleChartWhite} alt="" />
                    </button>

                    {chartPopup && (
                      <>
                        <ChartPopup />
                        <PopupBg off={setChartPopup} />
                      </>
                    )}
                  </li>

                  <li>
                    <button className="moreBtn" onClick={() => {}}>
                      <img src={I_3dotWhite} alt="" />
                    </button>
                  </li>
                </ul>

                <span className="typeBox">{`Chart type : Candle`}</span>
              </span>

              {hotKeyPopup && (
                <div className="hotKeyPopup">
                  <div className="topBar">
                    <span className="blank" />
                    <p className="title">Hotkeys</p>

                    <button
                      className="closeBtn"
                      onClick={() => setHotKeyPopup(false)}
                    >
                      <img src={I_xWhite} alt="" />
                    </button>
                  </div>

                  <ul className="hotKeyList">
                    <li>
                      <p className="key">Shift + W</p>
                      <p className="value">Higher(New trade)</p>
                    </li>
                    <li>
                      <p className="key">Shift + S</p>
                      <p className="value">Lower(New trade)</p>
                    </li>
                    <li>
                      <p className="key">Shift + A</p>
                      <p className="value">Decrease trade amount</p>
                    </li>
                    <li>
                      <p className="key">Shift + D</p>
                      <p className="value">Increase trade amount</p>
                    </li>
                    <li>
                      <p className="key">Shift + TAB</p>
                      <p className="value">Next favorite asset</p>
                    </li>
                  </ul>
                </div>
              )}

              <span className="screenCont">
                <p className="key">Screen size</p>

                <span className="screenBox">
                  <button
                    className="screenBtn"
                    onClick={() => setScreenPopup(true)}
                  >
                    <p>{screen}</p>

                    <img src={I_upPolWhite} alt="" />
                  </button>

                  {screenPopup && (
                    <>
                      <SelectPopup
                        off={setScreenPopup}
                        list={D_screenList}
                        setCont={setScreen}
                      />
                      <PopupBg off={setScreenPopup} />
                    </>
                  )}
                </span>
              </span>
            </div>

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

      {liveTradePopup && (
        <>
          <LiveTradePopup off={setLiveTradePopup} />
          <PopupBg off={setLiveTradePopup} />
        </>
      )}
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
        position: relative;

        .utilBox {
          display: flex;
          flex-direction: column;
          gap: 8px;
          top: 24px;
          left: 24px;
          position: absolute;

          .btnList {
            display: flex;
            gap: 8px;

            & > li {
              position: relative;

              & > button {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 38px;
                height: 38px;
                background: rgba(246, 246, 246, 0.1);
                border-radius: 6px;
              }
            }
          }

          .typeBox {
            display: flex;
            align-items: center;
            height: 34px;
            padding: 0 12px;
            font-size: 12px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }
        }

        .hotKeyPopup {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px;
          background: rgba(50, 50, 61, 0.8);
          border-radius: 6px;
          right: 18px;
          bottom: 26px;
          position: absolute;
          z-index: 3;

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
              font-size: 12px;
            }

            .blank,
            .closeBtn img {
              width: 10px;
            }

            .closeBtn {
              display: flex;
              align-items: center;
            }
          }

          .hotKeyList {
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-size: 12px;

            li {
              display: flex;
              gap: 12px;

              p {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                &.key {
                  width: 58px;
                }

                &.value {
                  color: rgba(255, 255, 255, 0.4);
                  width: 130px;
                }
              }
            }
          }
        }

        .screenCont {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 36px;
          padding: 0 6px;
          font-size: 12px;
          background: rgba(246, 246, 246, 0.1);
          border-radius: 6px;
          bottom: 30px;
          left: 30px;
          position: absolute;
          z-index: 3;

          .screenBox {
            width: 62px;
            height: 26px;
            border-radius: 4px;
            position: relative;

            .screenBtn {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              height: 100%;
              padding: 0 10px;
              background: rgba(0, 0, 0, 0.4);
            }

            .selectPopup {
              padding: 4px;
              top: unset;
              bottom: 38px;

              li {
                color: rgba(255, 255, 255, 0.6);
                border-radius: inherit;

                &:hover {
                  color: #fff;
                  background: rgba(255, 255, 255, 0.1);
                }
              }
            }
          }
        }
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
            color: rgba(255, 255, 255, 0.4);

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
