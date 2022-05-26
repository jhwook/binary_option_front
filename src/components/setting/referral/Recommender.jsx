import styled from "styled-components";
import {
  D_recommenderList,
  D_recommenderListHeader,
} from "../../../data/D_setting";
import { contentsPerPage } from "../../../configs/setting";
import moment from "moment";
import I_ltArwWhite from "../../../img/icon/I_ltArwWhite.svg";
import I_rtArwWhite from "../../../img/icon/I_rtArwWhite.svg";
import { useState } from "react";

export default function Recommender() {
  const totalPage = 4;

  const [page, setPage] = useState(1);

  function onClickPrePageBtn() {
    if (page > 1) setPage(page - 1);
  }

  function onClickNextPageBtn() {
    if (page < totalPage) setPage(page + 1);
  }

  return (
    <RecommenderBox>
      <div className="listBox">
        <ul className="listHeader">
          {D_recommenderListHeader.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
        <ul className="list">
          {D_recommenderList.map((v, i) => (
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
                <p>{v.account}</p>
              </span>

              <span>
                <p>{`${v.level} Level`}</p>
              </span>

              <span>
                <p>{moment(v.subscriptionDate).format("YYYY-MM-DD")}</p>
              </span>

              <span>
                <p>{`$${v.amount}`}</p>
              </span>

              <span>
                <p className="price">{`$${v.profit}`}</p>&nbsp;
                <p className="percent">{`(${92}%)`}</p>
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
    </RecommenderBox>
  );
}

const RecommenderBox = styled.div`
  .listBox {
    border: 1px solid #3b3e45;
    border-radius: 14px;

    .listHeader {
      display: flex;
      align-items: center;
      height: 46px;
      padding: 20px;
      color: rgba(255, 255, 255, 0.6);
    }

    .list {
      display: flex;
      flex-direction: column;

      li {
        display: flex;
        border-top: 1px solid #3b3e45;
        padding: 0 20px;

        span {
          height: 60px;

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

      &:nth-of-type(1) {
        width: 106px;
      }

      &:nth-of-type(2) {
        width: 260px;
      }

      &:nth-of-type(3) {
        width: 172px;
      }

      &:nth-of-type(4) {
        width: 212px;
      }

      &:nth-of-type(5) {
        width: 148px;
      }

      &:nth-of-type(6) {
        width: 202px;
      }

      &:nth-of-type(7) {
        flex: 1;
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
`;
