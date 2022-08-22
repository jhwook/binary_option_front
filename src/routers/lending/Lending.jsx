import styled from "styled-components";
import { keyframes } from "styled-components";
import LendingFooter from "../../components/footer/LendingFooter";
import DefaultHeader from "../../components/header/DefaultHeader";
import { D_featureList, D_futureList } from "../../data/D_lending";
import B_lending1 from "../../img/bg/lending/B_lending1.png";
import B_lending2 from "../../img/bg/lending/B_lending2.png";
import B_lending3 from "../../img/bg/lending/B_lending3.svg";
import B_lending4 from "../../img/bg/lending/B_lending4.svg";
import B_lending5 from "../../img/bg/lending/B_lending5.png";
import B_float1 from "../../img/bg/lending/B_float1.png";
import B_float2 from "../../img/bg/lending/B_float2.png";
import B_float3 from "../../img/bg/lending/B_float3.png";
import B_float4 from "../../img/bg/lending/B_float4.png";
import I_thunderGrad from "../../img/icon/I_thunderGrad.svg";
import I_rtArw3White from "../../img/icon/I_rtArw3White.svg";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Lending() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <>
        <DefaultHeader />
        <MlendingBox>
          <section className="placeSec">
            <span className="banner">
              <div className="contBox">
                <img className="icon" src={I_thunderGrad} alt="" />

                <strong className="cont">
                  {t("Start trading on Betbit today.")}
                </strong>
              </div>

              <div className="btnBox">
                <button className="" onClick={() => {}}>
                  <img src={I_rtArw3White} alt="" />
                </button>

                <button className="" onClick={() => {}}>
                  <img src={I_xWhite} alt="" />
                </button>
              </div>
            </span>

            <article className="textArea">
              <strong className="explain">
                {t("THE RIGHT PLACE")}
                <br /> {t("FOR ONLINE TRADING ON FINANCIAL MARKETS")}
              </strong>

              <strong className="do">
                {t("Place Your Trades On Best Conditions")}
              </strong>
            </article>

            <button className="tradeBtn" onClick={() => navigate("/bet/live")}>
              {t("Trade Now")}
            </button>
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
                {t("Enjoy incredible accessibility to crypto futures")}
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
        <PlendingBox>
          <section className="placeSec">
            <span className="banner">
              <div className="contBox">
                <img className="icon" src={I_thunderGrad} alt="" />

                <strong className="cont">
                  {t("Start trading on Betbit today.")}
                </strong>
              </div>

              <div className="btnBox">
                <button className="" onClick={() => {}}>
                  <img src={I_rtArw3White} alt="" />
                </button>

                <button className="" onClick={() => {}}>
                  <img src={I_xWhite} alt="" />
                </button>
              </div>
            </span>

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
                {t("Trade Now")}
              </button>
            </article>

            <img className="bg" src={B_lending1} alt="" />
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

          <section className="rollSec">
            <p>{t("Lightning quick/Mobile friendly/Fast withdrawals")}</p>
            <p>{t("Lightning quick/Mobile friendly/Fast withdrawals")}</p>
          </section>

          <section className="futureSec">
            <div className="titleBox">
              <strong className="title">{t("Start trading on BETBIT")}</strong>

              <strong className="explain">
                {t("Enjoy incredible accessibility to crypto futures")}
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
  color: #fff;
  background: #0a0e17;
  overflow: hidden;
  overflow-y: scroll;

  .placeSec {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 40px;
    height: 720px;
    padding: 0 20px 250px;
    background: url(${B_lending1});
    position: relative;

    .banner {
      display: flex;
      align-items: center;
      gap: 20px;
      width: 88.88vw;
      height: 54px;
      padding: 0 22px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 30px;
      bottom: 54px;
      position: absolute;

      .contBox {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 16px;
        overflow: hidden;

        .icon {
          height: 28px;
        }

        .cont {
          flex: 1;
          font-size: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .btnBox {
        display: flex;
        align-items: center;
        gap: 12px;

        button {
          display: flex;
          align-items: center;

          img {
            height: 20px;
          }
        }
      }
    }

    .textArea {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 14px;

      .explain {
        font-size: 24px;
        font-weight: 800;
        font-family: "Open Sans", sans-serif;
      }

      .do {
        font-size: 14px;
      }
    }

    .tradeBtn {
      width: 220px;
      height: 50px;
      font-size: 20px;
      font-weight: 700;
      border: 1px solid #fff;
      border-radius: 28px;

      &:hover {
        color: #0a0e17;
        background: #fff;
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
        animation: ${tranlate} 20s infinite linear;
      }

      &:nth-of-type(2) {
        animation: ${tranlate2} 20s 10s infinite linear;
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
  background: #0a0e17;
  overflow-y: scroll;

  .placeSec {
    display: flex;
    flex-direction: column;
    gap: 270px;
    width: 1120px;
    height: 1030px;
    padding: 34px 0 210px 0;
    margin: 0 auto;
    position: relative;

    .banner {
      display: flex;
      align-items: center;
      gap: 40px;
      width: 800px;
      height: 60px;
      padding: 0 24px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;

      .contBox {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 20px;
        overflow: hidden;

        .icon {
          height: 28px;
        }

        .cont {
          flex: 1;
          font-size: 18px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .btnBox {
        display: flex;
        align-items: center;
        gap: 15px;

        button {
          display: flex;
          align-items: center;

          img {
            height: 20px;
          }
        }
      }
    }

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
        border-radius: 30px;

        &:hover {
          color: #0a0e17;
          background: #fff;
        }
      }
    }

    .bg {
      width: 772px;
      right: -20%;
      bottom: 4%;
      position: absolute;
    }
  }

  .featureSec {
    display: flex;
    flex-direction: column;
    gap: 36px;

    .windowArea {
      display: flex;
      justify-content: center;
      padding: 220px 0;

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

  .rollSec {
    display: flex;
    padding: 140px 0 30px;

    p {
      padding: 0 0 0 40px;
      font-size: 128px;
      font-family: "Open Sans Hebrew";
      white-space: nowrap;

      &:nth-of-type(1) {
        animation: ${tranlate} 20s infinite linear;
      }

      &:nth-of-type(2) {
        animation: ${tranlate2} 20s 10s infinite linear;
      }
    }
  }

  .futureSec {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 42px;
    padding: 306px 0 240px 0;
    background: center no-repeat url(${B_lending3});

    .titleBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      text-align: center;

      .title {
        font-size: 40px;
      }

      .explain {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .futureList {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 30px 32px;
      max-width: 1200px;

      li {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 584px;
        height: 128px;
        padding: 24px 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 14px;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        .key {
          font-size: 22px;
        }

        .value {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
