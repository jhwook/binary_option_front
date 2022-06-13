import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { D_headerList, D_lngList } from "../../data/D_header";
import L_yellow from "../../img/logo/L_yellow.svg";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import { ReactComponent as I_hamburger } from "../../img/icon/I_hamburger.svg";
import PopupBg from "../common/PopupBg";
import SelLngPopup from "./SelLngPopup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProfPopup from "./ProfPopup";
import { useSelector } from "react-redux";
import MenuPopup from "./MenuPopup";
import MyBalancePopup from "./MyBalancePopup";
import AuthPopup from "./AuthPopup";

export default function DefaultHeader({ white, border, title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const isMobile = useSelector((state) => state.common.isMobile);

  const [lngPopup, setLngPopup] = useState(false);
  const [profPopup, setProfPopup] = useState(false);
  const [myBalancePopup, setMyBalancePopup] = useState(false);
  const [menuPopup, setMenuPopup] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);

  const token = localStorage.getItem("token");

  function onClickMenuBtn() {
    if (white) setAuthPopup(true);
    else setMenuPopup(true);
  }

  if (isMobile)
    return (
      <>
        <MdefaultHeaderBox
          className={`${white && "white"} ${border && "border"}`}
        >
          <article className="leftArea">
            {title ? (
              <p className="title">{title}</p>
            ) : token ? (
              <span className="accountBtn">{`Demo $1000`}</span>
            ) : (
              <button className="logoBtn" onClick={() => navigate("/")}>
                <img src={L_yellow} alt="" />
              </button>
            )}
          </article>

          <article className="rightArea">
            <button className="menuBtn" onClick={onClickMenuBtn}>
              <I_hamburger />
            </button>
          </article>
        </MdefaultHeaderBox>

        {menuPopup && <MenuPopup off={setMenuPopup} />}

        {authPopup && <AuthPopup off={setAuthPopup} />}
      </>
    );
  else
    return (
      <>
        <PdefaultHeaderBox
          className={`${white && "white"} ${border && "border"}`}
        >
          <article className="leftArea">
            <button className="logoBtn" onClick={() => navigate("/")}>
              <img src={L_yellow} alt="" />
            </button>

            {!white && (
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
                <button
                  className="accountBtn"
                  onClick={() => setMyBalancePopup(true)}
                >{`Demo $1000`}</button>

                <span className="profBox">
                  <button className="myBtn" onClick={() => setProfPopup(true)}>
                    MY
                  </button>
                </span>
              </>
            ) : (
              <>
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

                <button
                  className="loginBtn"
                  onClick={() => navigate("/auth/login")}
                >
                  LOGIN
                </button>
              </>
            )}
          </article>
        </PdefaultHeaderBox>

        {myBalancePopup && (
          <>
            <MyBalancePopup off={setMyBalancePopup} />
            <PopupBg off={setMyBalancePopup} />
          </>
        )}

        {profPopup && (
          <>
            <ProfPopup off={setProfPopup} />
            <PopupBg off={setProfPopup} />
          </>
        )}
      </>
    );
}

const MdefaultHeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15.55vw;
  padding: 0 5.55vw;
  color: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 3;

  &.border {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  &.white {
    color: #2a2a2a;
    background: #fff;
    border-bottom: none;
    box-shadow: unset;

    .rightArea {
      .menuBtn {
        svg {
          width: 5vw;

          .fill {
            fill: #000;
          }
        }
      }
    }
  }

  .leftArea {
    .title {
      font-size: 4.44vw;
    }

    .logoBtn {
      display: flex;
      align-items: center;

      img {
        height: 5vw;
      }
    }
  }

  .rightArea {
    .menuBtn {
      svg {
        width: 5vw;

        .fill {
          fill: #fff;
        }
      }
    }
  }
`;

const PdefaultHeaderBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 3;

  &.border {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  &.white {
    color: #2a2a2a;
    background: #fff;
    border-bottom: none;

    .rightArea {
      .profBox {
        .profPopup {
          color: #fff;
          background: #2a2a2a;
        }
      }

      .lngBox {
      }

      .loginBtn {
        color: #2a2a2a;
        border: 1px solid #2a2a2a;
      }
    }
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

    .accountBtn,
    .profBox .myBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 34px;
      background: rgba(255, 255, 255, 0.1);

      &.accountBtn {
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
        height: 30px;
        padding: 0 12px;
        font-size: 14px;
        font-weight: 700;
        border-radius: 6px;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }

      .selectPopup {
        background: #22262e;

        li {
          &.on {
            color: #fff;
          }
        }
      }
    }

    .loginBtn {
      width: 132px;
      height: 34px;
      font-weight: 700;
      border: 1px solid #fff;
      border-radius: 28px;

      &:hover {
        color: #f7ab1f;
        border-color: #f7ab1f;
      }
    }
  }
`;
