import styled from "styled-components";
import { useState } from "react";
import { D_chartTypeList, D_timeList } from "../../data/D_bet";
import { useSelector } from "react-redux";

export default function ChartPopup({ off }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [type, setType] = useState(D_chartTypeList[0].text);
  const [time, setTime] = useState(D_timeList[0]);
  const [toggleList, setToggleList] = useState(new Array(2).fill(false));

  function onClickToggleBtn(i) {
    let dataList = toggleList;
    dataList[i] = !dataList[i];

    setToggleList([...dataList]);
  }

  if (isMobile)
    return (
      <MchartPopupBox>
        <article className="typeArea">
          <p className="key">Chart types</p>
          <ul className="value">
            {D_chartTypeList.map((v, i) => (
              <li
                key={i}
                className={`${type === v.text && "on"}`}
                onClick={() => setType(v.text)}
              >
                <img src={v.icon} alt="" />
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="timeArea">
          <p className="key">Time frames</p>

          <ul className="value">
            {D_timeList.map((v, i) => (
              <li
                key={i}
                className={`${time === v && "on"}`}
                onClick={() => setTime(v)}
              >
                <strong>{v}</strong>
              </li>
            ))}
          </ul>
        </article>

        <article className="setArea">
          <p className="key">Settings</p>

          <ul className="value">
            {type === "Line" && (
              <>
                <li>
                  <button
                    className={`${toggleList[0] && "on"} toggleBtn`}
                    onClick={() => onClickToggleBtn(0)}
                  >
                    <p className="on">on</p>
                    <span />
                    <p className="off">off</p>
                  </button>

                  <p className="setCont">Show area</p>
                </li>

                <li />
              </>
            )}

            {type === "Candles" && (
              <>
                <li>
                  <button
                    className={`${toggleList[0] && "on"} toggleBtn`}
                    onClick={() => onClickToggleBtn(0)}
                  >
                    <p className="on">on</p>
                    <span />
                    <p className="off">off</p>
                  </button>

                  <p className="setCont">Enable timer</p>
                </li>
                <li>
                  <button
                    className={`${toggleList[0] && "on"} toggleBtn`}
                    onClick={() => onClickToggleBtn(0)}
                  >
                    <p className="on">on</p>
                    <span />
                    <p className="off">off</p>
                  </button>

                  <p className="setCont">Enable grid snap</p>
                </li>
              </>
            )}

            {type === "Heiken Ashi" && (
              <>
                <li>
                  <button
                    className={`${toggleList[0] && "on"} toggleBtn`}
                    onClick={() => onClickToggleBtn(0)}
                  >
                    <p className="on">on</p>
                    <span />
                    <p className="off">off</p>
                  </button>

                  <p className="setCont">Enable timer</p>
                </li>
                <li>
                  <button
                    className={`${toggleList[0] && "on"} toggleBtn`}
                    onClick={() => onClickToggleBtn(0)}
                  >
                    <p className="on">on</p>
                    <span />
                    <p className="off">off</p>
                  </button>

                  <p className="setCont">Enable grid snap</p>
                </li>
              </>
            )}
          </ul>
        </article>
      </MchartPopupBox>
    );
  else
    return (
      <PchartPopupBox>
        <article className="typeArea">
          <p className="key">Chart types</p>
          <ul className="value">
            {D_chartTypeList.map((v, i) => (
              <li
                key={i}
                className={`${type === v.text && "on"}`}
                onClick={() => setType(v.text)}
              >
                <img src={v.icon} alt="" />
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="timeArea">
          <p className="key">Time frames</p>

          <ul className="value">
            {D_timeList.map((v, i) => (
              <li
                key={i}
                className={`${time === v && "on"}`}
                onClick={() => setTime(v)}
              >
                <strong>{v}</strong>
              </li>
            ))}
          </ul>
        </article>

        <article className="setArea">
          <p className="key">Settings</p>

          <ul className="value">
            {type === "Line" && (
              <li>
                <button
                  className={`${toggleList[0] && "on"} toggleBtn`}
                  onClick={() => onClickToggleBtn(0)}
                >
                  <p className="on">on</p>
                  <span />
                  <p className="off">off</p>
                </button>

                <p className="setCont">Show area</p>
              </li>
            )}

            {type === "Candles" && (
              <>
                <li>
                  <button
                    className={`${toggleList[0] && "on"} toggleBtn`}
                    onClick={() => onClickToggleBtn(0)}
                  >
                    <p className="on">on</p>
                    <span />
                    <p className="off">off</p>
                  </button>

                  <p className="setCont">Enable timer</p>
                </li>
                <li>
                  <button
                    className={`${toggleList[0] && "on"} toggleBtn`}
                    onClick={() => onClickToggleBtn(0)}
                  >
                    <p className="on">on</p>
                    <span />
                    <p className="off">off</p>
                  </button>

                  <p className="setCont">Enable grid snap</p>
                </li>
              </>
            )}

            {type === "Heiken Ashi" && (
              <>
                <li>
                  <button
                    className={`${toggleList[0] && "on"} toggleBtn`}
                    onClick={() => onClickToggleBtn(0)}
                  >
                    <p className="on">on</p>
                    <span />
                    <p className="off">off</p>
                  </button>

                  <p className="setCont">Enable timer</p>
                </li>
                <li>
                  <button
                    className={`${toggleList[0] && "on"} toggleBtn`}
                    onClick={() => onClickToggleBtn(0)}
                  >
                    <p className="on">on</p>
                    <span />
                    <p className="off">off</p>
                  </button>

                  <p className="setCont">Enable grid snap</p>
                </li>
              </>
            )}
          </ul>
        </article>
      </PchartPopupBox>
    );
}

const MchartPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px 20px 0 0;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 6;

  article {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: rgba(255, 255, 255, 0.4);

    .key {
      font-size: 14px;
    }

    .value {
    }

    &.typeArea {
      .value {
        display: flex;
        gap: 10px;

        li {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          aspect-ratio: 1;
          font-size: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          cursor: pointer;

          &.on {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
            border-color: #fff;

            img {
              opacity: 1;
            }
          }

          img {
            width: 112px;
            opacity: 0.4;
          }
        }
      }
    }

    &.timeArea {
      .value {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 72px;
          height: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          cursor: pointer;

          &.on {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
            border-color: #fff;
          }
        }
      }
    }

    &.setArea {
      .value {
        display: flex;
        flex-direction: column;
        gap: 10px;

        li {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 24px;
          color: #fff;

          .toggleBtn {
            display: flex;
            align-items: center;
            width: 122px;
            height: 24px;
            padding: 3px;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            position: relative;

            &,
            * {
              transition: all 0.3s;
            }

            &.on {
              background: rgba(247, 171, 31, 0.2);

              span {
                margin: 0 0 0 34px;
                background: rgba(247, 171, 31, 0.8);
              }

              p {
                &.on {
                  opacity: 1;
                }

                &.off {
                  opacity: 0;
                }
              }
            }

            span {
              width: 18px;
              aspect-ratio: 1;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.8);
            }

            p {
              top: 50%;
              transform: translate(0, -50%);
              position: absolute;

              &.on {
                opacity: 0;
                left: 12px;
              }

              &.off {
                opacity: 1;
                right: 12px;
              }
            }
          }
        }
      }
    }
  }
`;

const PchartPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 474px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.4),
    0px 10px 40px rgba(0, 0, 0, 0.2);
  top: 46px;
  position: absolute;
  z-index: 6;

  article {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: rgba(255, 255, 255, 0.4);

    .key {
      font-size: 14px;
    }

    .value {
    }

    &.typeArea {
      .value {
        display: flex;
        gap: 14px;

        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          width: 128px;
          height: 128px;
          font-size: 14px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          cursor: pointer;

          &.on {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
            border-color: #fff;

            img {
              opacity: 1;
            }
          }

          img {
            width: 62px;
            opacity: 0.4;
          }
        }
      }
    }

    &.timeArea {
      .value {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          cursor: pointer;

          &.on {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
            border-color: #fff;
          }
        }
      }
    }

    &.setArea {
      .value {
        display: flex;
        flex-direction: column;
        gap: 10px;

        li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #fff;

          .toggleBtn {
            display: flex;
            align-items: center;
            width: 58px;
            height: 24px;
            padding: 3px;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            position: relative;

            &,
            * {
              transition: all 0.3s;
            }

            &.on {
              background: rgba(247, 171, 31, 0.2);

              span {
                margin: 0 0 0 34px;
                background: rgba(247, 171, 31, 0.8);
              }

              p {
                &.on {
                  opacity: 1;
                }

                &.off {
                  opacity: 0;
                }
              }
            }

            span {
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.8);
            }

            p {
              top: 50%;
              transform: translate(0, -50%);
              position: absolute;

              &.on {
                opacity: 0;
                left: 14px;
              }

              &.off {
                opacity: 1;
                right: 10px;
              }
            }
          }
        }
      }
    }
  }
`;
