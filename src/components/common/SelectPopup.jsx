import { useSelector } from "react-redux";
import styled from "styled-components";

export default function SelectPopup({ off, list, setCont }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickCont(v) {
    if (setCont) setCont(v);
    if (off) off();
  }

  return (
    <PselectPopupBox className="selectPopup">
      {list.map((v, i) => (
        <li key={i} onClick={() => onClickCont(v)}>
          <p>{v}</p>
        </li>
      ))}
    </PselectPopupBox>
  );
}

const PselectPopupBox = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: inherit;
  top: 0;
  position: absolute;
  overflow-y: scroll;
  z-index: 6;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 22px;
    font-size: 12px;
    cursor: pointer;
  }
`;
