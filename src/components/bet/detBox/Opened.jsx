import moment from "moment";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { D_openedList } from "../../../data/D_bet";
import I_highArwGreen from "../../../img/icon/I_highArwGreen.svg";
import I_lowArwRed from "../../../img/icon/I_lowArwRed.svg";

export default function Opened({ data }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  function getIcon(type) {
    switch (type) {
      case 2:
        return I_highArwGreen;
      case 1:
        return I_lowArwRed;
      default:
        break;
    }
  }

  if (isMobile)
    return (
      <MopenedBox className="detContList">
        {data &&
          data.map((v, i) => (
            <li key={i}>
              <details>
                <summary>
                  <div className="contBox">
                    <p className="token">Bitcoin</p>
                    {/* <p className="token">{v.token}</p> */}

                    <p className="percent">{`5%`}</p>
                    {/* <p className="percent">{`${v.percent}%`}</p> */}
                  </div>

                  <div className="contBox">
                    <span className="forecast">
                      <img src={getIcon(v.side)} alt="" />
                      <p>{`$${v.amount}`}</p>
                    </span>

                    <p
                      className={`${1.05 > 0 && "plus"} ${
                        1.05 < 0 && "minus"
                      } benefit`}
                    >{`$${(1.05).toFixed(2)}`}</p>
                    {/* <p
                      className={`${v.benefit > 0 && "plus"} ${
                        v.benefit < 0 && "minus"
                      } benefit`}
                       >{`$${v.benefit?.toFixed(2)}`}</p> */}

                    <p className="time">
                      {moment(v.createdat).format("mm:ss")}
                    </p>
                    {/* <p className="time">{moment(v.time).format("mm:ss")}</p> */}
                  </div>
                </summary>

                <div className="openBox">
                  <div className="timeBox">
                    <ul className="timeList">
                      <li>
                        <p className="key">Open time</p>
                        <p className="value">
                          {moment(v.createdat).format("hh:mm:ss")}
                          {/* {moment(v.det?.openTime).format("hh:mm:ss")} */}
                        </p>
                      </li>

                      <li>
                        <p>{"M5"}</p>
                        {/* <p>{v.det?.limit}</p> */}
                      </li>

                      <li>
                        <p className="key">ClosingTime</p>
                        <p className="value">
                          {moment(v.createdat).format("hh:mm:ss")}
                          {/* {moment(v.det?.closingTime).format("hh:mm:ss")} */}
                        </p>
                      </li>
                    </ul>

                    <div className="barBox">
                      <div className="bar">
                        <div />
                      </div>

                      <p className="left">{`Time left : ${moment(
                        v.createdat
                      ).format("mm:ss")}`}</p>
                      {/* <p className="left">{`Time left : ${moment(v.time).format(
                        "mm:ss"
                      )}`}</p> */}
                    </div>
                  </div>

                  <div className="resBox">
                    <div className="detResBox">
                      <ul className="forcastList">
                        <li>
                          <p className="key">Your forecast</p>
                          <p className="value">{"Higher"}</p>
                          {/* <p className="value">{v.forcast?.type}</p> */}
                        </li>
                        <li>
                          <p className="key">Payout</p>
                          <p className="value">{`$${(0).toFixed(2)}`}</p>
                          {/* <p className="value">{`$${v.forcast?.payout?.toFixed(
                            2
                          )}`}</p> */}
                        </li>
                        <li>
                          <p className="key">Profit</p>
                          <p className="value">{`$${(0).toFixed(2)}`}</p>
                          {/* <p className="value">{`$${v.forcast?.profit?.toFixed(
                            2
                          )}`}</p> */}
                        </li>
                      </ul>

                      <ul className="priceList">
                        <li>
                          <p className="key">Open price</p>

                          <p className="value">{29781}</p>
                          {/* <p className="value">{v.starttickerprice}</p> */}
                        </li>
                        <li>
                          <p className="key">Current price</p>

                          <p className="value">{29746}</p>
                          {/* <p className="value">{v.endtickerprice}</p> */}
                        </li>
                        <li>
                          <p className="key">Difference</p>

                          <p className="value point">{`${-1} points`}</p>
                          {/* <p className="value point">{`${v.price?.diff} points`}</p> */}
                        </li>
                      </ul>
                    </div>

                    <button
                      className="getBtn"
                      onClick={() => {}}
                    >{`Get $${(30).toFixed(2)}`}</button>
                    {/* >{`Get $${(30).toFixed(2)}`}</button> */}
                  </div>
                </div>
              </details>
            </li>
          ))}
      </MopenedBox>
    );
  else
    return (
      <PopenedBox className="detContList">
        {data &&
          data.map((v, i) => (
            <li key={i}>
              <details>
                <summary>
                  <div className="contBox">
                    <p className="token">Bitcoin</p>
                    {/* <p className="token">{v.token}</p> */}

                    <p className="percent">{`5%`}</p>
                    {/* <p className="percent">{`${v.percent}%`}</p> */}
                  </div>

                  <div className="contBox">
                    <span className="forecast">
                      <img src={getIcon(v.side)} alt="" />
                      <p>{`$${v.amount}`}</p>
                    </span>

                    <p
                      className={`${1.05 > 0 && "plus"} ${
                        1.05 < 0 && "minus"
                      } benefit`}
                    >{`$${(1.05).toFixed(2)}`}</p>
                    {/* <p
                      className={`${v.benefit > 0 && "plus"} ${
                        v.benefit < 0 && "minus"
                      } benefit`}
                       >{`$${v.benefit?.toFixed(2)}`}</p> */}

                    <p className="time">
                      {moment(v.createdat).format("mm:ss")}
                    </p>
                    {/* <p className="time">{moment(v.time).format("mm:ss")}</p> */}
                  </div>
                </summary>

                <div className="openBox">
                  <div className="timeBox">
                    <ul className="timeList">
                      <li>
                        <p className="key">Open time</p>
                        <p className="value">
                          {moment(v.createdat).format("hh:mm:ss")}
                          {/* {moment(v.det?.openTime).format("hh:mm:ss")} */}
                        </p>
                      </li>

                      <li>
                        <p>{"M5"}</p>
                        {/* <p>{v.det?.limit}</p> */}
                      </li>

                      <li>
                        <p className="key">ClosingTime</p>
                        <p className="value">
                          {moment(v.createdat).format("hh:mm:ss")}
                          {/* {moment(v.det?.closingTime).format("hh:mm:ss")} */}
                        </p>
                      </li>
                    </ul>

                    <div className="barBox">
                      <div className="bar">
                        <div />
                      </div>

                      <p className="left">{`Time left : ${moment(
                        v.createdat
                      ).format("mm:ss")}`}</p>
                      {/* <p className="left">{`Time left : ${moment(v.time).format(
                        "mm:ss"
                      )}`}</p> */}
                    </div>
                  </div>

                  <div className="resBox">
                    <div className="detResBox">
                      <ul className="forcastList">
                        <li>
                          <p className="key">Your forecast</p>
                          <p className="value">{"Higher"}</p>
                          {/* <p className="value">{v.forcast?.type}</p> */}
                        </li>
                        <li>
                          <p className="key">Payout</p>
                          <p className="value">{`$${(0).toFixed(2)}`}</p>
                          {/* <p className="value">{`$${v.forcast?.payout?.toFixed(
                            2
                          )}`}</p> */}
                        </li>
                        <li>
                          <p className="key">Profit</p>
                          <p className="value">{`$${(0).toFixed(2)}`}</p>
                          {/* <p className="value">{`$${v.forcast?.profit?.toFixed(
                            2
                          )}`}</p> */}
                        </li>
                      </ul>

                      <ul className="priceList">
                        <li>
                          <p className="key">Open price</p>

                          <p className="value">{29781}</p>
                          {/* <p className="value">{v.starttickerprice}</p> */}
                        </li>
                        <li>
                          <p className="key">Current price</p>

                          <p className="value">{29746}</p>
                          {/* <p className="value">{v.endtickerprice}</p> */}
                        </li>
                        <li>
                          <p className="key">Difference</p>

                          <p className="value point">{`${-1} points`}</p>
                          {/* <p className="value point">{`${v.price?.diff} points`}</p> */}
                        </li>
                      </ul>
                    </div>

                    <button
                      className="getBtn"
                      onClick={() => {}}
                    >{`Get $${(30).toFixed(2)}`}</button>
                    {/* >{`Get $${(30).toFixed(2)}`}</button> */}
                  </div>
                </div>
              </details>
            </li>
          ))}
      </PopenedBox>
    );
}

const MopenedBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;

  li {
    details {
      padding: 14px 16px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.2);

      &[open] {
        border-color: transparent;
        box-shadow: unset;
      }

      summary {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 14px;

        .contBox {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .forecast {
            display: flex;
            align-items: center;
            gap: 4px;

            img {
              height: 8px;
            }
          }

          .benefit {
            &.plus {
              color: #3fb68b;
            }

            &.minus {
              color: #ff5353;
            }
          }
        }
      }

      .openBox {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin: 14px 0 0 0;

        .timeBox {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .timeList {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 16px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.4);
            background: #111722;
            border-radius: 6px;

            li {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }

          .barBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            font-size: 12px;

            .bar {
              width: 100%;
              height: 4px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;

              div {
                width: 20%;
                height: 100%;
                background: rgba(255, 255, 255, 0.4);
                border-radius: inherit;
              }
            }

            .left {
            }
          }
        }

        .resBox {
          display: flex;
          flex-direction: column;
          gap: 12px;

          .detResBox {
            padding: 14px 16px;
            background: #111722;
            border-radius: 6px;

            .forcastList {
              display: flex;
              flex-direction: column;
              gap: 4px;
              padding: 0 0 12px 0;

              li {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.4);
              }
            }

            .priceList {
              display: flex;
              flex-direction: column;
              gap: 4px;
              padding: 12px 0 0 0;
              border-top: 1px solid rgba(255, 255, 255, 0.4);

              li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;

                .point {
                  color: #ff5353;
                }
              }
            }
          }

          .getBtn {
            height: 40px;
            font-size: 14px;
            color: #f7ab1f;
            background: rgba(247, 171, 31, 0.1);
            border-radius: 6px;

            &:hover {
              color: #4e3200;
              background: #f7ab1f;
            }
          }
        }
      }
    }
  }
`;

const PopenedBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;

  li {
    details {
      padding: 14px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.2);

      &[open] {
        border-color: transparent;
        box-shadow: unset;
      }

      summary {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 14px;

        .contBox {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .forecast {
            display: flex;
            align-items: center;
            gap: 4px;

            img {
              height: 10px;
            }
          }

          .benefit {
            &.plus {
              color: #3fb68b;
            }

            &.minus {
              color: #ff5353;
            }
          }
        }
      }

      .openBox {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin: 14px 0 0 0;

        .timeBox {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .timeList {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.4);
            background: #111722;
            border-radius: 6px;

            li {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          }

          .barBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            font-size: 12px;

            .bar {
              width: 100%;
              height: 4px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;

              div {
                width: 20%;
                height: 100%;
                background: rgba(255, 255, 255, 0.4);
                border-radius: inherit;
              }
            }

            .left {
            }
          }
        }

        .resBox {
          display: flex;
          flex-direction: column;
          gap: 12px;

          .detResBox {
            padding: 14px;
            background: #111722;
            border-radius: 6px;

            .forcastList {
              display: flex;
              flex-direction: column;
              gap: 4px;
              padding: 0 0 12px 0;

              li {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.4);
              }
            }

            .priceList {
              display: flex;
              flex-direction: column;
              gap: 4px;
              padding: 12px 0 0 0;
              border-top: 1px solid rgba(255, 255, 255, 0.4);

              li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;

                .point {
                  color: #ff5353;
                }
              }
            }
          }

          .getBtn {
            height: 34px;
            font-size: 14px;
            color: #f7ab1f;
            background: rgba(247, 171, 31, 0.1);
            border-radius: 6px;

            &:hover {
              color: #4e3200;
              background: #f7ab1f;
            }
          }
        }
      }
    }
  }
`;
