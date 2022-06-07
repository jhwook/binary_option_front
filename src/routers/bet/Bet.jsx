import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import {
  D_candleChartList,
  D_screenList,
  D_tokenList,
  D_volumeChartList,
} from "../../data/D_bet";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import I_starYellowO from "../../img/icon/I_starYellowO.svg";
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
import I_barChartWhite from "../../img/icon/I_barChartWhite.svg";
import { createChart } from "lightweight-charts";
import { useEffect,useLayoutEffect, useState, useMemo } from "react";
import { chartOpt } from "../../configs/setting";
import LiveTradePopup from "../../components/bet/LiveTradePopup";
import PopupBg from "../../components/common/PopupBg";
import SelectPopup from "../../components/common/SelectPopup";
import ChartPopup from "../../components/bet/ChartPopup";
import TokenPopup from "../../components/bet/TokenPopup";
import { useDispatch, useSelector } from "react-redux";
import TimePopup from "../../components/bet/TimePopup";
import { toast } from "react-toastify";
import { setToast } from "../../util/Util";
import DetBox from "../../components/bet/detBox/DetBox";
import InsufficientPopup from "../../components/bet/InsufficientPopup";
import MyBalancePopup from "../../components/header/MyBalancePopup";
import AddPopup from "../../components/header/AddPopup";
import { resetChart, setChart, addTicker, resetTicker } from "../../reducers/candleChart";
import io from 'socket.io-client'
import WebSocket from "ws";
import axios from "axios";

export default function Bet() {
  let a = 1;
  const dispatch = useDispatch();
  const chart = useSelector((state)=>state.candleChart.candle)
  const ticker = useSelector((state)=>state.candleChart.ticker)
  const isMobile = useSelector((state) => state.common.isMobile);

  const [candleChart, setCandleChart] = useState("");
  const [volumeChart, setVolumeChart] = useState("");
  const [liveTradePopup, setLiveTradePopup] = useState(false);
  const [chartPopup, setChartPopup] = useState(false);
  const [hotKeyPopup, setHotKeyPopup] = useState(true);
  const [screen, setScreen] = useState(D_screenList[0]);
  const [screenPopup, setScreenPopup] = useState(false);
  const [tokenPopup, setTokenPopup] = useState(false);
  const [timePopup, setTimePopup] = useState(false);
  const [detMode, setDetMode] = useState(false);
  const [insufficientPopup, setInsufficientPopup] = useState(false);
  const [myBalancePopup, setMyBalancePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [lastClose, setLastClose] = useState();
  const [lastIndex, setLastIndex] = useState();
  const [targetPrice, setTargetPrice] = useState();
  const [targetIndex, setTargetIndex] = useState();
  const [currentBusinessDay, setCurrentBusinessDay] = useState({ day: 29, month: 5, year: 2019 });
  const [currentIndex, setCurrentIndex] = useState();
  const [ticks, setTicks] = useState(0)
  const [currentBar, setCurrentBar]= useState({
    open: null,
    high: null,
    low: null,
    close: null,
    time: currentBusinessDay,
  })



  function markUpChart() {
    const chartBox = document.getElementById("ChartBox");
    console.log(chartBox)
    if (!chartBox) {console.log('nochartbox');return;}
    console.log('yeschart')

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

  function onClickPayBtn(type) {
    switch (type) {
      case "high":
        setToast("placed");

        toast.onChange((payload) => {
          if (payload.status === "removed") setToast("closed");
        });
        break;

      case "low":
        setInsufficientPopup(true);
        break;

      default:
        break;
    }
  }

  useLayoutEffect(() => {
    markUpChart();

    setLiveTradePopup(true);

    document.addEventListener("keydown", handleKeyDown);
console.log('hi')
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // useEffect(() => {
  //   const chartInterval = setInterval(() => {
  //     getChartLive(candleChart);
  //     // axios.get('https://marketdata.tradermade.com/api/v1/live?currency=EURUSD&api_key=3wjG4xYPlEnI8GNrUZW2')
  //     // .then(response => {

  //     //   console.log(response.data);

  //     //   //console.log(response.data.quotes[1]);
  //     // })
  //     // .catch(error => {
  //     //   console.log(error);
  //     // });
  //   }, 200);

  //   return () => clearInterval(chartInterval);
  // }, [candleChart]);


  
  // function mergeTickToBar(price) {
  //   if (currentBar.open === null) {
  //     currentBar.open = price;
  //     currentBar.high = price;
  //     currentBar.low = price;
  //     currentBar.close = price;
  //   } else {
  //     currentBar.close = price;
  //     currentBar.high = Math.max(currentBar.high, price);
  //     currentBar.low = Math.min(currentBar.low, price);
  //   }
  //   candleSeries.update(currentBar);
  // }

  function nextBusinessDay(time) {
    var d = new Date();
    d.setUTCFullYear(time.year);
    d.setUTCMonth(time.month - 1);
    d.setUTCDate(time.day + 1);
    d.setUTCHours(0, 0, 0, 0);
    return {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate(),
    };
  }

  function getRandomPrice() {
    return 10 + Math.round(Math.random() * 10000) / 100;
  }

  useEffect(() => {
    if(!candleChart){return;}
    const chartInterval = setInterval(() => {
      let price = getRandomPrice()//response.data.quotes[0].mid;
        dispatch(setChart(price))
        dispatch(addTicker())

    }, 500);

    return () => clearInterval(chartInterval);
  }, [candleChart]);

  useEffect(()=>{
    if(!candleChart){return;}
    console.log(chart)
    candleChart.update(chart)
  },[chart])

  if (isMobile)
    return (
      <>
        <DefaultHeader />

        <MbetBox onKeyDown={handleKeyDown}>
          <section className="innerBox">
            <article className="contArea">
              <div className="chartBox">
                {/* <div className="chartBox" id="ChartBox"> */}
                <span className="utilBox">
                  <ul className="btnList">
                    <li>
                      <button
                        className="tokenBtn"
                        onClick={() => setTokenPopup(true)}
                      >
                        <p>Ethereum</p>
                        <img src={I_dnPolWhite} alt="" />
                      </button>

                      {tokenPopup && (
                        <>
                          <TokenPopup off={setTokenPopup} />
                          <PopupBg off={setTokenPopup} />
                        </>
                      )}
                    </li>

                    <li>
                      <button
                        className="chartBtn"
                        onClick={() => setChartPopup(true)}
                      >
                        <img src={I_candleChartWhite} alt="" />
                      </button>

                      {chartPopup && (
                        <>
                          <ChartPopup off={setChartPopup} />
                          <PopupBg bg off={setChartPopup} />
                        </>
                      )}
                    </li>
                  </ul>

                  <button className="detBtn" onClick={() => setDetMode(true)}>
                    <img src={I_barChartWhite} alt="" />
                  </button>
                </span>
              </div>

              <div className="actionBox">
                <div className="infoBox">
                  <div className="timeBox contBox">
                    <p className="key">Time</p>

                    <div className="value">
                      <button
                        className="contBtn"
                        onClick={() => setTimePopup(true)}
                      >
                        <p>00:01:00</p>

                        <img src={I_timeWhite} alt="" />
                      </button>

                      {timePopup && (
                        <>
                          <TimePopup off={setTimePopup} />
                          <PopupBg off={setTimePopup} />
                        </>
                      )}
                    </div>
                  </div>

                  <div className="amountBox contBox">
                    <p className="key">Amount</p>

                    <div className="value">
                      <p>$ 100</p>

                      <img src={I_dollarWhite} alt="" />
                    </div>
                  </div>
                </div>

                <p className="payout">Your payout : $3.40</p>

                <div className="btnBox">
                  <button
                    className="highBtn"
                    onClick={() => onClickPayBtn("high")}
                  >
                    <img src={I_highArwGreen} alt="" />
                    <p>HIGH</p>
                  </button>

                  <button
                    className="lowBtn"
                    onClick={() => onClickPayBtn("low")}
                  >
                    <img src={I_lowArwRed} alt="" />
                    <p>LOW</p>
                  </button>
                </div>
              </div>
            </article>
          </section>
        </MbetBox>

        {detMode && <DetBox mode={detMode} off={setDetMode} />}

        {liveTradePopup && (
          <>
            <LiveTradePopup off={setLiveTradePopup} />
            <PopupBg bg off={setLiveTradePopup} />
          </>
        )}

        {insufficientPopup && (
          <>
            <InsufficientPopup
              off={setInsufficientPopup}
              nextProc={setMyBalancePopup}
            />
            <PopupBg bg off={setInsufficientPopup} />
          </>
        )}

        {myBalancePopup && (
          <>
            <MyBalancePopup off={setMyBalancePopup} setAddPopup={setAddPopup} />
            <PopupBg bg off={setMyBalancePopup} />
          </>
        )}

        {addPopup && (
          <>
            <AddPopup off={setAddPopup} />
            <PopupBg bg off={setAddPopup} />
          </>
        )}
      </>
    );
  else
    return (
      <>
        <DefaultHeader border />

        <PbetBox onKeyDown={handleKeyDown}>
          <section className="innerBox">
            <article className="tokenArea">
              <div className="selectBox">
                <button
                  className="selectBtn"
                  onClick={() => setTokenPopup(true)}
                >
                  <p>Ethereum</p>
                  <img src={I_dnPolWhite} alt="" />
                </button>

                {tokenPopup && (
                  <>
                    <TokenPopup off={setTokenPopup} />
                    <PopupBg off={setTokenPopup} />
                  </>
                )}
              </div>

              <ul className="tokenList">
                {D_tokenList.map((v, i) => (
                  <li key={i}>
                    <img src={I_starYellowO} alt="" />
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
              <div className="chartBox" id="ChartBox">
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
                <div className="timeBox contBox">
                  <div className="key">
                    <p>Time</p>

                    <button className="infoBtn">
                      <img src={I_qnaWhite} alt="" />

                      <span className="hoverPopup">
                        <p>
                          Set the time (UTC+2) when your trading operation will
                          be dosed. By placing a “Higher” or “Lower” forecast
                          you will receve the result exactly at 17.05.2022
                          11:45:16.
                        </p>
                      </span>
                    </button>
                  </div>

                  <button className="value">
                    <button
                      className="contBtn"
                      onClick={() => setTimePopup(true)}
                    >
                      <p>00:01:00</p>

                      <img src={I_timeWhite} alt="" />
                    </button>

                    {timePopup && (
                      <>
                        <TimePopup off={setTimePopup} />
                        <PopupBg off={setTimePopup} />
                      </>
                    )}
                  </button>
                </div>

                <div className="amountBox contBox">
                  <div className="key">
                    <p>Amount</p>

                    <button className="infoBtn" onClick={() => {}}>
                      <img src={I_qnaWhite} alt="" />

                      <span className="hoverPopup">
                        <p>
                          Specify the percentage of the trading account balance
                          used calculate your trade amount.
                        </p>
                      </span>
                    </button>
                  </div>

                  <div className="value">
                    <p>$ 100</p>

                    <img src={I_dollarWhite} alt="" />
                  </div>
                </div>

                <p className="payout">Your payout : $3.40</p>

                <button
                  className="highBtn"
                  onClick={() => onClickPayBtn("high")}
                >
                  <img src={I_highArwGreen} alt="" />
                  <p>HIGH</p>
                </button>

                <button className="lowBtn" onClick={() => onClickPayBtn("low")}>
                  <img src={I_lowArwRed} alt="" />
                  <p>LOW</p>
                </button>
              </div>

              <DetBox mode={detMode} />

              <button
                className={`${detMode && "on"} plusBtn`}
                onClick={() => setDetMode(!detMode)}
              >
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
        </PbetBox>

        {liveTradePopup && (
          <>
            <LiveTradePopup off={setLiveTradePopup} />
            <PopupBg off={setLiveTradePopup} />
          </>
        )}

        {insufficientPopup && (
          <>
            <InsufficientPopup
              off={setInsufficientPopup}
              nextProc={setMyBalancePopup}
            />
            <PopupBg off={setInsufficientPopup} />
          </>
        )}

        {myBalancePopup && (
          <>
            <MyBalancePopup off={setMyBalancePopup} setAddPopup={setAddPopup} />
            <PopupBg off={setMyBalancePopup} />
          </>
        )}

        {addPopup && (
          <>
            <AddPopup off={setAddPopup} />
            <PopupBg off={setAddPopup} />
          </>
        )}
      </>
    );
}

const MbetBox = styled.main`
  height: 100vh;
  padding: 60px 0 0 0;
  color: #fff;
  background: #0a0e17;

  .innerBox {
    display: flex;
    flex-direction: column;
    height: 100%;

    .contArea {
      flex: 1;
      display: flex;
      flex-direction: column;

      .chartBox {
        flex: 1;
        background: #181c25;
        position: relative;

        .utilBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          top: 3.88vw;
          left: 4.44vw;
          right: 4.44vw;
          position: absolute;

          .btnList {
            display: flex;
            gap: 2.22vw;

            & > li {
              position: relative;

              .tokenBtn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 31.66vw;
                height: 9.44vw;
                padding: 0 4.44vw;
                font-size: 3.88vw;
                font-weight: 700;
                border: 1px solid #fff;
                border-radius: 5.55vw;

                img {
                  width: 2.22vw;
                }
              }

              .chartBtn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 9.44vw;
                aspect-ratio: 1;
                border: 1px solid #fff;
                border-radius: 50%;

                img {
                  height: 3.88vw;
                }
              }
            }
          }

          .detBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 9.44vw;
            aspect-ratio: 1;
            border: 1px solid #fff;
            border-radius: 50%;

            img {
              height: 3.88vw;
            }
          }
        }
      }

      .actionBox {
        display: flex;
        flex-direction: column;
        gap: 2.22vw;
        height: 52.77vw;
        padding: 4.44vw 4.44vw 6.66vw 4.44vw;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.14) 0%,
          rgba(10, 14, 23, 0.14) 100%
        );
        border-radius: 5.55vw 5.55vw 0 0;

        .infoBox {
          display: flex;
          gap: 3.33vw;

          .contBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1.66vw;

            .key {
              font-size: 3.88vw;
              color: rgba(255, 255, 255, 0.4);
            }

            .value {
              display: flex;
              align-items: center;
              height: 11.11vw;
              padding: 0 3.88vw;
              font-size: 4.44vw;
              border: 1px solid rgba(255, 255, 255, 0.4);
              border-radius: 2.22vw;
              position: relative;

              .contBtn {
                display: flex;
                align-items: center;
                width: 100%;
                height: 100%;
              }

              p {
                flex: 1;
                text-align: start;
              }

              img {
                height: 5.55vw;
              }
            }
          }
        }

        .payout {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 6.11vw;
          font-size: 3.88vw;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 2.22vw;
        }

        .btnBox {
          display: flex;
          gap: 3.33vw;

          button {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5.55vw;
            height: 13.33vw;
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
      }
    }
  }
`;

const PbetBox = styled.main`
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
        position: relative;

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

      & > .tokenList {
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
      overflow: hidden;

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

        .contBox {
          display: flex;
          flex-direction: column;
          gap: 6px;

          .key {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.4);

            .infoBtn {
              position: relative;

              &:hover {
                .hoverPopup {
                  display: block;
                }
              }

              img {
                width: 12px;
              }

              .hoverPopup {
                display: none;
                width: 210px;
                padding: 10px 12px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                backdrop-filter: blur(40px);
                -webkit-backdrop-filter: blur(40px);
                top: 18px;
                right: 0;
                position: absolute;

                p {
                  color: #fff;
                }
              }
            }
          }

          .value {
            display: flex;
            align-items: center;
            height: 48px;
            padding: 0 18px;
            font-size: 16px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 8px;
            position: relative;

            .contBtn {
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
            }

            p {
              flex: 1;
              text-align: start;
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

      & > .plusBtn {
        display: flex;
        align-items: flex-start;
        padding: 10px;
        opacity: 0.6;

        img {
          height: 20px;
          transition: all 0.3s;
        }

        &.on {
          img {
            transform: rotate(45deg);
          }
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
