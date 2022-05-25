import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { D_lngList } from "../../data/D_header";

export default function SelLngPopup({ off, list, setCont }) {
  // const isMobile = useSelector((state) => state.common.isMobile);
  const { i18n } = useTranslation();

  function onClickCont(v) {
    i18n.changeLanguage(v.value);
    if (setCont) setCont(v.key);
    if (off) off();
  }

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

const PselLangPopupBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100px;
  padding: 10px 16px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.2);
  top: 28px;
  right: 0;
  position: absolute;
  z-index: 6;

  li {
    font-size: 14px;
    color: #888;
    cursor: pointer;

    &.on {
      font-weight: 700;
      color: #f7ab1f;
    }
  }
`;
