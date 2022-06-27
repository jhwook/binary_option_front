import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import I_starYellowO from "../../img/icon/I_starYellowO.svg";
import I_qnaWhite from "../../img/icon/I_qnaWhite.svg";
import I_langWhite from "../../img/icon/I_langWhite.svg";
import I_percentWhite from "../../img/icon/I_percentWhite.svg";
import I_highArwGreen from "../../img/icon/I_highArwGreen.svg";
import I_lowArwRed from "../../img/icon/I_lowArwRed.svg";
import I_plusWhite from "../../img/icon/I_plusWhite.svg";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import I_flagWhite from "../../img/icon/I_flagWhite.svg";
import I_barChartWhite from "../../img/icon/I_barChartWhite.svg";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LiveTradePopup from "../../components/bet/LiveTradePopup";
import PopupBg from "../../components/common/PopupBg";
import TokenPopup from "../../components/bet/TokenPopup";
import { useDispatch, useSelector } from "react-redux";
import TimePopup from "../../components/bet/TimePopup";
import { toast } from "react-toastify";
import { setToast } from "../../util/Util";
import DetBox from "../../components/bet/detBox/DetBox";
import InsufficientPopup from "../../components/bet/InsufficientPopup";
import MyBalancePopup from "../../components/header/MyBalancePopup";
import AddPopup from "../../components/header/AddPopup";
import ReactTradingviewWidget, { Themes } from "react-tradingview-widget";
import axios from "axios";
import { API } from "../../configs/api";
import LoadingBar from "../../components/common/LoadingBar";

export default function Live() {
  const hoverRef1 = useRef();
  const hoverRef2 = useRef();
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.common.isMobile);
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");

  const [loading, setLoading] = useState(true);
  const [liveTradePopup, setLiveTradePopup] = useState(false);
  const [hotKeyPopup, setHotKeyPopup] = useState(true);
  const [tokenPopup, setTokenPopup] = useState(false);
  const [timePopup, setTimePopup] = useState(false);
  const [detMode, setDetMode] = useState(false);
  const [insufficientPopup, setInsufficientPopup] = useState(false);
  const [myBalancePopup, setMyBalancePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [chartSymbol, setChartSymbol] = useState("BTCUSDT");
  const [amount, setAmount] = useState("");
  const [bookMark, setBookMark] = useState([]);

  function handleKeyDown(e) {
    if (e.key === "W" && e.shiftKey) {
      console.log("A");
    }
  }

  function onClickPayBtn(type) {
    switch (type) {
      case "high":
        axios
          .post(
            API.BET,
            { betamount: amount, side: 2, userid },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            console.log(res);
            setToast({ type: "high", amount });
          })
          .catch((err) => console.error(err));

        // setToast({ type: "closed" });
        break;

      case "low":
        axios
          .post(
            API.BET,
            { betamount: amount, side: 1, userid },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((res) => {
            console.log(res);
            setToast({ type: "low", amount });
          })
          .catch((err) => console.error(err));

        // setInsufficientPopup(true);
        break;

      default:
        break;
    }
  }

  function getBookMark() {
    axios
      .get(API.BOOKMARK_LIST, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setBookMark(data);
      })
      .catch((err) => console.error(err));
  }

  function turnLoader() {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }

  useEffect(() => {
    getBookMark();

    turnLoader();
  }, []);

  useLayoutEffect(() => {
    setLiveTradePopup(true);

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function onMouseOverBtn(e) {
    // console.log(e.screenX);
    // console.log(e.screenY);

    hoverRef1.current.style.left = `${e.clientX}px`;
    hoverRef1.current.style.top = `${e.clientY}px`;
    hoverRef2.current.style.left = `${e.clientX}px`;
    hoverRef2.current.style.top = `${e.clientY}px`;

    console.log(hoverRef1.current.style.left);
    console.log(hoverRef1.current.style.top);
  }

  if (isMobile)
    return (
      <>
        <DefaultHeader />

        {loading ? (
          <LoadingBar />
        ) : (
          <>
            <MbetBox onKeyDown={handleKeyDown}>
              <section className="innerBox">
                <article className="contArea">
                  <div className="chartBox">
                    <ReactTradingviewWidget
                      symbol={chartSymbol}
                      theme={Themes.DARK}
                      locale="kr"
                      autosize
                      timezone="Asia/Seoul"
                      allow_symbol_change={false}
                    />

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
                              <TokenPopup
                                off={setTokenPopup}
                                setAsset={setChartSymbol}
                                getBookMark={getBookMark}
                              />
                              <PopupBg off={setTokenPopup} />
                            </>
                          )}
                        </li>
                      </ul>

                      <button
                        className="detBtn"
                        onClick={() => setDetMode(true)}
                      >
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

                            <img src={I_flagWhite} alt="" />
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
                          <p className="unit">$</p>
                          <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                          />

                          <img src={I_percentWhite} alt="" />
                        </div>
                      </div>
                    </div>

                    <div className="btnCont">
                      <span className="btnBox high">
                        <button
                          className="highBtn"
                          disabled={!amount}
                          onClick={() => onClickPayBtn("high")}
                        >
                          <img src={I_highArwGreen} alt="" />
                          <p>HIGH</p>
                        </button>

                        <p className="rate">+80% 400536157.70</p>
                      </span>

                      <span className="btnBox low">
                        <button
                          className="lowBtn"
                          disabled={!amount}
                          onClick={() => onClickPayBtn("low")}
                        >
                          <img src={I_lowArwRed} alt="" />
                          <p>LOW</p>
                        </button>

                        <p className="rate">+80% 400536157.70</p>
                      </span>
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
                <MyBalancePopup
                  off={setMyBalancePopup}
                  setAddPopup={setAddPopup}
                />
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
        )}
      </>
    );
  else
    return (
      <>
        <DefaultHeader />

        {loading ? (
          <LoadingBar />
        ) : (
          <>
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
                        <TokenPopup
                          off={setTokenPopup}
                          setAsset={setChartSymbol}
                          getBookMark={getBookMark}
                        />
                        <PopupBg off={setTokenPopup} />
                      </>
                    )}
                  </div>

                  <ul className="tokenList">
                    {bookMark.map((v, i) => (
                      <li
                        key={i}
                        onClick={() => setChartSymbol(v.displaysymbol)}
                      >
                        <img src={I_starYellowO} alt="" />
                        <span className="textBox">
                          <p className="key">{v.name}</p>
                          <p className="value">{v.payout}%</p>
                        </span>
                      </li>
                    ))}

                    <span className="filter" />
                  </ul>
                </article>

                <article className="contArea">
                  <div className="chartBox">
                    <div className="chart">
                      <ReactTradingviewWidget
                        container_id={"technical-analysis-chart-demo"}
                        symbol={chartSymbol}
                        theme={Themes.DARK}
                        locale="kr"
                        autosize
                        timezone="Asia/Seoul"
                        allow_symbol_change={false}
                      />
                    </div>

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
                  </div>

                  <div className="actionBox">
                    <div className="timeBox contBox">
                      <div className="key">
                        <p>Time</p>

                        <button className="infoBtn">
                          <img src={I_qnaWhite} alt="" />

                          <span className="hoverPopup">
                            <p>
                              Set the time (UTC+2) when your trading operation
                              will be dosed. By placing a “Higher” or “Lower”
                              forecast you will receve the result exactly at
                              17.05.2022 11:45:16.
                            </p>
                          </span>
                        </button>
                      </div>

                      <div className="value">
                        <button
                          className="contBtn"
                          onClick={() => setTimePopup(true)}
                        >
                          <p>00:01:00</p>

                          <img src={I_flagWhite} alt="" />
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
                      <div className="key">
                        <p>Amount</p>

                        <button className="infoBtn" onClick={() => {}}>
                          <img src={I_qnaWhite} alt="" />

                          <span className="hoverPopup">
                            <p>
                              Specify the percentage of the trading account
                              balance used calculate your trade amount.
                            </p>
                          </span>
                        </button>
                      </div>

                      <div className="value">
                        <p className="unit">$</p>
                        <input
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                        />

                        <img src={I_percentWhite} alt="" />
                      </div>
                    </div>

                    <span className="btnBox" onMouseMove={onMouseOverBtn}>
                      <button
                        className="highBtn"
                        disabled={!amount}
                        onClick={() => onClickPayBtn("high")}
                      >
                        <span className="defaultBox">
                          <img src={I_highArwGreen} alt="" />
                          <strong>HIGH</strong>
                        </span>

                        <span className="hoverBox">
                          <strong className="percent">+80%</strong>
                          <p className="amount">400536157.70</p>

                          <p className="hoverPopup" ref={hoverRef1}>
                            Dividend rate : +80% 400536157.70 USD
                          </p>
                        </span>
                      </button>
                    </span>

                    <span className="btnBox" onMouseMove={onMouseOverBtn}>
                      <button
                        className="lowBtn"
                        disabled={!amount}
                        onClick={() => onClickPayBtn("low")}
                      >
                        <span className="defaultBox">
                          <img src={I_lowArwRed} alt="" />
                          <strong>LOW</strong>
                        </span>

                        <span className="hoverBox">
                          <strong className="percent">+80%</strong>
                          <p className="amount">400536157.70</p>

                          <p className="hoverPopup" ref={hoverRef2}>
                            Dividend rate : +80% 400536157.70 USD
                          </p>
                        </span>
                      </button>
                    </span>
                  </div>

                  <DetBox mode={detMode} />

                  <button
                    className={`${detMode && "on"} plusBtn`}
                    onClick={() => setDetMode(!detMode)}
                  >
                    <img src={I_plusWhite} alt="" />
                  </button>
                </article>
              </section>

              <footer>
                <button className="qnaBtn" onClick={() => {}}>
                  <img src={I_qnaWhite} alt="" />
                </button>

                <button className="langBtn" onClick={() => {}}>
                  <img src={I_langWhite} alt="" />
                </button>
              </footer>
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
                <MyBalancePopup
                  off={setMyBalancePopup}
                  setAddPopup={setAddPopup}
                />
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
        padding: 17.2vw 0 0;

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

              input {
                width: 100%;
              }

              .contBtn {
                display: flex;
                align-items: center;
                width: 100%;
                height: 100%;

                p {
                  flex: 1;
                  text-align: start;
                }
              }

              img {
                height: 5.55vw;
              }
            }
          }
        }

        .btnCont {
          display: flex;
          gap: 3.33vw;

          .btnBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.66vw;

            &.low {
              color: #ff5353;

              button {
                border-color: #ff5353;
                background: rgba(255, 83, 83, 0.2);
              }
            }

            &.high {
              color: #3fb68b;

              button {
                border-color: #3fb68b;
                background: rgba(63, 182, 139, 0.2);
              }
            }

            button {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 5.55vw;
              width: 100%;
              height: 13.33vw;
              font-size: 4.44vw;
              font-weight: 700;
              border: 1.2px solid;
              border-radius: 8px;
            }

            .rate {
              font-size: 3.88vw;
            }
          }
        }
      }
    }
  }
`;

const PbetBox = styled.main`
  height: 100vh;
  padding: 0 30px 0;
  color: #fff;
  background: #0a0e17;
  overflow-y: scroll;

  .innerBox {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 60px 0 30px 0;

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
        overflow: hidden;
        position: relative;

        .chart {
          position: absolute;
          width: calc(100% + 2px);
          height: calc(100% + 2px);
          top: -1px;
          left: -1px;
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
      }

      .actionBox {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-width: 180px;
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
            gap: 4px;
            height: 48px;
            padding: 0 18px;
            font-size: 16px;
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 8px;
            position: relative;

            input {
              flex: 1;
            }

            .contBtn {
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;

              p {
                flex: 1;
                text-align: start;
              }
            }

            img {
              height: 20px;
            }
          }
        }

        .btnBox {
          width: 100%;

          button {
            width: 100%;
            height: 48px;
            font-size: 16px;
            border: 1.2px solid;
            border-radius: 8px;
            position: relative;

            .defaultBox {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 20px;
            }

            .hoverBox {
              display: none;

              .hoverPopup {
                padding: 10px;
                font-size: 12px;
                color: #fff;
                white-space: nowrap;
                background: rgba(0, 0, 0, 0.4);
                border-radius: 4px;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                position: fixed;
                transform: translate(-100%, 0);
              }
            }

            &:hover {
              .defaultBox {
                display: none;
              }

              .hoverBox {
                display: block;

                .percent {
                }

                .amount {
                  font-size: 12px;
                }
              }
            }

            &.highBtn {
              color: #3fb68b;
              border-color: #3fb68b;

              &:hover {
                background: rgba(63, 182, 139, 0.2);
                box-shadow: 0px 0px 10px rgba(63, 182, 139, 0.6);
              }
            }

            &.lowBtn {
              color: #ff5353;
              border-color: #ff5353;

              &:hover {
                background: rgba(255, 83, 83, 0.2);
                box-shadow: 0px 0px 10px rgba(255, 83, 83, 0.6);
              }
            }
          }
        }
      }

      & > .plusBtn {
        display: flex;
        align-items: flex-start;
        min-width: 40px;
        width: 40px;
        height: 50px;
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
  }

  footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 14px;
    padding: 0 0 30px;

    button {
      img {
        height: 22px;
      }
    }
  }
`;
