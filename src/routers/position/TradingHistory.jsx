import { forwardRef, useState } from "react";
import styled from "styled-components";
import {
  D_historyCategoryList,
  D_trandingList,
  D_trandingListHeader,
} from "../../data/D_position";
import DatePicker from "react-datepicker";
import "../../util/react-datepicker.css";
import I_calender from "../../img/icon/I_calender.png";
import I_linkWhite from "../../img/icon/I_linkWhite.svg";
import I_timeWhite from "../../img/icon/I_timeWhite.svg";
import I_upArw3Green from "../../img/icon/I_upArw3Green.svg";
import I_dnArw3Red from "../../img/icon/I_dnArw3Red.svg";
import I_ltArwWhite from "../../img/icon/I_ltArwWhite.svg";
import I_rtArwWhite from "../../img/icon/I_rtArwWhite.svg";
import moment from "moment";

export default function TradingHistory() {
  const totalPage = 4;

  const [category, setCategory] = useState(0);
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
    <TradingHistoryBox>
      <section className="innerBox">
        <ul className="categoryList">
          {D_historyCategoryList.map((v, i) => (
            <li
              key={i}
              className={`${category === i && "on"}`}
              onClick={() => setCategory(i)}
            >
              {v}
            </li>
          ))}
        </ul>

        <article className="contArea">
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
              {D_trandingListHeader.map((v, i) => (
                <li key={i}>
                  <p>{v}</p>
                </li>
              ))}
            </ul>

            <ul className="list">
              {D_trandingList.map((v, i) => (
                <li key={i}>
                  <span>
                    <img className="timeImg" src={I_timeWhite} alt="" />
                    <img
                      className="arwImg"
                      src={
                        (v.type === "high" && I_upArw3Green) ||
                        (v.type === "low" && I_dnArw3Red)
                      }
                      alt=""
                    />
                  </span>

                  <span>
                    <p>{v.order}</p>
                  </span>

                  <span>
                    <p>{v.expiration}</p>
                  </span>

                  <span>
                    <p>#{v.asset}</p>
                  </span>

                  <span>
                    <p>{moment(v.openTime).format("YYYY-MM-DD HH:MM:SS")}</p>
                  </span>

                  <span>
                    <p>{moment(v.closingTime).format("YYYY-MM-DD HH:MM:SS")}</p>
                  </span>

                  <span>
                    <p>{v.openPrice}</p>
                  </span>

                  <span>
                    <p>{v.closingPrice}</p>
                  </span>

                  <span>
                    <p>${v.tradeAmount.toLocaleString("eu", "US")}</p>
                  </span>

                  <span>
                    <p className="price">$11.31</p>
                    &nbsp;
                    <p className="percent">{`(${62}%)`}</p>
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
    </TradingHistoryBox>
  );
}

const TradingHistoryBox = styled.main`
  padding: 70px 140px;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 60px;
    width: 1292px;

    .categoryList {
      display: flex;
      gap: 20px;

      li {
        height: 36px;
        font-size: 18px;
        font-weight: 700;
        border-bottom: 4px solid transparent;
        opacity: 0.4;
        cursor: pointer;

        &.on {
          border-color: #fff;
          opacity: 1;
        }
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 20px;

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
            border-top: 1px solid #3b3e45;

            span {
              height: 60px;

              &:nth-of-type(1) {
                gap: 14px;
              }

              .timeImg {
                height: 16px;
              }

              .arwImg {
                height: 14px;
              }

              .percent {
                color: rgba(255, 255, 255, 0.6);
              }
            }
          }
        }

        .listHeader li,
        .list li span {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;

          p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          &:nth-of-type(1) {
            width: 60px;
          }

          &:nth-of-type(2) {
            width: 312px;
          }

          &:nth-of-type(3) {
            width: 72px;
          }

          &:nth-of-type(4) {
            width: 98px;
          }

          &:nth-of-type(5) {
            width: 162px;
          }

          &:nth-of-type(6) {
            width: 162px;
          }

          &:nth-of-type(7) {
            width: 94px;
          }

          &:nth-of-type(8) {
            width: 94px;
          }

          &:nth-of-type(9) {
            width: 102px;
          }

          &:nth-of-type(10) {
            flex: 1;
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
