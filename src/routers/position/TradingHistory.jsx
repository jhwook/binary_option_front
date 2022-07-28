import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import {
  D_historyCategoryList,
  D_trandingList,
  D_trandingListHeader,
} from "../../data/D_position";
import DatePicker from "react-datepicker";
import "../../util/react-datepicker.css";
import I_calender from "../../img/icon/I_calender.svg";
import I_exportWhite from "../../img/icon/I_exportWhite.svg";
import I_timeWhite from "../../img/icon/I_timeWhite.svg";
import I_upArw3Green from "../../img/icon/I_upArw3Green.svg";
import I_dnArw3Red from "../../img/icon/I_dnArw3Red.svg";
import I_ltArwWhite from "../../img/icon/I_ltArwWhite.svg";
import I_rtArwWhite from "../../img/icon/I_rtArwWhite.svg";
import moment from "moment";
import renderCustomHeader from "../../util/DatePickerHeader";
import { useSelector } from "react-redux";
import DefaultHeader from "../../components/header/DefaultHeader";
import { getExcelFile } from "../../util/Util";
import axios from "axios";
import { API } from "../../configs/api";

export default function TradingHistory() {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [category, setCategory] = useState(D_historyCategoryList[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [listData, setListData] = useState([]);

  function getData() {
    axios
      .get(`${API.USER_BETLOGS}/${category}/${(page - 1) * 10}/10`)
      .then(({ data }) => {
        console.log(data.bet_log);
        setListData(data.bet_log.rows);
        setTotal(data.bet_log.count);
      })
      .catch((err) => console.error(err));
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="dateBtn" onClick={onClick} ref={ref}>
      <img src={I_calender} alt="" />
      <p>{value}</p>
    </button>
  ));

  function onClickExcelBtn() {
    getExcelFile(D_trandingList, `Trading history ${category}`);
  }

  function dateChange(dates) {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  }

  function onClickPrePageBtn() {
    setPage(page - 1);
  }

  function onClickNextPageBtn() {
    setPage(page + 1);
  }

  useEffect(() => {
    getData();
  }, [category]);

  if (isMobile)
    return (
      <>
        <DefaultHeader title="Trading history" />

        <MtradingHistoryBox>
          <section className="innerBox">
            <ul className="categoryList">
              {D_historyCategoryList.map((v, i) => (
                <li
                  key={i}
                  className={`${category === v && "on"}`}
                  onClick={() => setCategory(v)}
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
                      calendarClassName="moDatePicker"
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

                  {/* <span className="searchBox filterOpt">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Order"
                    />
                  </span> */}

                  <button className="applyBtn" onClick={() => {}}>
                    Apply
                  </button>
                </div>
              </div>

              <div className="listBox">
                <ul className="list">
                  {listData.map((v, i) => (
                    <li key={i}>
                      <div>
                        <p className="key">{D_trandingListHeader[0]}</p>

                        <span className="value">
                          <img className="timeImg" src={I_timeWhite} alt="" />
                        </span>
                      </div>

                      <div className="order">
                        <p className="key">{D_trandingListHeader[1]}</p>

                        <span className="value">
                          <img
                            className="arwImg"
                            src={
                              (v.side === "HIGH" && I_upArw3Green) ||
                              (v.side === "LOW" && I_dnArw3Red)
                            }
                            alt=""
                          />

                          <p>{v.id}</p>
                        </span>
                      </div>

                      <div>
                        <p className="key">{D_trandingListHeader[2]}</p>

                        <span className="value">
                          <p>{moment(v.starting).diff(moment(v.expiry))}</p>
                        </span>
                      </div>

                      <div>
                        <p className="key">{D_trandingListHeader[3]}</p>

                        <span className="value">
                          <p>#{v.name}</p>
                        </span>
                      </div>

                      <div>
                        <p className="key">{D_trandingListHeader[4]}</p>

                        <span className="value">
                          <p>
                            {moment
                              .unix(v.starting)
                              .format("YYYY-MM-DD HH:mm:ss")}
                          </p>
                        </span>
                      </div>

                      <div>
                        <p className="key">{D_trandingListHeader[5]}</p>

                        <span className="value">
                          <p>
                            {moment
                              .unix(v.expiry)
                              .format("YYYY-MM-DD HH:mm:ss")}
                          </p>
                        </span>
                      </div>

                      <div>
                        <p className="key">{D_trandingListHeader[6]}</p>

                        <span className="value">
                          <p>{v.startingPrice}</p>
                        </span>
                      </div>

                      <div>
                        <p className="key">{D_trandingListHeader[7]}</p>

                        <span className="value">
                          <p>{v.endingPrice}</p>
                        </span>
                      </div>

                      <div>
                        <p className="key">{D_trandingListHeader[8]}</p>

                        <span className="value">
                          <p>
                            ${(v.amount / 10 ** 6).toLocaleString("eu", "US")}
                          </p>
                        </span>
                      </div>

                      <div>
                        <p className="key">{D_trandingListHeader[9]}</p>

                        <span className="value">
                          <p className="price">{`$${
                            v.profit_amount || "-"
                          }`}</p>
                          &nbsp;
                          <p className="percent">{`(${
                            v.profit_percent || "-"
                          }%)`}</p>
                        </span>
                      </div>
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
                  {new Array(Math.ceil(total / 10)).fill("").map(
                    (v, i) =>
                      i > page - 6 &&
                      i < page + 4 && (
                        <li
                          key={i}
                          className={`${i + 1 === page && "on"}`}
                          onClick={() => setPage(i + 1)}
                        >
                          <strong>{i + 1}</strong>
                          <span className="onBar" />
                        </li>
                      )
                  )}
                </ul>

                <button
                  className="arwBtn"
                  disabled={page >= Math.ceil(total / 10)}
                  onClick={onClickNextPageBtn}
                >
                  <img src={I_rtArwWhite} alt="" />
                </button>
              </div>
            </article>
          </section>
        </MtradingHistoryBox>
      </>
    );
  else
    return (
      <PtradingHistoryBox>
        <section className="innerBox">
          <ul className="categoryList">
            {D_historyCategoryList.map((v, i) => (
              <li
                key={i}
                className={`${category === v && "on"}`}
                onClick={() => setCategory(v)}
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
                    renderCustomHeader={renderCustomHeader}
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

              <button className="exportBtn" onClick={onClickExcelBtn}>
                <img src={I_exportWhite} alt="" />
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
                {listData.map((v, i) => (
                  <li key={i}>
                    <span>
                      <img className="timeImg" src={I_timeWhite} alt="" />
                      <img
                        className="arwImg"
                        src={
                          (v.side === "HIGH" && I_upArw3Green) ||
                          (v.side === "LOW" && I_dnArw3Red)
                        }
                        alt=""
                      />
                    </span>

                    <span>
                      <p>{v.id}</p>
                    </span>

                    <span>
                      <p>{`M${
                        moment(v.expiry).diff(moment(v.starting)) / 60
                      }`}</p>
                    </span>

                    <span>
                      <p>#{v.name}</p>
                    </span>

                    <span>
                      <p>
                        {moment.unix(v.starting).format("YYYY-MM-DD HH:mm:ss")}
                      </p>
                    </span>

                    <span>
                      <p>
                        {moment.unix(v.expiry).format("YYYY-MM-DD HH:mm:ss")}
                      </p>
                    </span>

                    <span>
                      <p>{v.startingPrice}</p>
                    </span>

                    <span>
                      <p>{v.endingPrice}</p>
                    </span>

                    <span>
                      <p>${(v.amount / 10 ** 6).toLocaleString("eu", "US")}</p>
                    </span>

                    <span>
                      <p className="price">{`$${v.profit_amount || "-"}`}</p>
                      &nbsp;
                      <p className="percent">{`(${
                        v.profit_percent || "-"
                      }%)`}</p>
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
                {new Array(Math.ceil(total / 10)).fill("").map(
                  (v, i) =>
                    i > page - 6 &&
                    i < page + 4 && (
                      <li
                        key={i}
                        className={`${i + 1 === page && "on"}`}
                        onClick={() => setPage(i + 1)}
                      >
                        <strong>{i + 1}</strong>
                        <span className="onBar" />
                      </li>
                    )
                )}
              </ul>

              <button
                className="arwBtn"
                disabled={page >= Math.ceil(total / 10)}
                onClick={onClickNextPageBtn}
              >
                <img src={I_rtArwWhite} alt="" />
              </button>
            </div>
          </article>
        </section>
      </PtradingHistoryBox>
    );
}

const MtradingHistoryBox = styled.main`
  height: 100%;

  .innerBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;

    .categoryList {
      display: flex;

      li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 56px;
        font-size: 16px;
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
      gap: 8px;

      .filterBar {
        padding: 20px;

        .filterBox {
          display: flex;
          flex-direction: column;
          gap: 8px;

          .filterOpt {
            display: flex;
            align-items: center;
            width: 100%;
            height: 40px;
            padding: 0 24px;
            color: rgba(255, 255, 255, 0.4);
            border: 1px solid #3b3e45;
            border-radius: 20px;

            &:focus-within {
              border-color: #fff;
              color: #fff;
            }

            &.dateBox {
              position: relative;

              .dateBtn {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 14px;

                img {
                  width: 16px;
                }
              }

              .react-datepicker-popper {
                top: 40px !important;
                left: 50% !important;
                transform: translate(-50%, 0) !important;
              }
            }
          }

          .applyBtn {
            width: 100%;
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
      }

      .listBox {
        padding: 0 20px;

        li {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 24px 0;

          &:first-of-type {
            padding: 0 0 24px;
          }

          &:last-of-type {
            padding: 24px 0 0;
          }

          &:nth-of-type(n + 2) {
            border-top: 1px solid rgba(255, 255, 255, 0.14);
          }

          div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;

            &.order {
              .value {
                gap: 6px;
              }
            }

            .key {
              flex: 1;
              color: rgba(255, 255, 255, 0.6);
            }

            .value {
              flex: 1;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              overflow: hidden;

              p {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              img {
                width: 12px;
              }
            }
          }
        }
      }

      .pageBox {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 30px 0 0 0;

        .arwBtn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border: 2px solid #fff;
          border-radius: 50%;

          &:disabled {
            opacity: 0.2;
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

const PtradingHistoryBox = styled.main`
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
          font-size: 14px;

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
                  width: 16px;
                  height: 17px;
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
          width: 40px;
          height: 40px;
          padding: 10px 13px 13px;
          border: 1px solid #3b3e45;
          border-radius: 50%;

          img {
            width: 14px;
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

          &:first-of-type {
            padding: 0 0 0 20px;
          }

          &:last-of-type {
            padding: 0 20px 0 0;
          }

          &:nth-of-type(1) {
            width: 60px;
            min-width: 60px;
          }

          &:nth-of-type(2) {
            width: 98px;
            min-width: 98px;
          }

          &:nth-of-type(3) {
            width: 72px;
            min-width: 72px;
          }

          &:nth-of-type(4) {
            width: 312px;
            min-width: 312px;
          }

          &:nth-of-type(5) {
            width: 162px;
            min-width: 162px;
          }

          &:nth-of-type(6) {
            width: 162px;
            min-width: 162px;
          }

          &:nth-of-type(7) {
            width: 94px;
            min-width: 94px;
          }

          &:nth-of-type(8) {
            width: 94px;
            min-width: 94px;
          }

          &:nth-of-type(9) {
            width: 102px;
            min-width: 102px;
          }

          &:nth-of-type(10) {
            width: 124px;
            min-width: 124px;
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
            opacity: 0.2;
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
