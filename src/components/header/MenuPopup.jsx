import styled from "styled-components";
import MyBalancePopup from "./MyBalancePopup";
import AddPopup from "./AddPopup";
import PopupBg from "../common/PopupBg";
import ProfPopup from "./ProfPopup";
import { useState } from "react";
import { D_headerList, D_moreList } from "../../data/D_header";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import { useNavigate } from "react-router-dom";

export default function MenuPopup({ off }) {
  const navigate = useNavigate();

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
          <button
            className="accountBtn"
            onClick={() => setMyBalancePopup(true)}
          >{`Demo $1000`}</button>

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
        </article>

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
          <PopupBg off={setMyBalancePopup} />
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
  }

  .navList {
    flex: 1;
    padding: 5.55vw;
    overflow-y: scroll;

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
