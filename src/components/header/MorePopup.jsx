import styled from "styled-components";

import I_quesCircleWhite from "../../img/icon/I_quesCircleWhite.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MorePopup({ off }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function onClickCont(func) {
    func && func();
    off();
  }

  return (
    <MorePopupBox>
      <li onClick={() => onClickCont(navigate("/qna"))}>
        <img src={I_quesCircleWhite} alt="" />

        <p>{t("Help")}</p>
      </li>
    </MorePopupBox>
  );
}

const MorePopupBox = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  top: 40px;
  left: 0;
  position: absolute;
  z-index: 6;

  li {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;

    img {
      width: 16px;
    }
  }
`;
