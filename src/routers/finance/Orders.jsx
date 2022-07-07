import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "../../util/react-datepicker.css";
import I_calender from "../../img/icon/I_calender.svg";
import I_exportWhite from "../../img/icon/I_exportWhite.svg";
import I_ltArwWhite from "../../img/icon/I_ltArwWhite.svg";
import I_rtArwWhite from "../../img/icon/I_rtArwWhite.svg";
import moment from "moment";
import renderCustomHeader from "../../util/DatePickerHeader";
import { useSelector } from "react-redux";
import DefaultHeader from "../../components/header/DefaultHeader";
import axios from "axios";
import { API } from "../../configs/api";
import { getExcelFile } from "../../util/Util";
import { D_ordersList, D_ordersListHeader } from "../../data/D_finance";

export default function Orders() {
  const statusSTR = {
    0: "Pending",
    1: "Confirmed",
    2: "Rejected",
  };
  registerLocale("ko", ko);

  const isMobile = useSelector((state) => state.common.isMobile);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [tblData, setTblData] = useState([]);
  const [total, setTotal] = useState(0);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="dateBtn" onClick={onClick} ref={ref}>
      <img src={I_calender} alt="" />
      <p>{value}</p>
    </button>
  ));

  function getData(arg) {
    axios
      .get(`${API.TRANSACTION_BRANCH_LIST}/${(page - 1) * 10}/10`)

      .then(({ data }) => {
        let { respdata } = data;
        console.log(data);
        setTblData(respdata.rows);
        setTotal(respdata.length);
      });
  }

  function dateChange(dates) {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  }

  function onClickPrePageBtn() {
    if (page > 1) setPage(page - 1);
  }

  function onClickNextPageBtn() {
    setPage(page + 1);
  }

  useEffect(() => {
    getData();
  }, []);

  if (isMobile)
    return (
      <>
        <DefaultHeader title="Orders" />

        <MordersBox>
          <section className="innerBox">
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

                  <button
                    className="applyBtn"
                    onClick={() => getData({ filter: true })}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="listBox">
                <ul className="list">
                  {tblData[0] ? (
                    tblData.map((v, i) => (
                      <li key={i}>
                        <div>
                          <p className="key">{D_ordersListHeader[0]}</p>
                          <div className="value">
                            <p>{v.account}</p>
                          </div>
                        </div>

                        <div>
                          <p className="key">{D_ordersListHeader[1]}</p>
                          <div className="value">
                            <p>{`${v.level} Level`}</p>
                          </div>
                        </div>

                        <div>
                          <p className="key">{D_ordersListHeader[2]}</p>
                          <div className="value">
                            <p>{moment(v.date).format("YYYY-MM-DD")}</p>
                          </div>
                        </div>

                        <div>
                          <p className="key">{D_ordersListHeader[3]}</p>
                          <div className="value">
                            <p>
                              {`¥${(v?.amount / 10 ** 6)?.toLocaleString(
                                "cn",
                                "CN"
                              )}`}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="key">{D_ordersListHeader[4]}</p>
                          <div className="value">
                            <p>
                              {`¥${(v?.cumulative / 10 ** 6)?.toLocaleString(
                                "cn",
                                "CN"
                              )}`}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="key">{D_ordersListHeader[5]}</p>
                          <div className="value">
                            <p>{`${v.accountName}/${v.accountNum}`}</p>
                          </div>
                        </div>

                        <div>
                          <p className="key">{D_ordersListHeader[6]}</p>
                          <div className="value">
                            <button className="depositBtn" onClick={() => {}}>
                              Deposit
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="notFound">
                      Nothing found or not yet calculated
                    </p>
                  )}
                </ul>
              </div>
            </article>
          </section>
        </MordersBox>
      </>
    );
  else
    return (
      <PordersBox>
        <section className="innerBox">
          <strong className="pageTitle">Orders</strong>

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

                <button
                  className="applyBtn"
                  onClick={() => getData({ filter: true })}
                >
                  Apply
                </button>
              </div>

              <button
                className="exportBtn"
                onClick={() => getExcelFile(tblData, "Orders")}
              >
                <img src={I_exportWhite} alt="" />
              </button>
            </div>

            <div className="listBox">
              <ul className="listHeader">
                {D_ordersListHeader.map((v, i) => (
                  <li key={i}>
                    <p>{v}</p>
                  </li>
                ))}
              </ul>

              <ul className="list">
                {tblData &&
                  tblData.map((v, i) => (
                    <li key={i}>
                      <span>
                        <p>{v.account}</p>
                      </span>

                      <span>
                        <p>{`${v.level} Level`}</p>
                      </span>

                      <span>
                        <p>{moment(v.date).format("YYYY-MM-DD")}</p>
                      </span>

                      <span>
                        <p>
                          {`¥${(v?.amount / 10 ** 6)?.toLocaleString(
                            "cn",
                            "CN"
                          )}`}
                        </p>
                      </span>

                      <span>
                        <p>
                          {`¥${(v?.cumulative / 10 ** 6)?.toLocaleString(
                            "cn",
                            "CN"
                          )}`}
                        </p>
                      </span>

                      <span>
                        <p>{`${v.accountName}/${v.accountNum}`}</p>
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
                {new Array(Math.ceil(total / 10)).fill("").map((v, i) => (
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
                disabled={page >= Math.ceil(total / 10)}
                onClick={onClickNextPageBtn}
              >
                <img src={I_rtArwWhite} alt="" />
              </button>
            </div>
          </article>
        </section>
      </PordersBox>
    );
}

const MordersBox = styled.main`
  height: 100%;

  .innerBox {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;

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

        .list {
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

            & > div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;

              .key {
                color: rgba(255, 255, 255, 0.6);
              }

              .value {
                .depositBtn {
                  padding: 0 10px;
                  height: 28px;
                  font-size: 12px;
                  font-weight: 700;
                  background: #f7ab1f;
                  border-radius: 6px;
                }
              }
            }
          }

          .notFound {
            margin: 0 0 34px;
            font-size: 14px;
            text-align: center;
            opacity: 0.4;
          }
        }
      }
    }
  }
`;

const PordersBox = styled.main`
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

    .pageTitle {
      height: 36px;
      font-size: 18px;
      font-weight: 700;
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

              .depositBtn {
                padding: 0 10px;
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
            width: 238px;
            min-width: 238px;
          }

          &:nth-of-type(2) {
            width: 164px;
            min-width: 164px;
          }

          &:nth-of-type(3) {
            width: 150px;
            min-width: 150px;
          }

          &:nth-of-type(4) {
            width: 158px;
            min-width: 158px;
          }

          &:nth-of-type(5) {
            width: 158px;
            min-width: 158px;
          }

          &:nth-of-type(6) {
            width: 240px;
            min-width: 240px;
          }

          &:nth-of-type(7) {
            flex: 1;
            width: 64px;
            min-width: 64px;
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
