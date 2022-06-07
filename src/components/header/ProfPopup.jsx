import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_x from "../../img/icon/I_x.svg";
import I_xWhite from "../../img/icon/I_xWhite.svg";

export default function ProfPopup({ off, offAll }) {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickLogOutBtn() {
    localStorage.removeItem("token");
    navigate("/");

    if (offAll) offAll();
  }

  function onClickNav(url) {
    navigate(url);
    off();

    if (offAll) offAll();
  }

  if (isMobile)
    return (
      <MprofPopupBox className="profPopup">
        <article className="topArea">
          <button className="clsBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="profBox">
            <span className="posBox"></span>

            <div className="textBox">
              <p className="id">ioimmoj@gmail.com</p>
              <p className="pos">GOLD</p>
            </div>
          </div>

          <div className="accountBox">
            <div className="title">
              <span className="dot" />

              <p>Live account</p>
            </div>

            <ul className="infoList">
              <li>
                <p className="key">Deals</p>
                <p className="value">0</p>
              </li>
              <li>
                <p className="key">Trading turnover</p>
                <p className="value">$0</p>
              </li>
              <li>
                <p className="key">Net turnover</p>
                <p className="value">$0</p>
              </li>
              <li>
                <p className="key">Trading profit</p>
                <p className="value">$0</p>
              </li>
            </ul>
          </div>

          <ul className="navList">
            <li>
              <button
                className="navBtn"
                onClick={() => onClickNav("/setting/prof")}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className="navBtn"
                onClick={() => onClickNav("/market/deposit")}
              >
                Deposit
              </button>
            </li>
            <li>
              <button
                className="navBtn"
                onClick={() => onClickNav("/market/withdrawal")}
              >
                Withdrawal
              </button>
            </li>
            <li>
              <button
                className="navBtn"
                onClick={() => onClickNav("/setting/referral")}
              >
                Referral
              </button>
            </li>
            <li>
              <button
                className="navBtn"
                onClick={() => onClickNav("/setting/noti")}
              >
                <p>Notifications</p>
                <p className="new">new</p>
              </button>
            </li>
            <li>
              <button
                className="navBtn"
                onClick={() => onClickNav("/setting/security")}
              >
                Settings
              </button>
            </li>
          </ul>

          <button className="logOutBtn" onClick={onClickLogOutBtn}>
            Sign Out
          </button>
        </article>
      </MprofPopupBox>
    );
  else
    return (
      <PprofPopupBox className="profPopup">
        <button className="exitBtn" onClick={() => off()}>
          <img src={I_x} alt="" />
        </button>

        <div className="profBox">
          <span className="posBox"></span>

          <div className="textBox">
            <p className="id">ioimmoj@gmail.com</p>
            <p className="pos">GOLD</p>
          </div>
        </div>

        <div className="accountBox">
          <div className="title">
            <span className="dot" />

            <p>Live account</p>
          </div>

          <ul className="infoList">
            <li>
              <p className="key">Deals</p>
              <p className="value">0</p>
            </li>
            <li>
              <p className="key">Trading turnover</p>
              <p className="value">$0</p>
            </li>
            <li>
              <p className="key">Net turnover</p>
              <p className="value">$0</p>
            </li>
            <li>
              <p className="key">Trading profit</p>
              <p className="value">$0</p>
            </li>
          </ul>
        </div>

        <ul className="navList">
          <li>
            <button
              className="navBtn"
              onClick={() => onClickNav("/setting/prof")}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              className="navBtn"
              onClick={() => onClickNav("/market/deposit")}
            >
              Deposit
            </button>
          </li>
          <li>
            <button
              className="navBtn"
              onClick={() => onClickNav("/market/withdrawal")}
            >
              Withdrawal
            </button>
          </li>
          <li>
            <button
              className="navBtn"
              onClick={() => onClickNav("/setting/referral")}
            >
              Referral
            </button>
          </li>
          <li>
            <button
              className="navBtn"
              onClick={() => onClickNav("/setting/noti")}
            >
              <p>Notifications</p>
              <p className="new">new</p>
            </button>
          </li>
          <li>
            <button
              className="navBtn"
              onClick={() => onClickNav("/setting/security")}
            >
              Settings
            </button>
          </li>
        </ul>

        <button className="logOutBtn" onClick={onClickLogOutBtn}>
          Sign Out
        </button>
      </PprofPopupBox>
    );
}

const MprofPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  color: #fff;
  background: #181c25;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 6;

  .topArea {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 15.56vw;
    min-height: 15.56vw;
    padding: 0 4.44vw;

    .clsBtn {
      img {
        height: 4.44vw;
        opacity: 0.4;
      }
    }
  }

  .contArea {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 6.66vw 5.55vw 8.33vw;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5.55vw 5.55vw 0 0;
    box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);

    .profBox {
      display: flex;
      align-items: center;
      gap: 2.22vw;

      .posBox {
        width: 13.33vw;
        height: 13.33vw;
        border: 1px solid #fff;
        border-radius: 50%;
      }

      .textBox {
        display: flex;
        flex-direction: column;
        gap: 0.55vw;

        .id {
          font-size: 5vw;
        }

        .pos {
          font-size: 3.88vw;
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }

    .accountBox {
      display: flex;
      flex-direction: column;
      gap: 2.77vw;
      padding: 6.66vw 0;
      font-size: 3.88vw;

      .title {
        display: flex;
        align-items: center;
        gap: 1.66vw;

        .dot {
          width: 1.66vw;
          height: 1.66vw;
          background: #fff;
          border-radius: 50%;
        }
      }

      .infoList {
        display: flex;
        flex-direction: column;
        gap: 1.11vw;
        padding: 3.88vw 5.55vw;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 2.77vw;

        li {
          display: flex;
          justify-content: space-between;
          height: 5vw;

          .key {
            color: rgba(255, 255, 255, 0.4);
          }

          .value {
          }
        }
      }
    }

    .navList {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 3.33vw 0;
      border-top: 1.4px solid rgba(255, 255, 255, 0.2);

      li {
        .navBtn {
          display: flex;
          align-items: center;
          gap: 2.77vw;
          width: 100%;
          height: 11.11vw;
          padding: 0 3.88vw;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          border-radius: 1.66vw;

          &:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
          }

          .new {
            color: #ff5353;
          }
        }
      }
    }

    .logOutBtn {
      width: 100%;
      height: 13.88vw;
      font-size: 4.44vw;
      background: rgba(255, 255, 255, 0.1);
      border: 1.2px solid #fff;
      border-radius: 2.77vw;
    }
  }
`;

const PprofPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 34px 30px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.4),
    0px 10px 40px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  top: 60px;
  right: 30px;
  bottom: 30px;
  position: fixed;
  z-index: 6;

  .exitBtn {
    display: block;
    margin: 0 0 0 auto;
    opacity: 0.4;

    img {
      width: 14px;
    }
  }

  .profBox {
    display: flex;
    align-items: center;
    gap: 8px;

    .posBox {
      width: 48px;
      height: 48px;
      border: 1px solid #fff;
      border-radius: 50%;
    }

    .textBox {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .id {
        font-size: 18px;
      }

      .pos {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }

  .accountBox {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 24px 0;
    font-size: 14px;

    .title {
      display: flex;
      align-items: center;
      gap: 6px;

      .dot {
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 50%;
      }
    }

    .infoList {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 14px 20px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 10px;

      li {
        display: flex;
        justify-content: space-between;
        height: 18px;

        .key {
          color: rgba(255, 255, 255, 0.4);
        }

        .value {
        }
      }
    }
  }

  .navList {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 12px 0;
    border-top: 1.4px solid rgba(255, 255, 255, 0.2);

    li {
      button {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        height: 100%;
        padding: 0 14px;
        height: 40px;
        border-radius: 6px;
        color: rgba(255, 255, 255, 0.4);

        &:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .new {
          color: #ff5353;
        }
      }
    }
  }

  .logOutBtn {
    width: 100%;
    height: 50px;
    font-size: 16px;
    border: 1.2px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
`;
