import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";

export default function Notifications() {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [toggleList, setToggleList] = useState(new Array(5).fill(false));

  function onClickToggleBtn(i) {
    let dataList = toggleList;
    dataList[i] = !dataList[i];

    setToggleList([...dataList]);
  }

  if (isMobile)
    return (
      <>
        <DefaultHeader title="Notification" />

        <MnotificationsBox>
          <section className="innerBox">
            <article className="contArea">
              <ul className="optList">
                <li>
                  <div className="topBar">
                    <p className="title">Position End Notification</p>

                    <button
                      className={`${toggleList[0] && "on"} toggleBtn`}
                      onClick={() => onClickToggleBtn(0)}
                    >
                      <p className="on">on</p>
                      <span />
                      <p className="off">off</p>
                    </button>
                  </div>

                  <div className="key">
                    <p className="explain">Notification when position closes</p>
                  </div>
                </li>

                <li>
                  <div className="topBar">
                    <p className="title">Orders request successful</p>

                    <button
                      className={`${toggleList[1] && "on"} toggleBtn`}
                      onClick={() => onClickToggleBtn(1)}
                    >
                      <p className="on">on</p>
                      <span />
                      <p className="off">off</p>
                    </button>
                  </div>

                  <div className="key">
                    <p className="explain">Confirmation window for orders</p>
                  </div>
                </li>

                <li>
                  <div className="topBar">
                    <p className="title">Email notifications</p>

                    <button
                      className={`${toggleList[2] && "on"} toggleBtn`}
                      onClick={() => onClickToggleBtn(2)}
                    >
                      <p className="on">on</p>
                      <span />
                      <p className="off">off</p>
                    </button>
                  </div>

                  <div className="key">
                    <p className="explain">Subscribe to Betbit updates</p>
                  </div>
                </li>

                <li>
                  <div className="topBar">
                    <p className="title">Latest news</p>

                    <button
                      className={`${toggleList[3] && "on"} toggleBtn`}
                      onClick={() => onClickToggleBtn(3)}
                    >
                      <p className="on">on</p>
                      <span />
                      <p className="off">off</p>
                    </button>
                  </div>

                  <div className="key">
                    <p className="explain">
                      Promotion: Our latest events, offers and more
                    </p>
                  </div>
                </li>

                <li>
                  <div className="topBar">
                    <p className="title">Questions</p>

                    <button
                      className={`${toggleList[4] && "on"} toggleBtn`}
                      onClick={() => onClickToggleBtn(4)}
                    >
                      <p className="on">on</p>
                      <span />
                      <p className="off">off</p>
                    </button>
                  </div>

                  <div className="key">
                    <p className="explain">
                      Notification of answers to support team inquiries
                    </p>
                  </div>
                </li>
              </ul>

              <button className="saveBtn" onClick={() => {}}>
                Save
              </button>
            </article>
          </section>
        </MnotificationsBox>
      </>
    );
  else
    return (
      <>
        <PnotificationsBox>
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
                    <p className="title">Position End Notification</p>
                    <p className="explain">Notification when position closes</p>
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
                    <p className="title">Orders request successful</p>
                    <p className="explain">Confirmation window for orders</p>
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
                    <p className="title">Email notifications</p>
                    <p className="explain">Subscribe to Betbit updates</p>
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
                    <p className="title">Latest news</p>
                    <p className="explain">
                      Promotion: Our latest events, offers and more
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
                    <p className="title">Questions</p>
                    <p className="explain">
                      Notification of answers to support team inquiries
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
        </PnotificationsBox>
      </>
    );
}

const MnotificationsBox = styled.main`
  .innerBox {
    height: 100%;
    overflow-y: scroll;
    padding: 20px;

    .contArea {
      display: flex;
      flex-direction: column;
      padding: 24px 20px;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;

      .optList {
        li {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.2);

          &:first-of-type {
            padding: 0 0 14px 0;
            border: none;
          }

          .topBar {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
              font-size: 16px;
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
      }

      .saveBtn {
        width: 100%;
        height: 50px;
        margin: 16px 0 0 0;
        font-size: 18px;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.1);
        border: 1.4px solid #fff;
        border-radius: 12px;
      }
    }
  }
`;

const PnotificationsBox = styled.main`
  flex: 1;
  padding: 70px 140px;

  @media (max-width: 1440px) {
    padding: 70px 40px 70px 80px;
  }

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: 100%;
    overflow-y: scroll;

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
        background: rgba(255, 255, 255, 0.1);
        border: 1.4px solid #fff;
        border-radius: 12px;
      }
    }
  }
`;
