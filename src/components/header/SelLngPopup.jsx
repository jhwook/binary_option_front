import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { D_lngList } from "../../data/D_header";

export default function SelLngPopup({ white, off }) {
  const { i18n } = useTranslation();
  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickCont(v) {
    i18n.changeLanguage(v.value);
    localStorage.setItem("lng", v.value);
    if (off) off();
  }

  if (isMobile)
    return (
      <MselLangPopupBox className={`${white && "white"} selectPopup`}>
        {D_lngList.map((v, i) => (
          <li
            key={i}
            className={`${i18n.language === v.value && "on"}`}
            onClick={() => onClickCont(v)}
          >
            <p>{v.key}</p>
          </li>
        ))}
      </MselLangPopupBox>
    );
  else
    return (
      <PselLangPopupBox className="selectPopup">
        {D_lngList.map((v, i) => (
          <li
            key={i}
            className={`${i18n.language === v.value && "on"}`}
            onClick={() => onClickCont(v)}
          >
            <p>{v.key}</p>
          </li>
        ))}
      </PselLangPopupBox>
    );
}

const MselLangPopupBox = styled.ul`
  display: flex;
  flex-direction: column;
  width: 120px;
  padding: 6px 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1.4px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.4),
    0px 10px 40px rgba(0, 0, 0, 0.2);
  right: 64px;
  bottom: 20px;
  position: fixed;
  z-index: 7;

  &.white {
    li {
      color: #888;
      cursor: pointer;

      &.on {
        font-weight: 700;
        color: #f7ab1f;
      }
    }
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 40px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;

    &.on {
      color: #fff;
    }
  }
`;

const PselLangPopupBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 6px;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.2);
  top: 40px;
  right: 0;
  position: absolute;
  z-index: 6;

  li {
    font-size: 14px;
    color: #888;
    cursor: pointer;

    &.on {
      font-weight: 700;
      color: #fff;
    }
  }
`;
