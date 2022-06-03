import { forwardRef, useState } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "../../util/react-datepicker.css";
import I_calender from "../../img/icon/I_calender.png";
import I_linkWhite from "../../img/icon/I_linkWhite.svg";
import I_ltArwWhite from "../../img/icon/I_ltArwWhite.svg";
import I_rtArwWhite from "../../img/icon/I_rtArwWhite.svg";
import moment from "moment";
import {
  D_historyListHeader,
  D_historyCategoryList,
  D_historyList,
} from "../../data/D_bet";
import renderCustomHeader from "../../util/DatePickerHeader";

export default function History() {
  const totalPage = 4;
  registerLocale("ko", ko);

  const [category, setCategory] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
    <HistoryBox>
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
                  locale="ko"
                  selected={startDate}
                  onChange={dateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  renderCustomHeader={renderCustomHeader}
                  customInput={<ExampleCustomInput />}
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
              {D_historyListHeader.map((v, i) => (
                <li key={i}>
                  <p>{v}</p>
                </li>
              ))}
            </ul>

            <ul className="list">
              {D_historyList.map((v, i) => (
                <li key={i}>
                  <span>{v.id}</span>

                  <span>
                    <p>{moment(v.openTime).format("YYYY-MM-DD HH:mm:ss")}</p>
                  </span>

                  <span>
                    <p>{`${v.amount.toLocaleString("eu", "US")} USDT`}</p>
                  </span>

                  <span>
                    <p>{v.method}</p>
                  </span>

                  <span>
                    <p>{v.type}</p>
                  </span>

                  <span>
                    <p>{v.status}</p>
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
    </HistoryBox>
  );
}

const HistoryBox = styled.main`
  flex: 1;
  padding: 70px 140px;

  @media (max-width: 1440px) {
    max-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: 100%;
    overflow-y: scroll;

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

              &:nth-of-type(6) {
                color: #ff5353;
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
            width: 190px;
            min-width: 190px;
          }

          &:nth-of-type(2) {
            width: 170px;
            min-width: 170px;
          }

          &:nth-of-type(3) {
            width: 168px;
            min-width: 168px;
          }

          &:nth-of-type(4) {
            width: 238px;
            min-width: 238px;
          }

          &:nth-of-type(5) {
            width: 158px;
            min-width: 158px;
          }

          &:nth-of-type(6) {
            width: 196px;
            min-width: 196px;
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
