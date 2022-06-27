import styled from "styled-components";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function DetailPopup({ off }) {
  return (
    <MdetailPopupBox>
      <article className="topArea">
        <span className="blank" />

        <p className="title">Deposit details</p>

        <button className="exitBtn" onClick={() => off()}>
          <img src={I_xWhite} alt="" />
        </button>
      </article>

      <article className="contArea">
        <div className="detailBox">
          <p className="key">Important :</p>

          <ul className="valueList">
            <li>
              Please make sure that only ETH deposit is made via this address.
              Otherwise, your deposited funds will not be added to your
              available balance — nor will it be refunded.
            </li>
            <li>
              Please make sure that your Betbit deposit address is correct.
              Otherwise, your deposited funds will not be added to your
              available balance — nor will it be refunded.
            </li>
            <li>
              Please note that the current asset does not support deposit via
              the smart contract. If used, your deposited funds will not be
              added to your available balance — nor will it be refunded.
            </li>
          </ul>
        </div>

        <button className="confirmBtn" onClick={() => off()}>
          Confirm
        </button>
      </article>
    </MdetailPopupBox>
  );
}

const MdetailPopupBox = styled.section`
  max-height: 72vh;
  overflow-y: scroll;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5.55vw 5.55vw 0px 0px;
  box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 6;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 16.66vw;
    padding: 0 6.66vw;
    font-size: 5vw;

    .blank,
    .exitBtn img {
      width: 4.44vw;
      opacity: 0.4;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 8.33vw;
    padding: 5vw 5.55vw 8.88vw;

    .detailBox {
      display: flex;
      flex-direction: column;
      gap: 5vw;
      font-size: 3.88vw;

      .key {

      }

      .valueList {
        display: flex;
        flex-direction: column;
        gap: 3.88vw;
        padding: 0 0 0 4.44vw;
        opacity: 0.4;

        li {
          list-style-type: disc;
        }
      }
    }

    .confirmBtn {
      height: 13.88vw;
      font-size: 4.44vw;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #fff;
      border-radius: 2.77vw;
    }
  }
`;
