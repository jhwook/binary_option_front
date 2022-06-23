import styled from "styled-components";
import MyBalancePopup from "./MyBalancePopup";
import AddPopup from "./AddPopup";
import PopupBg from "../common/PopupBg";
import ProfPopup from "./ProfPopup";
import { useState } from "react";
import { D_headerList, D_moreList } from "../../data/D_header";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import I_langWhite from "../../img/icon/I_langWhite.svg";
import I_quesCircleWhite from "../../img/icon/I_quesCircleWhite.svg";
import { useNavigate } from "react-router-dom";
import SelLngPopup from "./SelLngPopup";

export default function MenuPopup({ off, userData }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const balanceType = localStorage.getItem("balanceType");

  const [lngPopup, setLngPopup] = useState(false);
  const [profPopup, setProfPopup] = useState(false);
  const [myBalancePopup, setMyBalancePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);

  function onClickNav(url) {
    navigate(url);
    off();
  }

  return (
    <>
      <MenuPopupBox>
        <article className="topArea">
          {token ? (
            <>
              <button
                className="accountBtn"
                onClick={() => setMyBalancePopup(true)}
              >
                {balanceType === "Demo" ? (
                  <p>{`Demo $${userData?.demoAvail}`}</p>
                ) : (
                  <p>{`Live $${userData?.liveAvail}`}</p>
                )}
              </button>

              <span className="profBox">
                <button className="myBtn" onClick={() => setProfPopup(true)}>
                  MY
                </button>
              </span>
            </>
          ) : (
            <>
              <span />

              <button
                className="loginBtn"
                onClick={() => navigate("/auth/login")}
              >
                LOGIN
              </button>
            </>
          )}
        </article>

        <article className="contArea">
          <ul className="navList">
            {D_headerList.map((v, i) => {
              if (v.det)
                return (
                  <li key={i}>
                    <details>
                      <summary>
                        <strong className="title">{v.key}</strong>
                        <img src={I_dnPolWhite} alt="" />
                      </summary>

                      <ul className="detNavList">
                        {v.det.map((detV, i) => (
                          <li key={i} onClick={() => onClickNav(detV.url)}>
                            {detV.key}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              else
                return (
                  <button className="navBtn" onClick={() => navigate(v.url)}>
                    <strong className="title">{v.key}</strong>
                  </button>
                );
            })}

            <details>
              <summary>
                <strong className="title">More</strong>
                <img src={I_dnPolWhite} alt="" />
              </summary>

              <ul className="detNavList">
                {D_moreList.map((v, i) => (
                  <li key={i}>{v.key}</li>
                ))}
              </ul>
            </details>
          </ul>

          <span className="btnBox">
            <span className="posBox">
              <button className="lngBtn" onClick={() => setLngPopup(true)}>
                <img src={I_langWhite} alt="" />
              </button>

              {lngPopup && (
                <>
                  <SelLngPopup off={setLngPopup} />
                  <PopupBg off={setLngPopup} />
                </>
              )}
            </span>

            <button className="quesBtn" onClick={() => navigate("/qna")}>
              <img src={I_quesCircleWhite} alt="" />
            </button>
          </span>
        </article>

        <footer>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>

          <strong className="explain">Menu</strong>
        </footer>
      </MenuPopupBox>

      {myBalancePopup && (
        <>
          <MyBalancePopup off={setMyBalancePopup} setAddPopup={setAddPopup} />
          <PopupBg off={setMyBalancePopup} index={6} />
        </>
      )}

      {profPopup && (
        <>
          <ProfPopup off={setProfPopup} offAll={off} userData={userData} />
          <PopupBg off={setProfPopup} />
        </>
      )}

      {addPopup && (
        <>
          <AddPopup off={setAddPopup} />
          <PopupBg off={setAddPopup} />
        </>
      )}
    </>
  );
}

const MenuPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  color: #fff;
  background: #181c25;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 6;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15.55vw;
    padding: 0 4.44vw;
    font-size: 3.88vw;

    .accountBtn,
    .profBox .myBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 9.44vw;
      background: rgba(255, 255, 255, 0.1);

      &.accountBtn {
        width: 32.22vw;
        border-radius: 7.77vw;
      }

      &.myBtn {
        aspect-ratio: 1;
        border-radius: 50%;
      }
    }

    .loginBtn {
      width: 36.66vw;
      height: 9.44vw;
      font-weight: 700;
      border: 1px solid #fff;
      border-radius: 7.77vw;
    }
  }

  .contArea {
    flex: 1;
    padding: 5.55vw;
    overflow-y: scroll;
    position: relative;

    .navList {
      details {
        &[open] {
          summary {
            opacity: 1;

            img {
              transform: rotate(180deg);
            }
          }
        }

        summary {
          display: flex;
          align-items: center;
          gap: 2.77vw;
          height: 13.88vw;
          font-size: 6.11vw;
          opacity: 0.4;

          img {
            height: 1.66vw;
          }
        }

        .detNavList {
          padding: 2.77vw 0;

          li {
            height: 12.22vw;
            padding: 0 5.55vw;
            font-size: 5.55vw;
            font-weight: 700;
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0.4;
          }
        }
      }

      .navBtn {
        display: flex;
        align-items: center;
        height: 13.88vw;
        font-size: 6.11vw;
        opacity: 0.4;

        &:focus {
          opacity: 1;
        }
      }
    }

    .btnBox {
      display: flex;
      flex-direction: column;
      gap: 3.33vw;
      position: fixed;
      right: 6.11vw;
      bottom: 20vw;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 9.44vw;
        aspect-ratio: 1;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;

        img {
          width: 5.55vw;
          height: 5.55vw;
          object-fit: contain;
        }
      }
    }
  }

  footer {
    display: flex;
    align-items: center;
    height: 15.55vw;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .exitBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 17.22vw;
      height: 100%;

      img {
        width: 4.44vw;
      }
    }

    .explain {
      padding: 0 5.55vw;
      margin: 3.33vw 0;
      font-size: 4.44vw;
      color: rgba(255, 255, 255, 0.6);
      border-left: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;
