import styled from "styled-components";
import { D_chartTypeList, D_timeList } from "../../data/D_bet";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ChartOptPopup({ off, chartOpt, setChartOpt }) {
  const { t } = useTranslation();
  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickTypeBtn(v) {
    let _chartOpt = chartOpt;

    _chartOpt.type = v.type;
    _chartOpt.typeStr = v.typeStr;
    setChartOpt({ ..._chartOpt });
  }

  function onClickTimeBtn(v) {
    let _chartOpt = chartOpt;

    _chartOpt.barSizeStr = v.key;
    _chartOpt.barSize = v.value;
    setChartOpt({ ..._chartOpt });
  }

  if (isMobile)
    return (
      <MchartOptPopupBox>
        <article className="typeArea">
          <p className="key">{t("Chart types")}</p>
          <ul className="value">
            {D_chartTypeList.map((v, i) => (
              <li
                key={i}
                className={`${chartOpt.typeStr === v.typeStr && "on"}`}
                onClick={() => onClickTypeBtn(v)}
              >
                <img src={v.icon} alt="" />
                <p>{t(v.typeStr)}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="timeArea">
          <p className="key">{t("Time frames")}</p>

          <ul className="value">
            {D_timeList.map((v, i) => (
              <li
                key={i}
                className={`${chartOpt.barSize === v.value && "on"}`}
                onClick={() => onClickTimeBtn(v)}
              >
                <strong>{v.key}</strong>
              </li>
            ))}
          </ul>
        </article>
      </MchartOptPopupBox>
    );
  else return <></>;
}

const MchartOptPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px 20px 0 0;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 6;

  article {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: rgba(255, 255, 255, 0.4);

    .key {
      font-size: 14px;
    }

    .value {
    }

    &.typeArea {
      .value {
        display: flex;
        gap: 10px;

        li {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          aspect-ratio: 1;
          font-size: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          cursor: pointer;

          &.on {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
            border-color: #fff;

            img {
              opacity: 1;
            }
          }

          img {
            width: 48%;
            opacity: 0.4;
          }
        }
      }
    }

    &.timeArea {
      .value {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 72px;
          height: 38px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          cursor: pointer;

          &.on {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
            border-color: #fff;
          }
        }
      }
    }
  }
`;
