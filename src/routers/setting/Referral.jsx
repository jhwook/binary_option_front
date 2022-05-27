import { useState } from "react";
import styled from "styled-components";
import I_cpWhite from "../../img/icon/I_cpWhite.svg";
import { onClickCopy } from "../../util/Util";
import { D_referralCategoryList } from "../../data/D_setting";
import Recommender from "../../components/setting/referral/Recommender";
import History from "../../components/setting/referral/History";
import SetErrorBar from "../../util/SetErrorBar";

export default function Referral() {
  const [category, setCategory] = useState(0);

  function onClickCopyBtn(str) {
    onClickCopy(str);
    SetErrorBar({ str: "Copied Successfully" });
  }

  return (
    <>
      <ReferralBox>
        <section className="innerBox">
          <article className="titleArea">
            <strong className="title">Referals</strong>
            <p className="explain">
              Share your referral link! When a new user who accesses this link
              purchases a product, an additional 2% of the sales amount is paid.
              Referral rewards are paid in lump sum every month.
            </p>
          </article>

          <article className="recommendArea">
            <strong className="title">Recommend</strong>

            <ul className="dataList">
              <li>
                <p className="key">Code</p>
                <button
                  className="value"
                  onClick={() => onClickCopyBtn("98Dd4DBE")}
                >
                  <p className="code">98Dd4DBE</p>
                  <img src={I_cpWhite} alt="" />
                </button>
              </li>

              <li>
                <p className="key">Link</p>
                <button
                  className="value"
                  onClick={() =>
                    onClickCopyBtn(
                      "https://www.figma.com/file/XJZins1SMnu4X3fiBS8Vu6/betbit?node-id=0%3A1"
                    )
                  }
                >
                  <p className="url">
                    https://www.figma.com/file/XJZins1SMnu4X3fiBS8Vu6/betbit?node-id=0%3A1
                  </p>
                  <img src={I_cpWhite} alt="" />
                </button>
              </li>
            </ul>
          </article>

          <article className="listArea">
            <ul className="categoryList">
              {D_referralCategoryList.map((v, i) => (
                <li
                  key={i}
                  className={`${category === i && "on"}`}
                  onClick={() => setCategory(i)}
                >
                  {v}
                </li>
              ))}
            </ul>

            {category === 0 && <Recommender />}
            {category === 1 && <History />}
          </article>
        </section>
      </ReferralBox>
    </>
  );
}

const ReferralBox = styled.main`
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
      }
    }

    .recommendArea {
      display: flex;
      flex-direction: column;
      gap: 14px;
      width: 900px;
      margin: 44px 0 0 0;
      font-size: 16px;

      .title {
        font-size: 16px;
      }

      .dataList {
        display: flex;
        flex-direction: column;
        gap: 14px;

        li {
          display: flex;
          align-items: center;
          gap: 40px;
          height: 56px;
          padding: 0 24px;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1.4px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;

          &:focus-within {
            border-color: #fff;
          }

          .key {
            color: rgba(255, 255, 255, 0.4);
          }

          .value {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;

            img {
              width: 16px;
            }
          }
        }
      }
    }

    .listArea {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 100%;
      margin: 80px 0 0 0;

      .categoryList {
        display: flex;
        gap: 14px;

        li {
          height: 32px;
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
    }
  }
`;
