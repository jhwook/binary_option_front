import styled from "styled-components";
import { D_recommenderListHeader } from "../../../data/D_setting";
import { contentsPerPage } from "../../../configs/setting";
import moment from "moment";
import I_ltArwWhite from "../../../img/icon/I_ltArwWhite.svg";
import I_rtArwWhite from "../../../img/icon/I_rtArwWhite.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../../configs/api";
import { useTranslation } from "react-i18next";

export default function Recommender() {
  const { t } = useTranslation();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [page, setPage] = useState(1);
  const [tbData, setTbData] = useState([]);
  const [total, setTotal] = useState(0);

  function onClickPrePageBtn() {
    setPage(page - 1);
  }

  function onClickNextPageBtn() {
    setPage(page + 1);
  }

  function getData() {
    axios
      .get(`${API.USER_REFERRAL}/0/10/id/desc`)
      .then(({ data }) => {
        console.log(data);
        setTbData(data.resp.rows);
        setTotal(data.resp.count);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getData();
  }, [page]);

  if (isMobile)
    return (
      <MrecommenderBox>
        <div className="listBox">
          <ul className="list">
            {tbData.map((v, i) => (
              <li key={i}>
                <div>
                  <p className="key">{t(D_recommenderListHeader[0])}</p>

                  <span className="value">
                    <p>
                      {String(i + 1 + (page - 1) * contentsPerPage).padStart(
                        2,
                        "0"
                      )}
                    </p>
                  </span>
                </div>

                <div>
                  <p className="key">{t(D_recommenderListHeader[1])}</p>

                  <span className="value">
                    <p>{v.referral_user.email}</p>
                  </span>
                </div>

                <div>
                  <p className="key">{t(D_recommenderListHeader[2])}</p>

                  <span className="value">
                    <p>{`${v.referral_user.level} ${t("Level")}`}</p>
                  </span>
                </div>

                <div>
                  <p className="key">{t(D_recommenderListHeader[3])}</p>

                  <span className="value">
                    <p>{moment(v.createdat).format("YYYY-MM-DD")}</p>
                  </span>
                </div>

                <div>
                  <p className="key">{t(D_recommenderListHeader[4])}</p>

                  <span className="value">
                    <p>{`$${v.trade_amount}`}</p>
                  </span>
                </div>

                <div>
                  <p className="key">{t(D_recommenderListHeader[5])}</p>

                  <span className="value">
                    <p className="price">{`$${v.profit}`}</p>&nbsp;
                    <p className="percent">{`(${v.profit_percent}%)`}</p>
                  </span>
                </div>

                <div>
                  <p className="key">{t(D_recommenderListHeader[6])}</p>

                  <span className="value">
                    <p>{`${v.received} USDT`}</p>
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
      </MrecommenderBox>
    );
  else
    return (
      <PrecommenderBox>
        <div className="listBox">
          <ul className="listHeader">
            {D_recommenderListHeader.map((v, i) => (
              <li key={i}>{t(v)}</li>
            ))}
          </ul>
          <ul className="list">
            {tbData.map((v, i) => (
              <li key={i}>
                <span>
                  <p>
                    {String(i + 1 + (page - 1) * contentsPerPage).padStart(
                      2,
                      "0"
                    )}
                  </p>
                </span>

                <span>
                  <p>{v?.referral_user?.email}</p>
                </span>

                <span>
                  <p>{`${v.referral_user.level} ${t("Level")}`}</p>
                </span>

                <span>
                  <p>{moment(v.createdat).format("YYYY-MM-DD")}</p>
                </span>

                <span>
                  <p>{`$${v.trade_amount}`}</p>
                </span>

                <span>
                  <p className="price">{`$${v.profit}`}</p>&nbsp;
                  <p className="percent">{`(${v.profit_percent}%)`}</p>
                </span>

                <span>
                  <p>{`${v.received} USDT`}</p>
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
      </PrecommenderBox>
    );
}

const MrecommenderBox = styled.div`
  .listBox {
    .list {
      display: flex;
      flex-direction: column;

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

            .price {
              color: #3fb68b;
            }
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
`;

const PrecommenderBox = styled.div`
  padding: 0 0 20px;

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
        width: 126px;
        min-width: 126px;
      }

      &:nth-of-type(2) {
        width: 260px;
        min-width: 260px;
      }

      &:nth-of-type(3) {
        width: 172px;
        min-width: 172px;
      }

      &:nth-of-type(4) {
        width: 212px;
        min-width: 212px;
      }

      &:nth-of-type(5) {
        width: 148px;
        min-width: 148px;
      }

      &:nth-of-type(6) {
        width: 202px;
        min-width: 202px;
      }

      &:nth-of-type(7) {
        width: 170px;
        min-width: 170px;
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
`;
