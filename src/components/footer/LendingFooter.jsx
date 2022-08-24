import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import L_yellow from "../../img/logo/L_yellow.svg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function LendingFooter() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  if (isMobile)
    return (
      <MlendingFooterBox>
        <section className="innerBox">
          <article className="topArea">
            <ul className="termList">
              <li>
                <button className="privacy" onClick={() => {}}>
                  {t("Privacy Policy")}
                </button>
              </li>
              <span className="dot" />

              <li>
                <button className="terms" onClick={() => {}}>
                  {t("Terms of Service")}
                </button>
              </li>
            </ul>
          </article>

          <article className="btArea">
            <p className="copyright">
              {t("© Betbit, 2022. All rights reserved.")}
            </p>
          </article>
        </section>
      </MlendingFooterBox>
    );
  else
    return (
      <PlendingFooterBox>
        <section className="innerBox">
          <article className="leftArea">
            <button className="logoBtn" onClick={() => navigate("/")}>
              <img src={L_yellow} alt="" />
            </button>

            <p className="copyright">
              {t("© Betbit, 2022. All rights reserved.")}
            </p>
          </article>

          <article className="rightArea">
            <ul className="termList">
              <li>
                <button className="privacy" onClick={() => {}}>
                  {t("Privacy Policy")}
                </button>
              </li>
              <span className="dot" />

              <li>
                <button className="terms" onClick={() => {}}>
                  {t("Terms of Service")}
                </button>
              </li>
            </ul>
          </article>
        </section>
      </PlendingFooterBox>
    );
}

const MlendingFooterBox = styled.footer`
  padding: 0 20px 20px;
  margin: 312px 0 0 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    font-size: 14px;

    .topArea {
      padding: 0 0 20px 0;

      .termList {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
    }

    .btArea {
      padding: 20px 0 0 0;
      border-top: 1px solid rgba(255, 255, 255, 0.2);

      .copyright {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .navList {
        display: flex;
        align-items: center;
        gap: 10px;

        button {
          img {
            height: 12px;
          }
        }
      }
    }
  }
`;

const PlendingFooterBox = styled.footer`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 210px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  .innerBox {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    max-width: 1440px;
    padding: 0 30px 80px;
    font-size: 14px;

    .leftArea {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;

      .logoBtn {
        img {
          height: 28px;
        }
      }
    }

    .rightArea {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 20px;

      .navList {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .termList {
        display: flex;
        align-items: center;
        gap: 6px;

        .dot {
          display: inline-block;
          width: 3px;
          height: 3px;
          background: #fff;
          border-radius: 50%;
        }
      }
    }
  }
`;
