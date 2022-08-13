import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import I_x from "../../../img/icon/I_x.svg";
import I_xWhite from "../../../img/icon/I_xWhite.svg";

export default function TimeOutPopup({ off }) {
  const { t } = useTranslation();
  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickGotBtn() {
    off();
    window.location.reload();
  }

  if (isMobile)
    return (
      <MtimeOutPopupBox className="defaultPopup">
        <article className="topArea">
          <span className="blank" />

          <p className="title">{t("Notice")}</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <p className="explain">
            {t(
              "Request timed out! Your order has been automatically canceled. Please note that up to 3 cancelations can be made per day. For more information, please contact customer support."
            )}
          </p>

          <button className="confirmBtn" onClick={onClickGotBtn}>
            {t("Got it")}
          </button>
        </article>
      </MtimeOutPopupBox>
    );
  else
    return (
      <PtimeOutPopupBox className="defaultPopup">
        <article className="topArea">
          <span className="blank" />

          <p className="title">{t("Notice")}</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_x} alt="" />
          </button>
        </article>

        <article className="contArea">
          <p className="explain">
            {t(
              "Request timed out! Your order has been automatically canceled. Please note that up to 3 cancelations can be made per day. For more information, please contact customer support."
            )}
          </p>

          <button className="confirmBtn" onClick={onClickGotBtn}>
            {t("Got it")}
          </button>
        </article>
      </PtimeOutPopupBox>
    );
}

const MtimeOutPopupBox = styled.section`
  width: 328px;
  max-height: 80vh;
  overflow-y: scroll;
  color: #fff;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 0 30px;

    .title {
      font-size: 16px;
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
    gap: 22px;
    padding: 12px 24px 30px;

    .explain {
      font-size: 14px;
      text-align: center;
    }

    .confirmBtn {
      height: 50px;
      font-size: 16px;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 8px;
    }
  }
`;

const PtimeOutPopupBox = styled.section`
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
    gap: 30px;
    padding: 10px 42px 44px;

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
