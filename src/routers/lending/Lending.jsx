import styled from "styled-components";
import { keyframes } from "styled-components";
import LendingFooter from "../../components/footer/LendingFooter";
import DefaultHeader from "../../components/header/DefaultHeader";
import { D_featureList, D_futureList, D_guideList } from "../../data/D_lending";
import B_lending1 from "../../img/bg/lending/B_lending1.png";
import B_lending2 from "../../img/bg/lending/B_lending2.png";
import B_lending3 from "../../img/bg/lending/B_lending3.svg";
import B_lending4 from "../../img/bg/lending/B_lending4.svg";
import B_lending5 from "../../img/bg/lending/B_lending5.png";
import B_float1 from "../../img/bg/lending/B_float1.png";
import B_float2 from "../../img/bg/lending/B_float2.png";
import B_float3 from "../../img/bg/lending/B_float3.png";
import B_float4 from "../../img/bg/lending/B_float4.png";
import B_shield from "../../img/bg/lending/B_shield.png";
import B_tradeText from "../../img/bg/lending/B_tradeText.png";
import I_ltArwWhite from "../../img/icon/I_ltArwWhite.svg";
import I_rtArwWhite from "../../img/icon/I_rtArwWhite.svg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { API } from "../../configs/api";
import { getStyle } from "../../util/Util";

export default function Lending() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const guideRef = useRef();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [assetList, setAssetList] = useState([]);
  const [guideIndex, setGuideIndex] = useState(0);

  async function getAssetList() {
    let _assetList = [];

    let _coinRes = await axios.get(`${API.GET_ASSETS}`, {
      params: { group: "coin" },
    });

    let _forexRes = await axios.get(`${API.GET_ASSETS}`, {
      params: { group: "forex" },
    });

    let _stockRes = await axios.get(`${API.GET_ASSETS}`, {
      params: { group: "stock" },
    });

    _assetList = [
      ..._coinRes.data.resp,
      ..._forexRes.data.resp,
      ..._stockRes.data.resp,
    ];

    _assetList = _assetList.slice(0, 15);

    console.log(_assetList);
    setAssetList(_assetList);
  }

  useEffect(() => {
    getAssetList();
  }, []);

  useEffect(() => {
    if (!guideRef.current) return;

    const wrapWidth = guideRef.current.offsetWidth;
    const contWidth = guideRef.current.children[0].offsetWidth;
    const itemNumByPage = Math.floor(wrapWidth / contWidth);

    guideRef.current.scrollTo({
      left:
        contWidth * itemNumByPage * guideIndex +
        guideIndex * getStyle(guideRef, "gap") * itemNumByPage,
      behavior: "smooth",
    });
  }, [guideIndex]);

  if (isMobile)
    return (
      <>
        <DefaultHeader />
        <MlendingBox assetListLength={assetList.length}>
          <section className="placeSec">
            <article className="contArea">
              <div className="textCont">
                <strong className="explain">
                  {t("THE MOST")}
                  <br /> {t("TRUSTED PLATFORM")}
                </strong>

                <strong className="do">
                  {t("Place Your Trades On Best Conditions")}
                </strong>
              </div>

              <button
                className="tradeBtn"
                onClick={() => navigate("/bet/live")}
              >
                {t("Trading Now")}
              </button>
            </article>

            <img className="bg" src={B_lending1} alt="" />
          </section>

          <section className="trendingSec">
            <strong className="title">Trending</strong>

            <article className="contArea">
              <span className="filter" />
              <span className="filter" />

              <ul className="slideList assetList">
                {assetList.map((v, i) => (
                  <li key={i}>
                    <span className="assetImgBox">
                      {v.imgurl ? <img src={v.imgurl} alt="" /> : <></>}
                    </span>

                    <div className="textBox">
                      <strong className="name">{v.name}</strong>
                      <p className="close">
                        {v.close && Number(v.close).toLocaleString("eu", "US")}
                      </p>

                      <strong
                        className={`${v.change > 0 ? "up" : ""} ${
                          v.change < 0 ? "dn" : ""
                        } change`}
                      >
                        {v.change &&
                          `${Math.floor(v.change * 10 ** 2) / 10 ** 2}%`}
                      </strong>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="slideList assetList">
                {assetList.map((v, i) => (
                  <li key={i}>
                    <span className="assetImgBox">
                      {v.imgurl ? <img src={v.imgurl} alt="" /> : <></>}
                    </span>

                    <div className="textBox">
                      <strong className="name">{v.name}</strong>
                      <p className="close">
                        {v.close && Number(v.close).toLocaleString("eu", "US")}
                      </p>

                      <strong
                        className={`${v.change > 0 ? "up" : ""} ${
                          v.change < 0 ? "dn" : ""
                        } change`}
                      >
                        {v.change &&
                          `${Math.floor(v.change * 10 ** 2) / 10 ** 2}%`}
                      </strong>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="featureSec">
            <article className="windowArea">
              <div className="window">
                <span className="floatBox">
                  <img className="float" src={B_float1} alt="" />
                  <img className="float" src={B_float2} alt="" />
                  <img className="float" src={B_float3} alt="" />
                  <img className="float" src={B_float4} alt="" />
                </span>

                <div className="imgBox">
                  <img src={B_lending4} alt="" />
                </div>
              </div>
            </article>

            <ul className="featureList">
              {D_featureList.map((v, i) => (
                <li key={i}>
                  <div className="shadowBox">
                    <span className="shadow" />
                  </div>

                  <span className="iconBox">
                    <div className="borderBox">
                      <img src={v.icon} alt="" />
                    </div>
                  </span>

                  <p>{t(v.text)}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rollSec">
            <p>{t("Lightning quick/Mobile friendly/Fast withdrawals")}</p>
            <p>{t("Lightning quick/Mobile friendly/Fast withdrawals")}</p>
          </section>

          <section className="futureSec">
            <img className="bg" src={B_lending5} alt="" />

            <div className="titleBox">
              <strong className="title">{t("Start trading on BETBIT")}</strong>

              <strong className="explain">
                {t("Enjoy incredible accessibility to coin futures")}
              </strong>
            </div>

            <ul className="futureList">
              {D_futureList.map((v, i) => (
                <li key={i}>
                  <strong className="key">{t(v.title)}</strong>
                  <p className="value">{t(v.cont)}</p>
                </li>
              ))}
            </ul>
          </section>

          <LendingFooter />
        </MlendingBox>
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        <PlendingBox assetListLength={assetList.length}>
          <section className="placeSec">
            <article className="contArea">
              <div className="textCont">
                <strong className="explain">
                  {t("THE MOST")}
                  <br /> {t("TRUSTED PLATFORM")}
                </strong>

                <strong className="do">
                  {t("Place Your Trades On Best Conditions")}
                </strong>
              </div>

              <button
                className="tradeBtn"
                onClick={() => navigate("/bet/live")}
              >
                {t("Trading Now")}
              </button>
            </article>

            <img className="bg" src={B_lending1} alt="" />
          </section>

          <section className="trendingSec">
            <span className="filter" />
            <span className="filter" />

            <ul className="slideList assetList">
              {assetList.map((v, i) => (
                <li key={i}>
                  <span className="assetImgBox">
                    {v.imgurl ? <img src={v.imgurl} alt="" /> : <></>}
                  </span>

                  <div className="textBox">
                    <strong className="name">{v.name}</strong>
                    <strong className="close">
                      {v.close && Number(v.close).toLocaleString("eu", "US")}
                    </strong>

                    <p
                      className={`${v.change > 0 ? "up" : ""} ${
                        v.change < 0 ? "dn" : ""
                      } change`}
                    >
                      {v.change &&
                        `${Math.floor(v.change * 10 ** 2) / 10 ** 2}%`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <ul className="slideList assetList">
              {assetList.map((v, i) => (
                <li key={i}>
                  <span className="assetImgBox">
                    {v.imgurl ? <img src={v.imgurl} alt="" /> : <></>}
                  </span>

                  <div className="textBox">
                    <strong className="name">{v.name}</strong>
                    <strong className="close">
                      {v.close && Number(v.close).toLocaleString("eu", "US")}
                    </strong>

                    <p
                      className={`${v.change > 0 ? "up" : ""} ${
                        v.change < 0 ? "dn" : ""
                      } change`}
                    >
                      {v.change &&
                        `${Math.floor(v.change * 10 ** 2) / 10 ** 2}%`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="featureSec">
            <article className="windowArea">
              <div className="window">
                <span className="floatBox">
                  <img className="float" src={B_float1} alt="" />
                  <img className="float" src={B_float2} alt="" />
                  <img className="float" src={B_float3} alt="" />
                  <img className="float" src={B_float4} alt="" />
                </span>

                <div className="imgBox">
                  <img src={B_lending2} alt="" />
                </div>
              </div>
            </article>

            <ul className="featureList">
              {D_featureList.map((v, i) => (
                <li key={i}>
                  <div className="shadowBox">
                    <span className="shadow" />
                  </div>

                  <span className="iconBox">
                    <div className="borderBox">
                      <img src={v.icon} alt="" />
                    </div>
                  </span>

                  <p>{t(v.text)}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="trustedOption">
            <article className="titleArea">
              <p className="title">{t("Your trusted binary option")}</p>
              <p className="explain">
                {t(
                  "Here at Betbit, we are committed to user protection with strict protocols and industry-leading technical measures."
                )}
              </p>
            </article>

            <div className="contArea">
              <img className="shield" src={B_shield} alt="" />

              <ul className="contList">
                <li>
                  <strong className="key">Customizable interface</strong>
                  <p className="value">
                    Customize the platform to make it fit better to your needs —
                    from chart type to color theme.
                  </p>
                </li>

                <li>
                  <strong className="key">Convenient withdrawals</strong>
                  <p className="value">
                    Withdraw your money in an instant using a wide range of
                    available payment systems.
                  </p>
                </li>

                <li>
                  <strong className="key">Advanced Data Encryption</strong>
                  <p className="value">
                    Your transaction data is secured via end-to-end encryption,
                    ensuring that only you have access to your personal
                    information.
                  </p>
                </li>
              </ul>

              <img className="float float_1" src={B_tradeText} alt="" />
              <img className="float float_2" src={B_tradeText} alt="" />
            </div>
          </section>

          <section className="guideSec">
            <div className="titleBox">
              <p className="title">{t("The Beginner's Guide")}</p>

              <p className="explain">
                {t("Begin your seamless crypto trading journey here.")}
              </p>
            </div>

            <article className="contArea">
              <button
                className="preBtn pageBtn"
                disabled={guideIndex < 1}
                onClick={() => setGuideIndex(guideIndex - 1)}
              >
                <img src={I_ltArwWhite} alt="" />
              </button>

              <ul className="guideList" ref={guideRef}>
                {D_guideList.map((v, i) => (
                  <li key={i}>
                    <p className="key">{t(v.title)}</p>

                    <span className="imgBox">
                      <img className="default" src={v.icon} alt="" />
                      {/* <img className="hover" src={v.iconHover} alt="" /> */}
                      <span className="bg" />
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="nextBtn pageBtn"
                disabled={guideIndex >= Math.floor(D_guideList.length / 3)}
                onClick={() => setGuideIndex(guideIndex + 1)}
              >
                <img src={I_rtArwWhite} alt="" />
              </button>
            </article>
          </section>

          <section className="startSec">
            <strong className="explain">
              {t("Ready to get free access to the world of investing?")}
            </strong>

            <button className="startBtn" onClick={() => navigate("/bet/live")}>
              {t("Start now")}
            </button>
          </section>

          <LendingFooter />
        </PlendingBox>
      </>
    );
}

const tranlate = keyframes`
  0%{
    transform: translate(100%)
  }
  100%{
    transform: translate(-100%)
  }
`;

const tranlate2 = keyframes`
  0%{
    transform: translate(0%)
  }
  100%{
    transform: translate(-200%)
  }
`;

const pFloat = keyframes`
  0%{
    transform: translate(0)
  }
  100%{
    transform: translate(-8px, -20px)
  }
`;

const mFloat = keyframes`
  0%{
    transform: translate(0) scale(0.54)
  }
  100%{
    transform: translate(-4px, -10px) scale(0.54)
  }
`;

const MlendingBox = styled.main`
  width: 100%;
  height: 100vh;
  padding: 56px 0 0;
  color: #fff;
  background: #0a0e17;
  overflow: hidden;
  overflow-y: scroll;

  .placeSec {
    display: flex;
    flex-direction: column;
    padding: 324px 0 80px 0;
    margin: 0 auto;
    position: relative;

    .contArea {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      padding: 0 28px;

      .textCont {
        display: flex;
        flex-direction: column;
        gap: 14px;
        text-align: center;

        .explain {
          display: inline-block;
          font-size: 30px;
          font-weight: 700;
          font-family: "Noto Sans JP";
          background: linear-gradient(
            96deg,
            #ffffff 40.65%,
            rgba(255, 255, 255, 0) 127.33%
          );
          color: transparent;
          -webkit-background-clip: text;
        }

        .do {
          font-size: 16px;
          font-family: "Noto Sans JP";
          background: linear-gradient(
            96deg,
            #ffffff 40.65%,
            rgba(255, 255, 255, 0) 127.33%
          );
          color: transparent;
          -webkit-background-clip: text;
        }
      }

      .tradeBtn {
        width: 180px;
        height: 50px;
        font-size: 20px;
        font-weight: 700;
        background: rgba(235, 235, 235, 0.2);
        border: 1.6px solid #fbfbfb;
        box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.25);
        border-radius: 30px;

        &:hover {
          color: #0a0e17;
          background: #fff;
        }
      }
    }

    .bg {
      width: 322px;
      right: 8%;
      top: 0;
      position: absolute;
    }
  }

  .trendingSec {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 20px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;

    .filter {
      width: 120px;
      top: 0;
      bottom: 0;
      position: absolute;
      z-index: 1;

      &:nth-of-type(1) {
        left: 0;
        background: linear-gradient(to left, rgba(0, 0, 0, 0), #0a0e17);
      }

      &:nth-of-type(2) {
        right: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0), #0a0e17);
      }
    }

    .title {
      font-size: 20px;
    }

    .contArea {
      display: flex;

      .slideList {
        display: flex;
        gap: 20px;
        padding: 0 10px;

        &:nth-of-type(1) {
          animation: ${tranlate} ${(props) => 10 * props.assetListLength || 40}s
            ${(props) => -5 * props.assetListLength || 20}s infinite linear;
        }

        &:nth-of-type(2) {
          animation: ${tranlate2}
            ${(props) => 10 * props.assetListLength || 40}s infinite linear;
        }

        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 12px;
          min-width: 280px;
          width: 280px;
          height: 164px;
          scroll-snap-align: center;
          color: #000;
          background: #fafafc;
          border-radius: 12px;

          .assetImgBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          .textBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;

            .name {
            }

            .close {
              font-size: 12px;
              opacity: 0.4;
            }

            .change {
              &.up {
                color: #3fb68b;
              }

              &.dn {
                color: #ff5353;
              }
            }
          }
        }
      }

      .btnList {
        display: flex;
        align-items: center;
        gap: 4px;
        margin: 0 auto;

        button {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;

          &.on {
            width: 30px;
            background: #fff;
            border-radius: 10px;
          }
        }
      }
    }
  }

  .featureSec {
    display: flex;
    flex-direction: column;
    gap: 36px;

    .windowArea {
      display: flex;
      justify-content: center;
      padding: 118px 0;

      .window {
        width: 214px;
        position: relative;

        .floatBox {
          .float {
            position: absolute;
            animation: ${mFloat} 2s infinite alternate
              cubic-bezier(0.6, 0.03, 0.6, 0.91);

            &:nth-of-type(1) {
              top: 210px;
              left: -70px;
            }

            &:nth-of-type(2) {
              top: -48px;
              left: 14px;
            }

            &:nth-of-type(3) {
              top: 4px;
              right: -44px;
            }

            &:nth-of-type(4) {
              top: 124px;
              right: -60px;
            }
          }
        }

        .imgBox {
          display: flex;
          justify-content: center;

          img {
          }
        }
      }
    }

    .featureList {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 90px;
      padding: 22px 40px 0;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 280px;
        height: 150px;
        padding: 0 18px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        position: relative;

        &:nth-of-type(1) {
          &:hover {
            .shadowBox {
              .shadow {
                box-shadow: 0px 30px 60px rgba(251, 246, 40, 0.4);
              }
            }
          }

          .shadowBox {
            .shadow {
              box-shadow: 0px 30px 60px rgba(251, 246, 40, 0.2);
            }
          }

          .iconBox {
            background: radial-gradient(
              171.41% 92.71% at 50% 0%,
              rgba(251, 246, 40, 0.3) 0%,
              rgba(251, 246, 40, 0) 100%
            );

            .borderBox {
              border-color: rgba(251, 246, 40, 0.2);
            }
          }
        }

        &:nth-of-type(2) {
          &:hover {
            .shadowBox {
              .shadow {
                box-shadow: 0px 30px 60px rgba(247, 65, 207, 0.4);
              }
            }
          }

          .shadowBox {
            .shadow {
              box-shadow: 0px 30px 60px rgba(247, 65, 207, 0.2);
            }
          }

          .iconBox {
            background: radial-gradient(
              171.41% 92.71% at 50% 0%,
              rgba(247, 65, 207, 0.3) 0%,
              rgba(247, 65, 207, 0) 100%
            );

            .borderBox {
              border-color: rgba(247, 65, 207, 0.2);
            }
          }
        }

        &:nth-of-type(3) {
          &:hover {
            .shadowBox {
              .shadow {
                box-shadow: 0px 30px 60px rgba(247, 171, 31, 0.4);
              }
            }
          }

          .shadowBox {
            .shadow {
              box-shadow: 0px 30px 60px rgba(247, 171, 31, 0.2);
            }
          }

          .iconBox {
            background: radial-gradient(
              171.41% 92.71% at 50% 0%,
              rgba(247, 171, 31, 0.3) 0%,
              rgba(247, 171, 31, 0) 100%
            );

            .borderBox {
              border-color: rgba(247, 171, 31, 0.2);
            }
          }
        }

        .shadowBox {
          display: flex;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: absolute;
          overflow: hidden;

          .shadow {
            width: 164px;
            height: 72px;
            top: -90px;
            position: absolute;
          }
        }

        .iconBox {
          width: 80px;
          height: 80px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          top: -50px;
          position: absolute;

          .borderBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: inherit;
            height: inherit;
            padding: 18px;
            border: 3px solid;
            border-radius: inherit;
            top: -3px;
            left: -3px;
            position: absolute;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }

        p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
        }
      }
    }
  }

  .rollSec {
    display: flex;
    padding: 140px 0 0 0;

    p {
      padding: 0 0 0 40px;
      font-size: 80px;
      font-family: "Open Sans Hebrew";
      white-space: nowrap;

      &:nth-of-type(1) {
        animation: ${tranlate} 20s -10s infinite linear;
      }

      &:nth-of-type(2) {
        animation: ${tranlate2} 20s infinite linear;
      }
    }
  }

  .futureSec {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px 20px 0;

    .bg {
      align-self: flex-end;
    }

    .titleBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin: 12px 0 0 0;
      text-align: center;

      .title {
        font-size: 22px;
      }

      .explain {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .futureList {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 60px 0 0 0;

      li {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 16px 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        .key {
          font-size: 18px;
        }

        .value {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;

const PlendingBox = styled.main`
  height: 100vh;
  padding: 60px 0 0;
  color: #fff;
  background: #212121;
  overflow-y: scroll;

  .placeSec {
    width: 1120px;
    padding: 260px 0 214px 0;
    margin: 0 auto;
    position: relative;

    .contArea {
      display: flex;
      flex-direction: column;
      gap: 30px;

      .textCont {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;

        .explain {
          display: inline-block;
          font-size: 64px;
          font-weight: 700;
          font-family: "Noto Sans JP";
          background: linear-gradient(
            96deg,
            #ffffff 40.65%,
            rgba(255, 255, 255, 0) 127.33%
          );
          color: transparent;
          -webkit-background-clip: text;
        }

        .do {
          font-size: 30px;
          font-family: "Noto Sans JP";
          background: linear-gradient(
            96deg,
            #ffffff 40.65%,
            rgba(255, 255, 255, 0) 127.33%
          );
          color: transparent;
          -webkit-background-clip: text;
        }
      }

      .tradeBtn {
        width: 180px;
        height: 50px;
        font-size: 20px;
        font-weight: 700;
        background: rgba(235, 235, 235, 0.2);
        border: 1.6px solid #fbfbfb;
        box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.25);
        border-radius: 14px;

        &:hover {
          color: #0a0e17;
          background: #fff;
        }
      }
    }

    .bg {
      width: 740px;
      right: -18%;
      top: 50%;
      position: absolute;
      transform: translate(0, -50%);
    }
  }

  .trendingSec {
    display: flex;
    position: relative;

    .filter {
      width: 120px;
      top: 0;
      bottom: 0;
      position: absolute;
      z-index: 1;

      &:nth-of-type(1) {
        left: 0;
        background: linear-gradient(to left, rgba(0, 0, 0, 0), #0a0e17);
      }

      &:nth-of-type(2) {
        right: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0), #0a0e17);
      }
    }

    .slideList {
      display: flex;
      gap: 20px;
      padding: 0 10px;

      &:nth-of-type(1) {
        animation: ${tranlate} ${(props) => 4 * props.assetListLength || 40}s
          ${(props) => -2 * props.assetListLength || 20}s infinite linear;
      }

      &:nth-of-type(2) {
        animation: ${tranlate2} ${(props) => 4 * props.assetListLength || 40}s
          infinite linear;
      }

      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
        min-width: 280px;
        width: 280px;
        height: 104px;
        background: rgba(0, 0, 0, 0.1);
        box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.04);
        border-radius: 12px;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .assetImgBox {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .textBox {
          display: flex;
          align-items: center;
          gap: 10px;

          .name {
          }

          .close {
          }

          .change {
            &.up {
              color: #3fb68b;
            }

            &.dn {
              color: #ff5353;
            }
          }
        }
      }
    }

    .btnList {
      display: flex;
      align-items: center;
      gap: 4px;
      margin: 0 auto;

      button {
        width: 8px;
        height: 8px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;

        &.on {
          width: 30px;
          background: #fff;
          border-radius: 10px;
        }
      }
    }
  }

  .featureSec {
    display: flex;
    flex-direction: column;
    gap: 248px;

    .windowArea {
      display: flex;
      justify-content: center;
      padding: 360px 0 0;

      .window {
        width: 1160px;
        color: inherit;
        border: 10px solid transparent;
        background-image: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.6) -41.6%,
          rgba(255, 255, 255, 0) 118.76%
        );
        border-radius: 20px;
        background-origin: border-box;
        background-clip: content-box, border-box;
        position: relative;

        .floatBox {
          .float {
            position: absolute;
            animation: ${pFloat} 2s infinite alternate
              cubic-bezier(0.6, 0.03, 0.6, 0.91);

            &:nth-of-type(1) {
              top: 474px;
              left: -152px;
            }

            &:nth-of-type(2) {
              top: -66px;
              left: 232px;
            }

            &:nth-of-type(3) {
              top: 54px;
              right: -86px;
            }

            &:nth-of-type(4) {
              top: 256px;
              right: -188px;
            }
          }
        }

        .imgBox {
          margin: 10px;
          border-radius: 20px;
          overflow: hidden;

          img {
            width: 100%;
            object-fit: cover;
          }
        }
      }
    }

    .featureList {
      display: flex;
      justify-content: center;
      gap: 30px;
      padding: 60px 0 0 0;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 460px;
        height: 264px;
        padding: 0 80px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        position: relative;

        &:nth-of-type(1) {
          &:hover {
            .shadowBox {
              .shadow {
                box-shadow: 0px 30px 60px rgba(251, 246, 40, 0.4);
              }
            }
          }

          .shadowBox {
            .shadow {
              box-shadow: 0px 30px 60px rgba(251, 246, 40, 0.2);
            }
          }

          .iconBox {
            background: radial-gradient(
              171.41% 92.71% at 50% 0%,
              rgba(251, 246, 40, 0.3) 0%,
              rgba(251, 246, 40, 0) 100%
            );

            .borderBox {
              border-color: rgba(251, 246, 40, 0.2);
            }
          }
        }

        &:nth-of-type(2) {
          &:hover {
            .shadowBox {
              .shadow {
                box-shadow: 0px 30px 60px rgba(247, 65, 207, 0.4);
              }
            }
          }

          .shadowBox {
            .shadow {
              box-shadow: 0px 30px 60px rgba(247, 65, 207, 0.2);
            }
          }

          .iconBox {
            background: radial-gradient(
              171.41% 92.71% at 50% 0%,
              rgba(247, 65, 207, 0.3) 0%,
              rgba(247, 65, 207, 0) 100%
            );

            .borderBox {
              border-color: rgba(247, 65, 207, 0.2);
            }
          }
        }

        &:nth-of-type(3) {
          &:hover {
            .shadowBox {
              .shadow {
                box-shadow: 0px 30px 60px rgba(247, 171, 31, 0.4);
              }
            }
          }

          .shadowBox {
            .shadow {
              box-shadow: 0px 30px 60px rgba(247, 171, 31, 0.2);
            }
          }

          .iconBox {
            background: radial-gradient(
              171.41% 92.71% at 50% 0%,
              rgba(247, 171, 31, 0.3) 0%,
              rgba(247, 171, 31, 0) 100%
            );

            .borderBox {
              border-color: rgba(247, 171, 31, 0.2);
            }
          }
        }

        .shadowBox {
          display: flex;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: absolute;
          overflow: hidden;

          .shadow {
            width: 270px;
            height: 120px;

            top: -120px;
            position: absolute;
          }
        }

        .iconBox {
          width: 96px;
          height: 96px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          top: -60px;
          position: absolute;

          .borderBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: inherit;
            height: inherit;
            border: 3px solid;
            border-radius: inherit;
            top: -3px;
            left: -3px;
            position: absolute;
          }
        }

        p {
          font-size: 22px;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
        }
      }
    }
  }

  .trustedOption {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 96px;
    padding: 280px 0 0;

    .titleArea {
      display: flex;
      flex-direction: column;
      gap: 20px;
      text-align: center;

      .title {
        font-size: 40px;
        font-weight: 500;
      }

      .explain {
        font-size: 18px;
      }
    }

    .contArea {
      display: flex;
      align-items: center;
      gap: 36px;
      position: relative;

      .shield {
        width: 496px;
        position: relative;
        z-index: 1;
      }

      .contList {
        display: flex;
        flex-direction: column;
        gap: 30px;
        position: relative;
        z-index: 1;

        li {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 602px;
          height: 142px;
          padding: 20px 30px;
          font-size: 18px;
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-radius: 20px;

          .key {
          }

          .value {
            opacity: 0.6;
          }
        }
      }

      .float {
        height: 340px;
        position: absolute;

        &_1 {
          top: -16%;
          left: 16%;
        }

        &_2 {
          bottom: -14%;
          right: 14%;
        }
      }
    }
  }

  .guideSec {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 70px;
    padding: 240px 0 0;

    .titleBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      text-align: center;

      .title {
        font-size: 40px;
        font-weight: 500;
      }

      .explain {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .contArea {
      display: flex;
      align-items: center;
      gap: 46px;
      position: relative;

      .guideList {
        display: flex;
        gap: 18px;
        width: 1086px;
        overflow-x: scroll;

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 52px;
          min-width: 350px;
          width: 350px;
          height: 440px;
          padding: 52px 36px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);

          .key {
            font-size: 18px;
            text-align: center;
          }

          .imgBox {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 230px;
            height: 230px;

            border-radius: 50%;
            position: relative;

            img {
              width: 92px;
            }

            .bg {
              width: 100%;
              height: 100%;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 50%;
              position: absolute;
              filter: blur(20px);
            }
          }
        }
      }

      .pageBtn {
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

        img {
          width: 12px;
        }
      }
    }
  }

  .startSec {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    height: 324px;
    padding: 90px 0 0;
    margin: 200px 0 0;
    color: #000;
    background: #fff;

    .explain {
      font-size: 40px;
    }

    .startBtn {
      width: 200px;
      height: 50px;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      background: #000;
      box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.25);
      border-radius: 14px;
    }
  }
`;
