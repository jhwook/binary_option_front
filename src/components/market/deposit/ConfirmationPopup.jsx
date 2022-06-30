import { useSelector } from "react-redux";
import styled from "styled-components";
import I_x from "../../../img/icon/I_x.svg";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function ConfirmationPopup({ off }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickConfirmBtn() {
    off();
  }

  if (isMobile)
    return (
      <MconfirmationPopupBox className="defaultPopup">
        <article className="topArea">
          <span className="blank" />

          <p className="title">Confirmation</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <p className="explain">
            I understand that clicking on "Payment Completed" before a
            successful payment may cause my account to be restricted.
          </p>

          <div className="btnBox">
            <button className="confirmBtn" onClick={onClickConfirmBtn}>
              Acknowledge
            </button>
          </div>
        </article>
      </MconfirmationPopupBox>
    );
  else
    return (
      <PconfirmationPopupBox className="defaultPopup">
        <article className="topArea">
          <span className="blank" />

          <p className="title">Confirmation</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contArea">
          <p className="explain">
            I understand that clicking on "Payment Completed" before a
            successful payment may cause my account to be restricted.
          </p>

          <div className="btnBox">
            <button className="confirmBtn" onClick={onClickConfirmBtn}>
              Acknowledge
            </button>

            <button className="cancelBtn" onClick={() => off()}>
              Cancel
            </button>
          </div>
        </article>
      </PconfirmationPopupBox>
    );
}

const MconfirmationPopupBox = styled.section`
  width: 91.11vw;
  max-height: 80vh;
  overflow-y: scroll;
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
        opacity: 0.4;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 6.11vw;
    padding: 3.33vw 6.66vw 8.33vw;

    .explain {
      font-size: 3.88vw;
      text-align: center;
    }

    .btnBox {
      .confirmBtn {
        width: 100%;
        height: 13.88vw;
        font-size: 4.44vw;
        font-weight: 700;
        color: #4e3200;
        background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
        border-radius: 2.22vw;
      }
    }
  }
`;

const PconfirmationPopupBox = styled.section`
  width: 500px;
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
        opacity: 0.4;
      }
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 44px;
    padding: 30px 40px 44px;

    .explain {
      font-size: 14px;
      text-align: center;
    }

    .btnBox {
      display: flex;
      align-items: center;
      gap: 20px;

      button {
        flex: 1;
        height: 56px;
        font-size: 18px;
        font-weight: 700;
        border-radius: 10px;

        &.confirmBtn {
          color: #4e3200;
          background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
        }

        &.cancelBtn {
          color: #f7ab1f;
          border: 2px solid #f7ab1f;
        }
      }
    }
  }
`;
