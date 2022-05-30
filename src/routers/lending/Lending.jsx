import styled from "styled-components";
import { keyframes } from "styled-components";
import LendingFooter from "../../components/footer/LendingFooter";
import DefaultHeader from "../../components/header/DefaultHeader";
import { D_featureList, D_futureList } from "../../data/D_lending";
import B_lending1 from "../../img/bg/lending/B_lending1.png";
import B_lending2 from "../../img/bg/lending/B_lending2.png";
import B_lending3 from "../../img/bg/lending/B_lending3.svg";
import I_thunderGrad from "../../img/icon/I_thunderGrad.svg";
import I_rtArw3White from "../../img/icon/I_rtArw3White.svg";
import I_xWhite from "../../img/icon/I_xWhite.svg";

export default function Lending() {
  return (
    <>
      <DefaultHeader />
      <LendingBox>
        <section className="placeSec">
          <span className="banner">
            <div className="contBox">
              <img className="icon" src={I_thunderGrad} alt="" />

              <strong className="cont">Start trading on Beteit today.</strong>
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
              THE RIGHT PLACE
              <br /> FOR ONLINE TRADING ON FINANCIAL MARKETS
            </strong>

            <strong className="do">Place Your Trades On Best Conditions</strong>
          </article>

          <button className="tradeBtn" onClick={() => {}}>
            Trade Now
          </button>
        </section>

        <section className="featureSec">
          <article className="windowArea">
            <div className="window">
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

                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rollSec">
          <p>{`Lightntig quick Mobile friendly`}</p>
          <p>{`Lightntig quick Mobile friendly`}</p>
        </section>

        <section className="futureSec">
          <div className="titleBox">
            <strong className="title">Start trading on BETBIT</strong>

            <strong className="explain">
              Enjoy incredible accessibility to crypto futures
            </strong>
          </div>

          <ul className="futureList">
            {D_futureList.map((v, i) => (
              <li key={i}>
                <strong className="key">{v.title}</strong>
                <p className="value">{v.cont}</p>
              </li>
            ))}
          </ul>
        </section>

        <LendingFooter />
      </LendingBox>
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

const LendingBox = styled.main`
  height: 100vh;
  color: #fff;
  background: #0a0e17;
  overflow-y: scroll;

  .placeSec {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 40px;
    height: 1080px;
    padding: 0 0 210px 0;
    background: url(${B_lending1});
    position: relative;

    .banner {
      display: flex;
      align-items: center;
      gap: 40px;
      width: 900px;
      height: 60px;
      padding: 0 24px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      top: 94px;
      position: absolute;

      .contBox {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 20px;

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

    .textArea {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 20px;

      .explain {
        font-size: 34px;
        font-weight: 800;
        font-family: "Open Sans", sans-serif;
      }

      .do {
        font-size: 18px;
      }
    }

    .tradeBtn {
      width: 440px;
      height: 60px;
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
    gap: 40px;

    p {
      font-size: 128px;
      font-family: "Open Sans Hebrew";
      color: rgba(10, 14, 23, 1);
      white-space: nowrap;
      text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;

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
    background: center / contain no-repeat url(${B_lending3});

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
