import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import I_x from "../../img/icon/I_x.svg";

export default function ProfPopup({ off }) {
  const navigate = useNavigate();

  function onClickLogOutBtn() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <ProfPopupBox>
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
          <button className="navBtn" onClick={() => navigate("/setting/prof")}>
            Profile
          </button>
        </li>
        <li>
          <button className="navBtn" onClick={() => {}}>
            Deposit
          </button>
        </li>
        <li>
          <button className="navBtn" onClick={() => {}}>
            Withdrawal
          </button>
        </li>
        <li>
          <button className="navBtn" onClick={() => {}}>
            Notifications
          </button>

          <p className="new">new</p>
        </li>
        <li>
          <button className="navBtn" onClick={() => {}}>
            Settings
          </button>
        </li>
      </ul>

      <button className="logOutBtn" onClick={onClickLogOutBtn}>
        Sign Out
      </button>
    </ProfPopupBox>
  );
}

const ProfPopupBox = styled.section`
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
    gap: 22px;
    padding: 24px 10px;
    border-top: 1.4px solid rgba(255, 255, 255, 0.2);

    li {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        color: rgba(255, 255, 255, 0.4);
      }

      .new {
        color: #ff5353;
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
