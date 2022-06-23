import { useSelector } from "react-redux";
import styled from "styled-components";
import I_xWhite from "../../img/icon/I_xWhite.svg";

export default function InsufficientPopup({ off, nextProc }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickConfirm() {
    off();
    nextProc(true);
  }

  if (isMobile)
    return (
      <MinsufficientPopupBox className="defaultPopup">
        <article className="topArea">
          <p className="title">Insufficient Balance</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <ul className="balanceList">
            <li>
              <p className="key">Your balance</p>
              <p className="value">{`$${(33.4).toFixed(2)}`}</p>
            </li>
            <li>
              <p className="key">Trace balance</p>
              <p className="value">{`$${(70).toFixed(2)}`}</p>
            </li>
          </ul>

          <button className="addBtn" onClick={onClickConfirm}>
            Add funds
          </button>
        </article>
      </MinsufficientPopupBox>
    );
  else
    return (
      <PinsufficientPopupBox className="defaultPopup">
        <article className="topArea">
          <p className="title">Insufficient Balance</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <ul className="balanceList">
            <li>
              <p className="key">Your balance</p>
              <p className="value">{`$${(33.4).toFixed(2)}`}</p>
            </li>
            <li>
              <p className="key">Trace balance</p>
              <p className="value">{`$${(70).toFixed(2)}`}</p>
            </li>
          </ul>

          <button className="addBtn" onClick={onClickConfirm}>
            Add funds
          </button>
        </article>
      </PinsufficientPopupBox>
    );
}

const MinsufficientPopupBox = styled.section`
  width: 91.11vw;
  color: #fff;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 16.66vw;
    padding: 0 8.33vw;

    .title {
      font-size: 4.44vw;
    }

    .exitBtn {
      img {
        width: 4.44vw;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 5.55vw;
    padding: 2.77vw 6.66vw 8.33vw;

    .balanceList {
      display: flex;
      flex-direction: column;
      gap: 1.11vw;
      padding: 0 1.66vw;
      font-size: 3.88vw;

      li {
        display: flex;
        justify-content: space-between;
      }
    }

    .addBtn {
      height: 13.88vw;
      font-size: 5vw;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 2.22vw;
    }
  }
`;

const PinsufficientPopupBox = styled.section`
  width: 380px;
  color: #fff;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 30px;

    .title {
      font-size: 18px;
    }

    .exitBtn {
      img {
        width: 16px;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 10px 30px 40px;

    .balanceList {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 0 10px;
      font-size: 14px;

      li {
        display: flex;
        justify-content: space-between;
      }
    }

    .addBtn {
      height: 56px;
      font-size: 18px;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 12px;
    }
  }
`;