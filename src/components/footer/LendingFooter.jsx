import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import L_yellow from "../../img/logo/L_yellow.svg";
import I_twitter from "../../img/icon/I_twitter.png";
import I_discord from "../../img/icon/I_discord.png";
import I_unknownNav from "../../img/icon/I_unknownNav.svg";

export default function LendingFooter() {
  const navigate = useNavigate();

  return (
    <LendingFooterBox>
      <section className="innerBox">
        <article className="leftArea">
          <button className="logoBtn" onClick={() => navigate("/")}>
            <img src={L_yellow} alt="" />
          </button>

          <p className="copyright">© Betbit, 2022. All rights reserved.</p>
        </article>

        <article className="rightArea">
          <ul className="navList">
            <li>
              <button className="" onClick={() => {}}>
                <img src={I_twitter} alt="" />
              </button>
            </li>

            <li>
              <button className="" onClick={() => {}}>
                <img src={I_discord} alt="" />
              </button>
            </li>

            <li>
              <button className="" onClick={() => {}}>
                <img src={I_unknownNav} alt="" />
              </button>
            </li>
          </ul>

          <ul className="termList">
            <li>
              <button className="privacy" onClick={() => {}}>
                Privacy Policy
              </button>
            </li>
            <span className="dot" />

            <li>
              <button className="terms" onClick={() => {}}>
                Terms of Service
              </button>
            </li>
          </ul>
        </article>
      </section>
    </LendingFooterBox>
  );
}

const LendingFooterBox = styled.footer`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 210px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  .innerBox {
    display: flex;
    justify-content: space-between;
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
