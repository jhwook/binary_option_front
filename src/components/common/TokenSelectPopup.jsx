import { useSelector } from "react-redux";
import styled from "styled-components";

export default function TokenSelectPopup({ off, list, setCont }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickCont(v) {
    if (setCont) setCont(v);
    if (off) off();
  }

  return (
    <PselectPopupBox className="selectPopup">
      {list.map((v, i) => (
        <li key={i} onClick={() => onClickCont(v)}>
          <img className="icon" src={v.icon}/><p>{v.text}</p>
        </li>
      ))}
    </PselectPopupBox>
  );
}

const PselectPopupBox = styled.ul`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border-radius: inherit;
  position: absolute;
  overflow-y: scroll;
  z-index: 6;
  width: 454px;

  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 56px;
    padding: 0 24px;
    font-size: 20px;
            font-weight: 700;
    cursor: pointer;
    .icon{
      width: 38px;
      margin-right: 10px;
    }

  }
`;
