import { useState } from "react";
import styled from "styled-components";

export default function Notifications() {
  const [toggleList, setToggleList] = useState(new Array(5).fill(false));

  function onClickToggleBtn(i) {
    let dataList = toggleList;
    dataList[i] = !dataList[i];

    setToggleList([...dataList]);
  }

  return (
    <>
      <NotificationsBox>
        <section className="innerBox">
          <article className="titleArea">
            <strong className="title">Notification settings</strong>
            <p className="explain">
              Please select the type of notifications you want to receive from
              this account
            </p>
          </article>

          <article className="contArea">
            <ul className="optList">
              <li>
                <div className="key">
                  <p className="title">Notifications</p>
                  <p className="explain">
                    Please select the type of notifications you want to receive
                    from this account
                  </p>
                </div>

                <button
                  className={`${toggleList[0] && "on"} toggleBtn`}
                  onClick={() => onClickToggleBtn(0)}
                >
                  <p className="on">on</p>
                  <span />
                  <p className="off">off</p>
                </button>
              </li>

              <li>
                <div className="key">
                  <p className="title">Notifications</p>
                  <p className="explain">
                    Please select the type of notifications you want to receive
                    from this account
                  </p>
                </div>

                <button
                  className={`${toggleList[1] && "on"} toggleBtn`}
                  onClick={() => onClickToggleBtn(1)}
                >
                  <p className="on">on</p>
                  <span />
                  <p className="off">off</p>
                </button>
              </li>

              <li>
                <div className="key">
                  <p className="title">Notifications</p>
                  <p className="explain">
                    Please select the type of notifications you want to receive
                    from this account
                  </p>
                </div>

                <button
                  className={`${toggleList[2] && "on"} toggleBtn`}
                  onClick={() => onClickToggleBtn(2)}
                >
                  <p className="on">on</p>
                  <span />
                  <p className="off">off</p>
                </button>
              </li>

              <li>
                <div className="key">
                  <p className="title">Notifications</p>
                  <p className="explain">
                    Please select the type of notifications you want to receive
                    from this account
                  </p>
                </div>

                <button
                  className={`${toggleList[3] && "on"} toggleBtn`}
                  onClick={() => onClickToggleBtn(3)}
                >
                  <p className="on">on</p>
                  <span />
                  <p className="off">off</p>
                </button>
              </li>

              <li>
                <div className="key">
                  <p className="title">Notifications</p>
                  <p className="explain">
                    Please select the type of notifications you want to receive
                    from this account
                  </p>
                </div>

                <button
                  className={`${toggleList[4] && "on"} toggleBtn`}
                  onClick={() => onClickToggleBtn(4)}
                >
                  <p className="on">on</p>
                  <span />
                  <p className="off">off</p>
                </button>
              </li>
            </ul>

            <button className="saveBtn" onClick={() => {}}>
              Save
            </button>
          </article>
        </section>
      </NotificationsBox>
    </>
  );
}

const NotificationsBox = styled.main`
  height: 100%;
  padding: 70px 140px;
  overflow-y: scroll;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 40px;

    .titleArea {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 618px;

      .title {
        font-size: 24px;
      }

      .explain {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 900px;
      padding: 34px 40px 60px;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;

      .optList {
        li {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);

          &:first-of-type {
            padding: 0 0 20px 0;
          }

          .key {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .title {
              font-size: 18px;
            }

            .explain {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.6);
            }
          }

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

      .saveBtn {
        width: 200px;
        height: 56px;
        font-size: 18px;
        font-weight: 700;
        background: rgba(247, 171, 31, 0.1);
        border: 1.4px solid #f7ab1f;
        border-radius: 12px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4);
      }
    }
  }
`;
