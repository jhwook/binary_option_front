import { useSelector } from "react-redux";
import styled from "styled-components";
import DefaultHeader from "../../components/header/DefaultHeader";
import T_dia from "../../img/tier/T_dia.svg";
import I_upPolGreen from "../../img/icon/I_upPolGreen.svg";
import { D_rateList } from "../../data/D_position";
import { useEffect, useState } from "react";
import { setToast } from "../../util/Util";
import axios from "axios";
import { API } from "../../configs/api";
import { useTranslation } from "react-i18next";

export default function CashBack() {
  const { t } = useTranslation();
  const isMobile = useSelector((state) => state.common.isMobile);

  const [listData, setListData] = useState([]);

  function onChangeSettingList(e, i) {
    let _listData = listData;
    _listData[_listData.length - i - 1].fee = e.target.value;

    setListData([..._listData]);
  }

  function onClickSaveBtn(i) {
    console.log(listData[listData.length - i - 1].fee);
    axios
      .patch(`${API.ADMIN_FEE_SETTING}/${listData.length - i - 1}`, {
        value: listData[listData.length - i - 1].fee,
      })
      .then((res) => {
        console.log(res);
        getData();
        setToast({ type: "alarm", cont: "Your changes have been saved." });
      })
      .catch(console.error);
  }

  function getData() {
    axios
      .get(API.ADMIN_LEVEL_FEE)
      .then(({ data }) => {
        console.log(data);
        setListData(data.resp);
      })
      .catch(console.error);
  }

  useEffect(() => {
    getData();
  }, []);

  if (isMobile)
    return (
      <>
        <DefaultHeader title="My Positions" />

        <McashBackBox>
          <section className="innerBox">
            <article className="titleArea">
              <strong className="title">{t("Recommender Fee Rates")}</strong>
              <p className="explain">
                {t("Fee setting for transaction amount by sub-account")}
              </p>
            </article>

            <article className="rateArea">
              <ul className="rateList">
                {[...listData].reverse().map((v, i) => (
                  <li key={i}>
                    <div className="imgBox">
                      <img src={v.imgurl} alt="" />

                      <span className="name">{t(v.levelstr_disp)}</span>
                    </div>

                    <div className="andBar">
                      <div className="line" />
                      <p>{t("and")}</p>
                      <div className="line" />
                    </div>

                    <div className="setBox">
                      <div className="inputBox">
                        <input
                          value={v.fee}
                          onChange={(e) => onChangeSettingList(e, i)}
                        />

                        <strong className="unit">%</strong>

                        <button
                          className="saveBtn"
                          onClick={() => onClickSaveBtn(i)}
                        >
                          {t("Save")}
                        </button>
                      </div>

                      <p className="key">
                        {i + 1}
                        {t("st level")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
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
            <strong className="title">{t("Recommender Fee Rates")}</strong>
            <p className="explain">
              {t("Fee setting for transaction amount by sub-account")}
            </p>
          </article>

          <ul className="rateList">
            {[...listData].reverse().map((v, i) => (
              <li key={i}>
                <div className="imgBox">
                  <img src={v.imgurl} alt="" />

                  <span className="name">{t(v.levelstr_disp)}</span>
                </div>

                <div className="andBar">
                  <div className="line" />
                  <p>{t("and")}</p>
                  <div className="line" />
                </div>

                <div className="setBox">
                  <div className="inputBox">
                    <input
                      value={v.fee}
                      onChange={(e) => onChangeSettingList(e, i)}
                    />

                    <strong className="unit">%</strong>

                    <button
                      className="saveBtn"
                      onClick={() => onClickSaveBtn(i)}
                    >
                      {t("Save")}
                    </button>
                  </div>

                  <p className="key">
                    {i + 1}
                    {t("st level")}
                  </p>
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
    gap: 40px;
    height: 100%;
    overflow-y: scroll;

    .titleArea {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 0 20px;

      .title {
        font-size: 20px;
      }

      .explain {
        font-size: 14px;
        opacity: 0.6;
      }
    }

    .rateArea {
      padding: 0 20px;
      
      .rateList {
        display: flex;
        overflow-x: scroll;
        padding: 50px 14px 44px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        box-shadow: inset 40px 0px 40px 0px rgba(10, 14, 23, 0.7),
          inset -40px 0px 40px 0px rgba(10, 14, 23, 0.7);

        li {
          flex: 1;
          min-width: 260px;
          width: 260px;
          padding: 0 30px;

          &:first-of-type{
            
          }

          &:nth-of-type(n + 2) {
            border-left: 1px solid rgba(255, 255, 255, 0.14);
          }

          .imgBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 200px;
            height: 190px;
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
            margin: 12px 0 0;
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
            margin: 18px 0 0;

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
