import styled from "styled-components";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ReqeustPopup({ off }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [cont, setCont] = useState("");

  function onClickSendBtn() {
    off();
  }

  if (isMobile)
    return (
      <MrequestPopupBox>
        <article className="topArea">
          <span className="blank" />

          <p className="title">Submit a request</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <textarea
            value={cont}
            onChange={(e) => setCont(e.target.value)}
            placeholder=""
          />

          <button className="sendBtn" onClick={onClickSendBtn}>
            Send request
          </button>
        </article>
      </MrequestPopupBox>
    );
  else
    return (
      <PrequestPopupBox>
        <article className="topArea">
          <span className="blank" />

          <p className="title">Submit a request</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <textarea
            value={cont}
            onChange={(e) => setCont(e.target.value)}
            placeholder=""
          />

          <button className="sendBtn" onClick={onClickSendBtn}>
            Send request
          </button>
        </article>
      </PrequestPopupBox>
    );
}

const MrequestPopupBox = styled.section`
  max-height: 60vh;
  overflow-y: scroll;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 5.55vw 5.55vw 0px 0px;
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
    padding: 0 5.55vw;
    font-size: 5vw;

    .blank,
    .exitBtn img {
      width: 4.44vw;
      opacity: 0.2;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 5.55vw;
    padding: 0 5.55vw 8.33vw;

    textarea {
      height: 34.44vw;
      padding: 2.77vw;
      font-size: 4.44vw;
      background: rgba(0, 0, 0, 0.3);
      border: 1.4px solid transparent;
      border-radius: 2.77vw;

      &:focus-within {
        border-color: #fff;
      }
    }

    .sendBtn {
      height: 13.88vw;
      font-size: 5vw;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #fff;
      border-radius: 3.33vw;

      &:hover {
        box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

const PrequestPopupBox = styled.section`
  width: 500px;
  height: 360px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);
  border: 1.4px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 6;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 30px;
    font-size: 20px;

    .blank,
    .exitBtn img {
      width: 16px;
      opacity: 0.2;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 14px 40px 0;

    textarea {
      height: 140px;
      padding: 10px;
      font-size: 16px;
      background: rgba(0, 0, 0, 0.3);
      border: 1.4px solid transparent;
      border-radius: 10px;

      &:focus-within {
        border-color: #fff;
      }
    }

    .sendBtn {
      height: 56px;
      font-size: 18px;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #fff;
      border-radius: 12px;

      &:hover {
        box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
