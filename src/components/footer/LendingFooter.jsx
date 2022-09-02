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
            <div className="logoBox">
              <img className="logo" src={L_yellow} alt="" />

              <p className="copyright">
                {t("© Betbit, 2022. All rights reserved.")}
              </p>
            </div>

            <div className="termBox">
              <p className="key">Privacy and Regulation</p>

              <nav>
                <button className="" onClick={() => {}}>
                  Privacy Policy
                </button>
                <button className="" onClick={() => {}}>
                  Terms of Use
                </button>
              </nav>
            </div>

            <div className="supportBox">
              <p className="key">Support</p>

              <nav>
                <p>Support@betbit.com</p>
                <p>help@betbit.com</p>
              </nav>
            </div>
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

  height: 300px;

  .innerBox {
    display: flex;
    justify-content: space-between;

    width: 100%;
    max-width: 1440px;
    padding: 102px 0 0 0;
    font-size: 14px;

    .leftArea {
      display: flex;
      gap: 60px;

      .logoBox {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;

        .logo {
          height: 28px;
        }

        .copyright {
          font-size: 14px;
          opacity: 0.4;
        }
      }

      .termBox,
      .supportBox {
        display: flex;
        flex-direction: column;
        gap: 14px;

        .key {
          font-size: 18px;
          font-weight: 500;
        }

        nav {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          opacity: 0.4;
        }
      }
    }
  }
`;
