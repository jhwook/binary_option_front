import { useSelector } from "react-redux";
import styled from "styled-components";

export default function TokenSelectPopup({ off, list, setCont }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickCont(v) {
    if (setCont) setCont(v);
    if (off) off();
  }

  if (isMobile)
    return (
      <MselectPopupBox className="selectPopup">
        {list.map((v, i) => (
          <li key={i} onClick={() => onClickCont(v)}>
            <img className="icon" src={v.icon} />
            <p>{v.text}</p>
          </li>
        ))}
      </MselectPopupBox>
    );
  else
    return (
      <PselectPopupBox className="selectPopup">
        {list.map((v, i) => (
          <li key={i} onClick={() => onClickCont(v)}>
            <img className="icon" src={v.icon} />
            <p>{v.text}</p>
          </li>
        ))}
      </PselectPopupBox>
    );
}

const MselectPopupBox = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: inherit;
  position: absolute;
  overflow-y: scroll;
  z-index: 6;

  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    height: 50px;
    padding: 0 16px;
    font-size: 18px;
    font-weight: 700;
    opacity: 0.4;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    .icon {
      width: 30px;
      aspect-ratio: 1;
      object-fit: contain;
    }
  }
`;

const PselectPopupBox = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: inherit;
  overflow-y: scroll;
  top: 56px;
  position: absolute;
  z-index: 6;

  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    height: 56px;
    padding: 0 18px;
    font-size: 20px;
    font-weight: 700;
    opacity: 0.4;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    .icon {
      width: 38px;
      aspect-ratio: 1;
      object-fit: contain;
    }
  }
`;
