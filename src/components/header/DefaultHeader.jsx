import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { D_headerList, D_lngList } from "../../data/D_header";
import L_yellow from "../../img/logo/L_yellow.svg";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import PopupBg from "../common/PopupBg";
import SelLngPopup from "./SelLngPopup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProfPopup from "./ProfPopup";

export default function DefaultHeader({ white }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const [lngPopup, setLngPopup] = useState(false);
  const [profPopup, setProfPopup] = useState(false);

  const token = localStorage.getItem("token");

  return (
    <>
      <DefaultHeaderBox className={`${white && "white"}`}>
        <article className="leftArea">
          <button className="logoBtn" onClick={() => navigate("/")}>
            <img src={L_yellow} alt="" />
          </button>

          {token && (
            <ul className="navList">
              {D_headerList.map((v, i) => (
                <li
                  key={i}
                  className={`${
                    location.pathname.indexOf(
                      String(v.key).toLocaleLowerCase()
                    ) !== -1 && "on"
                  }`}
                  onClick={() => navigate(v.url)}
                >
                  {v.key}
                </li>
              ))}

              <button className="moreBtn" onClick={() => {}}>
                <p>More</p>
                <img src={I_dnPolWhite} alt="" />
              </button>
            </ul>
          )}
        </article>

        <article className="rightArea">
          {token ? (
            <>
              <span className="accountBox">{`Demo $1000`}</span>

              <span className="profBox">
                <button className="myBtn" onClick={() => setProfPopup(true)}>
                  MY
                </button>

                {profPopup && (
                  <>
                    <ProfPopup off={setProfPopup} />
                    <PopupBg off={setProfPopup} />
                  </>
                )}
              </span>
            </>
          ) : (
            <div className="lngBox">
              <button className="lngBtn" onClick={() => setLngPopup(true)}>
                {D_lngList.find((e) => e.value === i18n.language).key}
              </button>

              {lngPopup && (
                <>
                  <SelLngPopup off={setLngPopup} />
                  <PopupBg off={setLngPopup} />
                </>
              )}
            </div>
          )}
        </article>
      </DefaultHeaderBox>
    </>
  );
}

const DefaultHeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  color: #fff;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 3;

  &.white {
    color: #2a2a2a;
    background: #fff;
    border-bottom: none;
  }

  .leftArea {
    display: flex;
    align-items: center;
    gap: 32px;

    .logoBtn {
      display: flex;
      align-items: center;
      img {
        height: 22px;
      }
    }

    .navList {
      display: flex;
      gap: 24px;

      li {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 12px;
        border-radius: 6px;
        cursor: pointer;

        &.on {
          background: rgba(255, 255, 255, 0.1);
        }
      }

      .moreBtn {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }

  .rightArea {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;

    & > .accountBox,
    .profBox .myBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 34px;
      background: rgba(255, 255, 255, 0.1);

      &.accountBox {
        width: 124px;
        border-radius: 28px;
      }

      &.myBtn {
        width: 34px;
        border-radius: 50%;
      }
    }

    .profBox {
    }

    .lngBox {
      position: relative;

      .lngBtn {
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
`;
