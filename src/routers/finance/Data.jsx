import styled from "styled-components";
import DatePicker from "react-datepicker";
import "../../util/react-datepicker.css";
import { forwardRef, useState } from "react";
import I_calender from "../../img/icon/I_calender.png";
import I_linkWhite from "../../img/icon/I_linkWhite.svg";
import I_ltArwWhite from "../../img/icon/I_ltArwWhite.svg";
import I_rtArwWhite from "../../img/icon/I_rtArwWhite.svg";
import { D_dataList, D_dataListHeader } from "../../data/D_finance";
import moment from "moment";

export default function Data() {
  const totalPage = 4;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="dateBtn" onClick={onClick} ref={ref}>
      <img src={I_calender} alt="" />
      <p>{value}</p>
    </button>
  ));

  function dateChange(dates) {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  }

  function onClickPrePageBtn() {
    if (page > 1) setPage(page - 1);
  }

  function onClickNextPageBtn() {
    if (page < totalPage) setPage(page + 1);
  }

  return (
    <>
      <DataBox>
        <section className="innerBox">
          <article className="titleArea">
            <strong className="title">Trading Rewards Data</strong>
            <p className="explain">
              All rewards are made available through&nbsp;
              <span className="yellow">Betbit.</span>
            </p>
          </article>

          <article className="initArea">
            <ul className="initList">
              <li>
                <p className="key">Rewards Paid</p>

                <div className="value">
                  <strong className="price">100 USDT</strong>
                  <p className="time">in this epoch</p>
                </div>
              </li>

              <li>
                <p className="key">Open Interest</p>

                <div className="value">
                  <strong className="price">100 USDT</strong>
                  <p className="time">in this epoch</p>
                </div>
              </li>

              <li>
                <p className="key">Estimated Rewards</p>

                <div className="value">
                  <strong className="price">100 USDT</strong>
                  <p className="time">estimated for this epoch</p>
                </div>
              </li>
            </ul>
          </article>

          <article className="listArea">
            <div className="filterBar">
              <div className="filterBox">
                <span className="dateBox filterOpt">
                  <DatePicker
                    selected={startDate}
                    onChange={dateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    customInput={<ExampleCustomInput />}
                  />
                </span>

                <span className="searchBox filterOpt">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Order"
                  />
                </span>

                <button className="applyBtn" onClick={() => {}}>
                  Apply
                </button>
              </div>

              <button className="exportBtn" onClick={() => {}}>
                <img src={I_linkWhite} alt="" />
              </button>
            </div>

            <div className="listBox">
              <ul className="listHeader">
                {D_dataListHeader.map((v, i) => (
                  <li key={i}>
                    <p>{v}</p>
                  </li>
                ))}
              </ul>

              <ul className="list">
                {D_dataList.map((v, i) => (
                  <li key={i}>
                    <span>
                      <p>{v.account}</p>
                    </span>

                    <span>
                      <p>{v.level} Level</p>
                    </span>

                    <span>
                      <p>{moment(v.date).format("YYYY-MM-DD")}</p>
                    </span>

                    <span>
                      <p>${v.amount}</p>
                    </span>

                    <span>
                      <p className="price">${v.profit}</p>&nbsp;
                      <p className="percent">{`(${92}%)`}</p>
                    </span>

                    <span>
                      <p>{v.received} USDT</p>
                    </span>

                    <span>
                      <button className="depositBtn" onClick={() => {}}>
                        Deposit
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pageBox">
              <button
                className="arwBtn"
                disabled={page <= 1}
                onClick={onClickPrePageBtn}
              >
                <img src={I_ltArwWhite} alt="" />
              </button>

              <ul className="pageList">
                {new Array(totalPage).fill("").map((v, i) => (
                  <li
                    key={i}
                    className={`${i + 1 === page && "on"}`}
                    onClick={() => setPage(i + 1)}
                  >
                    <strong>{i + 1}</strong>
                    <span className="onBar" />
                  </li>
                ))}
              </ul>

              <button
                className="arwBtn"
                disabled={page >= totalPage}
                onClick={onClickNextPageBtn}
              >
                <img src={I_rtArwWhite} alt="" />
              </button>
            </div>
          </article>
        </section>
      </DataBox>
    </>
  );
}

const DataBox = styled.main`
  flex: 1;
  padding: 70px 140px;

  @media (max-width: 1440px) {
    max-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  .innerBox {
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

        .yellow {
          color: #f7ab1f;
        }
      }
    }

    .initArea {
      margin: 40px 0 0 0;

      .initList {
        display: flex;
        gap: 30px;

        li {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 20px;
          height: 130px;
          padding: 20px 30px;
          background: #000;
          border-radius: 10px;

          .key {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.6);
          }

          .value {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .price {
              font-size: 20px;
            }

            .time {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.4);
            }
          }
        }
      }
    }

    .listArea {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 60px 0 0 0;

      .filterBar {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .filterBox {
          display: flex;
          align-items: center;
          gap: 10px;

          .filterOpt {
            display: flex;
            align-items: center;
            width: 280px;
            height: 40px;
            padding: 0 22px;
            color: rgba(255, 255, 255, 0.4);
            border: 1px solid #3b3e45;
            border-radius: 20px;

            &:focus-within {
              border-color: #fff;
              color: #fff;
            }

            &.dateBox {
              .dateBtn {
                display: flex;
                align-items: center;
                gap: 8px;

                img {
                  width: 22px;
                }
              }
            }

            &.searchBox {
              input {
                &::placeholder {
                  color: rgba(255, 255, 255, 0.4);
                }
              }
            }
          }

          .applyBtn {
            width: 120px;
            height: 40px;
            font-size: 14px;
            font-weight: 700;
            border: 1px solid #3b3e45;
            border-radius: 20px;

            &:focus-within {
              border-color: #fff;
            }
          }
        }

        .exportBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border: 1px solid #3b3e45;
          border-radius: 50%;

          img {
            width: 20px;
          }
        }
      }

      .listBox {
        border: 1px solid #3b3e45;
        border-radius: 14px;
        overflow-x: scroll;

        .listHeader {
          display: flex;
          align-items: center;
          height: 46px;
          color: rgba(255, 255, 255, 0.6);
        }

        .list {
          display: flex;
          flex-direction: column;

          li {
            display: flex;

            span {
              height: 60px;
              border-top: 1px solid #3b3e45;

              .price {
                color: #3fb68b;
              }

              .depositBtn {
                width: 64px;
                height: 28px;
                font-size: 12px;
                font-weight: 700;
                background: #f7ab1f;
                border-radius: 6px;
              }
            }
          }
        }

        .listHeader li,
        .list li span {
          display: flex;

          align-items: center;
          font-size: 14px;

          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          &:first-of-type {
            padding: 0 0 0 20px;
          }

          &:last-of-type {
            padding: 0 20px 0 0;
          }

          &:nth-of-type(1) {
            width: 236px;
            min-width: 236px;
          }

          &:nth-of-type(2) {
            width: 164px;
            min-width: 164px;
          }

          &:nth-of-type(3) {
            width: 188px;
            min-width: 188px;
          }

          &:nth-of-type(4) {
            width: 156px;
            min-width: 156px;
          }

          &:nth-of-type(5) {
            width: 194px;
            min-width: 194px;
          }

          &:nth-of-type(6) {
            width: 162px;
            min-width: 162px;
          }

          &:nth-of-type(7) {
            width: 166px;
            min-width: 166px;
          }

          &:nth-of-type(8) {
            width: 166px;
            min-width: 166px;
          }
        }
      }

      .pageBox {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        .arwBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border: 2px solid #fff;
          border-radius: 50%;

          &:disabled {
            opacity: 0.4;
          }
        }

        .pageList {
          display: flex;
          align-items: center;

          li {
            display: flex;
            justify-content: center;
            padding: 0 5px;
            font-size: 18px;
            position: relative;
            cursor: pointer;

            &.on {
              .onBar {
                background: #f7ab1f;
              }
            }

            .onBar {
              width: 100%;
              height: 6px;
              border-radius: 4px;
              bottom: -6px;
              position: absolute;
            }
          }
        }
      }
    }
  }
`;
