import styled from "styled-components";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function SecurityVerifiPopup({ off, confirmationPopup }) {
  function onClickConfirmBtn() {
    confirmationPopup(true);
    off();
  }

  return (
    <PSecurityVerifiPopupBox className="defaultPopup">
      <article className="topArea">
        <span className="blank" />

        <p className="title">Security Verification</p>

        <button className="exitBtn" onClick={() => off()}>
          <img src={I_xWhite} alt="" />
        </button>
      </article>

      <article className="contArea">
        <p className="explain">
          Please enter the following conditions for this action to verify your
          account.
        </p>

        <button className="confirmBtn" onClick={onClickConfirmBtn}>
          Confirm
        </button>
      </article>
    </PSecurityVerifiPopupBox>
  );
}

const PSecurityVerifiPopupBox = styled.section`
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
    padding: 18px 30px 40px;

    .explain {
      font-size: 14px;
      text-align: center;
    }

    .confirmBtn {
      height: 56px;
      font-size: 18px;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 12px;
    }
  }
`;
