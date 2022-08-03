import { useSelector } from "react-redux";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import T_dia from "../../img/tier/T_dia.svg";
import I_upPolGreen from "../../img/icon/I_upPolGreen.svg";
import { D_rateList } from "../../data/D_position";
import { useState } from "react";
import { setToast } from "../../util/Util";

export default function CashBack() {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [settingList, setSettingList] = useState(new Array(D_rateList.length));

  function onChangeSettingList(e, i) {
    let _settingList = settingList;
    _settingList[i] = e.target.value;

    setSettingList([..._settingList]);
  }

  function onClickSaveBtn() {
    setToast({ type: "alarm", cont: "Your changes have been saved." });
  }

  if (isMobile)
    return (
      <>
        <DefaultHeader title="My Positions" />

        <McashBackBox>
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
        </McashBackBox>
      </>
    );
  else
    return (
      <PcashBackBox>
        <section className="innerBox">
          <article className="titleArea">
            <strong className="title">Recommender Fee Rates</strong>
            <p className="explain">
              Fee setting for transaction amount by sub-account
            </p>
          </article>

          <ul className="rateList">
            {D_rateList.map((v, i) => (
              <li key={i}>
                <div className="imgBox">
                  <img src={v.img} alt="" />

                  <span className="name">{v.name}</span>
                </div>

                <div className="andBar">
                  <div className="line" />
                  <p>and</p>
                  <div className="line" />
                </div>

                <div className="setBox">
                  <div className="inputBox">
                    <input
                      value={settingList[i]}
                      onChange={(e) => onChangeSettingList(e, i)}
                    />

                    <strong className="unit">%</strong>

                    <button className="saveBtn" onClick={onClickSaveBtn}>
                      Save
                    </button>
                  </div>

                  <p className="key">{i + 1}st level</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </PcashBackBox>
    );
}

const McashBackBox = styled.main`
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

const PcashBackBox = styled.main`
  flex: 1;
  padding: 70px 140px;
  overflow-y: scroll;

  @media (max-width: 1440px) {
    max-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 36px;
    height: 100%;
    color: #fff;

    .titleArea {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .title {
        font-size: 24px;
      }

      .explain {
        font-size: 14px;
        opacity: 0.6;
      }
    }

    .rateList {
      display: flex;
      width: 1292px;
      height: 440px;
      padding: 50px 14px 44px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      overflow-x: scroll;

      li {
        flex: 1;
        padding: 0 44px;

        &:nth-of-type(n + 2) {
          border-left: 1px solid rgba(255, 255, 255, 0.14);
        }

        .imgBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 220px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 14px;
          position: relative;

          img {
            width: 78px;
          }

          .name {
            height: 34px;
            padding: 0 14px;
            font-size: 14px;
            font-weight: 700;
            line-height: 34px;
            color: #f7ab1f;
            background: rgba(247, 171, 31, 0.1);
            border: 1.4px solid #f7ab1f;
            border-radius: 20px;
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
            top: -17px;
            right: -10px;
            position: absolute;
          }
        }

        .andBar {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 14px 0 0;
          font-size: 14px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);

          .line {
            flex: 1;
            height: 1px;
            background: rgba(255, 255, 255, 0.14);
          }
        }

        .setBox {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 20px 0 0;

          .inputBox {
            display: flex;
            align-items: center;
            height: 40px;
            padding: 0 18px;
            background: rgba(0, 0, 0, 0.14);
            border-radius: 10px;

            &:focus-within {
              background: rgba(255, 255, 255, 0.1);

              .unit {
                display: none;
              }

              .saveBtn {
                display: inline-block;

                &:hover {
                  opacity: 1;
                }
              }
            }

            input {
              flex: 1;
              font-size: 14px;
            }

            .saveBtn {
              display: none;
              font-size: 14px;
              font-weight: 700;
              opacity: 0.4;
            }
          }

          .key {
            font-size: 14px;
            opacity: 0.6;
          }
        }
      }
    }
  }
`;
