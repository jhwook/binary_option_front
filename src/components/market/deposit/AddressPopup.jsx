import QRCode from "react-qr-code";
import styled from "styled-components";
import I_xWhite from "../../../img/icon/I_xWhite.svg";
import I_cpWhite from "../../../img/icon/I_cpWhite.svg";
import I_chkOrange from "../../../img/icon/I_chkOrange.svg";
import { onClickCopy } from "../../../util/Util";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function AddressPopup({ off }) {
  const { t } = useTranslation();

  function onClickCopyBtn(str) {
    onClickCopy(str);
    toast(
      <div className="customBox">
        <span className="iconBox">
          <img src={I_chkOrange} alt="" />
        </span>

        <p className="cont">{t("Copied Successfully")}</p>
      </div>,
      {
        toastId: "CustomToastAlarm",
      }
    );
  }

  return (
    <MaddressPopupBox>
      <article className="topArea">
        <span className="blank" />

        <strong className="title">{t("Deposit address")}</strong>

        <button className="exitBtn" onClick={() => off()}>
          <img src={I_xWhite} alt="" />
        </button>
      </article>

      <article className="contArea">
        <span className="qrBox">
          <QRCode
            size={220}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={"http://google.com"}
            viewBox={`0 0 220 220`}
          />
        </span>

        <button
          className="copyBtn"
          onClick={() =>
            onClickCopyBtn("0xd913c9778ca029087789d0da74091bc3b917e34e")
          }
        >
          <p className="address">0xd913c9778ca029087789d0da74091bc3b917e34e</p>

          <img src={I_cpWhite} alt="" />
        </button>
      </article>
    </MaddressPopupBox>
  );
}

const MaddressPopupBox = styled.section`
  max-height: 72vh;
  overflow-y: scroll;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px 20px 0px 0px;
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
    height: 60px;
    padding: 0 24px;
    font-size: 16px;

    .blank,
    .exitBtn img {
      width: 16px;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 14px 16px 60px;

    .qrBox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 240px;
      aspect-ratio: 1;
      padding: 9px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 14px;
    }

    .copyBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      width: 100%;

      p {
        flex: 1;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      img {
        height: 20px;
      }
    }
  }
`;
