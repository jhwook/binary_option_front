import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { D_marketLeftBarList } from "../../data/D_market";

export default function LeftBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <LeftBarBox>
      <ul className="navList">
        {D_marketLeftBarList.map((v, i) => (
          <li
            key={i}
            className={`${
              location.pathname.indexOf(String(v.key).toLocaleLowerCase()) !==
                -1 && "on"
            }`}
            onClick={() => navigate(`/market/${v.url}`)}
          >
            {v.key}
          </li>
        ))}
      </ul>
    </LeftBarBox>
  );
}

const LeftBarBox = styled.aside`
  width: 348px;
  padding: 70px 14px 14px 14px;
  top: 60px;
  left: 0;
  bottom: 0;
  position: fixed;
  border-right: 1px solid rgba(255, 255, 255, 0.2);

  .navList {
    li {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 16px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;

      &.on {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;
