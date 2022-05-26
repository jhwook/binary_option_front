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
  gap: 2px;
  width: 100%;
  padding: 10px 8px;
  background: #fff;
  border: 1px solid #d6d6d6;
  border-radius: inherit;
  top: 0;
  position: absolute;
  overflow-y: scroll;
  z-index: 6;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    font-size: 14px;
    color: #b1b1b1;
    cursor: pointer;

    &:hover {
      color: #0044a7;
    }
  }
`;
