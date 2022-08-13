import styled from "styled-components";
import { useState } from "react";
import I_rtArwYellow from "../../img/icon/I_rtArwYellow.svg";
import { D_dataCategoryList } from "../../data/D_finance";
import { useSelector } from "react-redux";
import DefaultHeader from "../../components/header/DefaultHeader";
import Recommender from "../../components/finance/data/Recommender";
import ProfitHistory from "../../components/finance/data/ProfitHistory";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Data() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [category, setCategory] = useState(D_dataCategoryList[0]);

  if (isMobile)
    return (
      <>
        <DefaultHeader title="Finance" />

        <MdataBox>
          <section className="innerBox">
            <article className="titleArea">
              <strong className="title">{t("Trading Rewards Data")}</strong>
              <strong className="explain">
                {t("All rewards are made available through Betbit.")}&nbsp;
                <button
                  className="cashBackBtn"
                  onClick={() => navigate("/finance/data/cashback")}
                >
                  <p>{t("Cashback settings")}</p>
                  <img src={I_rtArwYellow} alt="" />
                </button>
              </strong>
            </article>

            <article className="contArea">
              <ul className="categoryList">
                {D_dataCategoryList.map((v, i) => (
                  <li
                    key={i}
                    className={`${category === v && "on"}`}
                    onClick={() => setCategory(v)}
                  >
                    {t(v)}
                  </li>
                ))}
              </ul>

              {category === "Recommender" && <Recommender />}
              {category === "Profit history" && <ProfitHistory />}
            </article>
          </section>
        </MdataBox>
      </>
    );
  else
    return (
      <>
        <PdataBox>
          <section className="innerBox">
            <article className="titleArea">
              <strong className="title">{t("Trading Rewards Data")}</strong>
              <strong className="explain">
                {t("All rewards are made available through Betbit.")}&nbsp;
                <button
                  className="cashBackBtn"
                  onClick={() => navigate("/finance/data/cashback")}
                >
                  <p>{t("Cashback settings")}</p>
                  <img src={I_rtArwYellow} alt="" />
                </button>
              </strong>
            </article>

            <article className="contArea">
              <ul className="categoryList">
                {D_dataCategoryList.map((v, i) => (
                  <li
                    key={i}
                    className={`${category === v && "on"}`}
                    onClick={() => setCategory(v)}
                  >
                    {t(v)}
                  </li>
                ))}
              </ul>

              {category === "Recommender" && <Recommender />}
              {category === "Profit history" && <ProfitHistory />}
            </article>
          </section>
        </PdataBox>
      </>
    );
}

const MdataBox = styled.main`
  height: 100%;
  overflow: hidden;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 80px;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;

    .titleArea {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .title {
        font-size: 20px;
      }

      .explain {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);

        .cashBackBtn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #f7ab1f;

          img {
            height: 12px;
          }
        }
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .categoryList {
        display: flex;
        align-items: center;

        li {
          display: flex;
          justify-content: center;
          flex: 1;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          padding: 0 0 8px;
          border-bottom: 4px solid transparent;
          opacity: 0.4;
          cursor: pointer;

          &.on {
            opacity: 1;
            border-color: #fff;
          }
        }
      }
    }
  }
`;

const PdataBox = styled.main`
  flex: 1;
  padding: 70px 140px 0;
  overflow-y: scroll;

  @media (max-width: 1440px) {
    max-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 80px;
    height: 100%;

    .titleArea {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 618px;

      .title {
        font-size: 24px;
      }

      .explain {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);

        .cashBackBtn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #f7ab1f;

          img {
            height: 12px;
          }
        }
      }
    }

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 40px;

      .categoryList {
        display: flex;
        align-items: center;
        gap: 18px;

        li {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          padding: 0 0 8px;
          border-bottom: 4px solid transparent;
          opacity: 0.4;
          cursor: pointer;

          &.on {
            opacity: 1;
            border-color: #fff;
          }
        }
      }
    }
  }
`;
