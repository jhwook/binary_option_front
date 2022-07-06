import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import { D_tokenCategoryList } from "../../data/D_bet";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import I_starYellowO from "../../img/icon/I_starYellowO.svg";
import I_qnaWhite from "../../img/icon/I_qnaWhite.svg";
import I_langWhite from "../../img/icon/I_langWhite.svg";
import I_flagWhite from "../../img/icon/I_flagWhite.svg";
import I_percentWhite from "../../img/icon/I_percentWhite.svg";
import I_highArwGreen from "../../img/icon/I_highArwGreen.svg";
import I_lowArwRed from "../../img/icon/I_lowArwRed.svg";
import I_plusWhite from "../../img/icon/I_plusWhite.svg";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import I_barChartWhite from "../../img/icon/I_barChartWhite.svg";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LiveTradePopup from "../../components/bet/LiveTradePopup";
import PopupBg from "../../components/common/PopupBg";
import TokenPopup from "../../components/bet/TokenPopup";
import { useDispatch, useSelector } from "react-redux";
import TimePopup from "../../components/bet/TimePopup";
import { setToast } from "../../util/Util";
import DetBox from "../../components/bet/detBox/DetBox";
import InsufficientPopup from "../../components/bet/InsufficientPopup";
import MyBalancePopup from "../../components/header/MyBalancePopup";
import AddPopup from "../../components/header/AddPopup";
import ReactTradingviewWidget, { Themes } from "react-tradingview-widget";
import axios from "axios";
import { API } from "../../configs/api";
import LoadingBar from "../../components/common/LoadingBar";

export default function Demo() {
  const hoverRef1 = useRef();
  const hoverRef2 = useRef();
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.common.isMobile);

  const token = localStorage.getItem("token");

  const [assetInfo, setAssetInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [tokenPopup, setTokenPopup] = useState(false);
  const [duration, setDuration] = useState(1);
  const [timePopup, setTimePopup] = useState(false);
  const [detMode, setDetMode] = useState(false);
  const [insufficientPopup, setInsufficientPopup] = useState(false);
  const [myBalancePopup, setMyBalancePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [bookMark, setBookMark] = useState([]);

  function getAssetList() {
    axios
      .get(`${API.GET_ASSETS}`, {
        params: { group: D_tokenCategoryList[1].value },
      })
      .then(({ data }) => {
        console.log(data.respdata);
        setAssetInfo(data.respdata[0]);
      })
      .catch((err) => console.error(err));
  }

  function turnLoader() {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }

  function handleKeyDown(e) {
    if (e.key === "W" && e.shiftKey) {
      console.log("A");
    }
  }

  async function getBalance() {
    const token = localStorage.getItem("token");
    if (!token) return;

    return axios.get(`${API.USER_BALANCE}`);
  }

  async function chkBalance() {
    const balance = await getBalance();
    console.log(balance.data.respdata);

    if (balance.data.respdata.LIVE.avail/10**6 < amount) {
      setInsufficientPopup(true);
      throw "Not Balance";
    }
  }

  async function onClickPayBtn(type) {
    let typeForPost;

    try {
      if ((await chkBalance()) === -1) return;

      switch (type) {
        case "high":
          typeForPost = 1;
          break;

        case "low":
          typeForPost = 0;
          break;

        default:
          break;
      }
    } catch (err) {
      console.error(err);
      return;
    }

    axios
      .post(
        `${API.BETS}/DEMO/${assetInfo.id}/${amount}/${duration}/${typeForPost}`
      )
      .then((res) => {
        console.log(res);
        setToast({ type, amount });
      })
      .catch((err) => console.error(err));

    // setToast({ type: "closed" });
  }

  function getBookMark() {
    axios
      .get(API.BOOKMARKS_MY)
      .then(({ data }) => {
        console.log(data.respdata);
        setBookMark(data.respdata);
      })
      .catch((err) => console.error(err));
  }

  function onMouseOverBtn(e) {
    hoverRef1.current.style.left = `${e.clientX}px`;
    hoverRef1.current.style.top = `${e.clientY}px`;
    hoverRef2.current.style.left = `${e.clientX}px`;
    hoverRef2.current.style.top = `${e.clientY}px`;
  }

  useLayoutEffect(() => {
    localStorage.setItem("balanceType", "Demo");

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      localStorage.setItem("balanceType", "Live");
    };
  }, []);

  useEffect(() => {
    getAssetList();

    getBookMark();

    turnLoader();
  }, []);

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
                      symbol={assetInfo.dispSymbol}
                      theme={Themes.DARK}
                      locale="kr"
                      autosize
                      interval="1"
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
                            <p>{assetInfo.name}</p>
                            <img src={I_dnPolWhite} alt="" />
                          </button>

                          {tokenPopup && (
                            <>
                              <TokenPopup
                                off={setTokenPopup}
                                setAssetInfo={setAssetInfo}
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
                            <p>
                              {`${Math.floor(duration / 60)}`.padStart(2, "0")}:
                              {`${duration % 60}`.padStart(2, "0")}
                              :00
                            </p>

                            <img src={I_flagWhite} alt="" />
                          </button>

                          {timePopup && (
                            <>
                              <TimePopup
                                off={setTimePopup}
                                duration={duration}
                                setDuration={setDuration}
                              />
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

            {insufficientPopup && (
              <>
                <InsufficientPopup
                  off={setInsufficientPopup}
                  amount={amount}
                  type="Demo"
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
                      <p>{assetInfo.name}</p>
                      <img src={I_dnPolWhite} alt="" />
                    </button>

                    {tokenPopup && (
                      <>
                        <TokenPopup
                          off={setTokenPopup}
                          setAssetInfo={setAssetInfo}
                          getBookMark={getBookMark}
                        />
                        <PopupBg off={setTokenPopup} />
                      </>
                    )}
                  </div>

                  <ul className="tokenList">
                    {bookMark.map((v, i) => (
                      <li key={i} onClick={() => setAssetInfo(v.asset)}>
                        <img src={I_starYellowO} alt="" />
                        <span className="textBox">
                          <p className="key">{v.asset.name}</p>
                          {/* <p className="value">{v.payout}%</p> */}
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
                        symbol={assetInfo.dispSymbol}
                        theme={Themes.DARK}
                        locale="kr"
                        autosize
                        interval="1"
                        timezone="Asia/Seoul"
                        allow_symbol_change={false}
                      />
                    </div>
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
                          <p>
                            {`${Math.floor(duration / 60)}`.padStart(2, "0")}:
                            {`${duration % 60}`.padStart(2, "0")}:00
                          </p>

                          <img src={I_flagWhite} alt="" />
                        </button>

                        {timePopup && (
                          <>
                            <TimePopup
                              off={setTimePopup}
                              duration={duration}
                              setDuration={setDuration}
                            />
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

            {insufficientPopup && (
              <>
                <InsufficientPopup
                  off={setInsufficientPopup}
                  amount={amount}
                  type="Demo"
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
  padding: 56px 0 0;
  color: #fff;
  background: #0a0e17;

  .innerBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;

    .contArea {
      flex: 1;
      display: flex;
      flex-direction: column;

      .chartBox {
        flex: 1;
        background: #181c25;
        position: relative;
        padding: 62px 0 0;

        .utilBox {
          display: flex;
          justify-content: space-between;
          align-items: center;
          top: 14px;
          left: 16px;
          right: 16px;
          position: absolute;

          .btnList {
            display: flex;
            gap: 8px;

            & > li {
              position: relative;

              .tokenBtn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 112px;
                height: 34px;
                padding: 0 16px;
                font-size: 14px;
                font-weight: 700;
                border: 1px solid #fff;
                border-radius: 20px;

                img {
                  width: 8px;
                }
              }

              .chartBtn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 34px;
                aspect-ratio: 1;
                border: 1px solid #fff;
                border-radius: 50%;

                img {
                  height: 14px;
                }
              }
            }
          }

          .detBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 34px;
            aspect-ratio: 1;
            border: 1px solid #fff;
            border-radius: 50%;

            img {
              height: 14px;
            }
          }
        }
      }

      .actionBox {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px 16px 24px 16px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.14) 0%,
          rgba(10, 14, 23, 0.14) 100%
        );
        border-radius: 20px 20px 0 0;

        .infoBox {
          display: flex;
          gap: 12px;

          .contBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 6px;

            .key {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.4);
            }

            .value {
              display: flex;
              align-items: center;
              height: 40px;
              padding: 0 14px;
              font-size: 16px;
              border: 1px solid rgba(255, 255, 255, 0.4);
              border-radius: 8px;
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
                height: 20px;
              }
            }
          }
        }

        .btnCont {
          display: flex;
          gap: 12px;

          .btnBox {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;

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
              gap: 20px;
              width: 100%;
              height: 48px;
              font-size: 16px;
              font-weight: 700;
              border: 1.2px solid;
              border-radius: 8px;

              img {
                width: 12px;
              }
            }

            .rate {
              font-size: 14px;
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
          cursor: pointer;

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
        align-items: center;
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
