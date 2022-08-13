import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import styled from "styled-components";
import I_cpWhite from "../../../img/icon/I_cpWhite.svg";
import { onClickCopy, setToast } from "../../../util/Util";

export default function ConfirmUsdt() {
  const { t } = useTranslation();
  function onClickCopyBtn(str) {
    onClickCopy(str);
    setToast({ type: "alarm", cont: "Copied Successfully" });
  }

  return (
    <PconfirmUsdtBox className="value on">
      <strong className="head">{t("Deposit address")}</strong>

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
    </PconfirmUsdtBox>
  );
}

const PconfirmUsdtBox = styled.div`
  .qrBox {
    display: block;
    width: 240px;
    height: 240px;
    padding: 10px;
    margin: 40px auto 0 auto;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 14px;
  }

  .copyBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 30px 0 0 0;

    p {
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      opacity: 0.6;
    }
  }
`;
