import { useEffect, useState } from "react";
import styled from "styled-components";
import { D_currencyList, D_tokenCategoryList } from "../../data/D_bet";
import I_searchWhite from "../../img/icon/I_searchWhite.svg";
import I_xWhite from "../../img/icon/I_xWhite.svg";
import I_starYellow from "../../img/icon/I_starYellow.svg";
import I_starYellowO from "../../img/icon/I_starYellowO.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { API, URL } from "../../configs/api";

export default function TokenPopup({ off, setAsset, getBookMark }) {
  const isMobile = useSelector((state) => state.common.isMobile);
  const token = localStorage.getItem("token");

  const [category, setCategory] = useState(D_tokenCategoryList[0].value);
  const [searchMode, setSearchMode] = useState(false);
  const [search, setSearch] = useState("");
  const [listData, setListData] = useState([]);

  function onClickStock(asset) {
    console.log(asset);
    setAsset(asset);
    off();
  }

  function onClickFavBtn(e, i, v) {
    e.stopPropagation();

    console.log(v);

    axios
      .post(`${API.BOOKMARK}/assets/${v.id}`)
      .then((res) => {
        console.log(res);

        let data = listData;
        data[i].status = !data[i].status;

        setListData([...data]);
        getBookMark();
      })
      .catch((err) => console.error(err));
  }

  function getAssetList() {
    axios
      .get(`${API.GET_ASSETS}`, { params: { group: category } })
      .then(({ data }) => {
        console.log(data.respdata);
        setListData(data.respdata);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `${token}`;

    getAssetList();
  }, [category]);

  if (isMobile)
    return (
      <MtokenPopupBox>
        <article className="topArea">
          {searchMode ? (
            <div className="searchBox">
              <button
                className="cancelBtn"
                onClick={() => setSearchMode(false)}
              >
                <img src={I_xWhite} alt="" />
              </button>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. “ETH” or “Ethereum”"
              />
            </div>
          ) : (
            <>
              <ul className="categoryList">
                {D_tokenCategoryList.map((v, i) => (
                  <li
                    key={i}
                    className={`${category === v.value && "on"}`}
                    onClick={() => setCategory(v.value)}
                  >
                    {v.key}
                  </li>
                ))}
              </ul>

              <button className="searchBtn" onClick={() => setSearchMode(true)}>
                <img src={I_searchWhite} alt="" />
              </button>
            </>
          )}
        </article>

        <article className="listArea">
          <ul className="tokenList">
            {listData
              .filter((e) => !e.fav)
              .map((v, i) => (
                <li key={i} onClick={() => onClickStock(v)}>
                  <button
                    className="favBtn"
                    onClick={(e) => onClickFavBtn(e, i, v)}
                  >
                    {v.status ? (
                      <img src={I_starYellowO} alt="" />
                    ) : (
                      <img src={I_starYellow} alt="" />
                    )}
                  </button>

                  <img className="tknImg" src={v.imgurl} alt="" />

                  <p className="name">{v.name}</p>

                  {/* <p className="percent">{`${v.payout.toFixed(2)}%`}</p> */}
                </li>
              ))}
          </ul>
        </article>

        <footer>
          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>

          <strong className="explain">Select market</strong>
        </footer>
      </MtokenPopupBox>
    );
  else
    return (
      <PtokenPopupBox>
        <article className="topArea">
          {searchMode ? (
            <div className="searchBox">
              <button
                className="cancelBtn"
                onClick={() => setSearchMode(false)}
              >
                <img src={I_xWhite} alt="" />
              </button>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. “ETH” or “Ethereum”"
              />
            </div>
          ) : (
            <>
              <ul className="categoryList">
                {D_tokenCategoryList.map((v, i) => (
                  <li
                    key={i}
                    className={`${category === v.value && "on"}`}
                    onClick={() => setCategory(v.value)}
                  >
                    {v.key}
                  </li>
                ))}
              </ul>

              <button className="searchBtn" onClick={() => setSearchMode(true)}>
                <img src={I_searchWhite} alt="" />
              </button>
            </>
          )}
        </article>

        <article className="listArea">
          <ul className="tokenList">
            {listData
              .filter((v) => v.bookmark)
              .map((v, i) => (
                <li key={i} onClick={() => onClickStock(v)}>
                  <button
                    className="favBtn"
                    onClick={(e) => onClickFavBtn(e, i, v)}
                  >
                    {v.status ? (
                      <img src={I_starYellowO} alt="" />
                    ) : (
                      <img src={I_starYellow} alt="" />
                    )}
                  </button>

                  <img className="tknImg" src={v.imgurl} alt="" />

                  <p className="name">{v.name}</p>

                  {/* <p className="percent">{`${v.payout.toFixed(2)}%`}</p> */}
                </li>
              ))}

            {listData
              .filter((v) => !v.bookmark)
              .map((v, i) => (
                <li key={i} onClick={() => onClickStock(v)}>
                  <button
                    className="favBtn"
                    onClick={(e) => onClickFavBtn(e, i, v)}
                  >
                    {v.status ? (
                      <img src={I_starYellowO} alt="" />
                    ) : (
                      <img src={I_starYellow} alt="" />
                    )}
                  </button>

                  <img className="tknImg" src={v.imgurl} alt="" />

                  <p className="name">{v.name}</p>

                  {/* <p className="percent">{`${v.payout.toFixed(2)}%`}</p> */}
                </li>
              ))}
          </ul>
        </article>
      </PtokenPopupBox>
    );
}

const MtokenPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  background: #181c25;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 6;

  .topArea {
    display: flex;
    align-items: center;
    gap: 5.55vw;
    height: 17.77vw;
    padding: 0 4.44vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    .searchBox {
      flex: 1;
      display: flex;
      gap: 2.22vw;
      height: 10.55vw;
      font-size: 3.88vw;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5.55vw;

      .cancelBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        aspect-ratio: 1;
        background: rgba(255, 255, 255, 0.1);
        border: 1.2px solid rgba(255, 255, 255, 0.4);
        border-radius: 50%;

        img {
          width: 4.44vw;
          opacity: 0.4;
        }
      }
    }

    .categoryList {
      flex: 1;
      display: flex;
      gap: 2.22vw;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 10.55vw;
        padding: 0 4.44vw;
        font-size: 3.88vw;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid transparent;
        border-radius: 20px;
        cursor: pointer;

        &.on {
          border-color: #fff;
        }
      }
    }

    .searchBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10.55vw;
      aspect-ratio: 1;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;

      img {
        width: 5vw;
      }
    }
  }

  .listArea {
    flex: 1;
    overflow-y: scroll;

    .tokenList {
      display: flex;
      flex-direction: column;
      font-size: 4.44vw;

      & > li {
        display: flex;
        align-items: center;
        gap: 2.77vw;
        height: 16.66vw;
        padding: 0 5.55vw;
        cursor: pointer;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .favBtn {
          width: 3.88vw;
        }

        .tknImg {
          height: 9.44vw;
        }

        .name {
          flex: 1;
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

const PtokenPopupBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 500px;
  height: 930px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  top: 50px;
  position: absolute;
  z-index: 6;

  .topArea {
    display: flex;
    align-items: center;
    gap: 40px;
    height: 40px;

    .searchBox {
      flex: 1;
      display: flex;
      gap: 14px;
      height: inherit;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;

      .cancelBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        aspect-ratio: 1;
        background: rgba(255, 255, 255, 0.1);
        border: 1.2px solid rgba(255, 255, 255, 0.4);
        border-radius: 50%;

        img {
          width: 16px;
          opacity: 0.4;
        }
      }
    }

    .categoryList {
      flex: 1;
      display: flex;
      gap: 10px;

      li {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        padding: 0 24px;
        font-size: 16px;
        font-weight: 700;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid transparent;
        border-radius: 20px;
        cursor: pointer;

        &.on {
          border-color: #fff;
        }
      }
    }

    .searchBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;

      img {
        width: 18px;
      }
    }
  }

  .listArea {
    flex: 1;
    padding: 0 8px 0 0;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      width: 6px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 10px;
    }

    .tokenList {
      display: flex;
      flex-direction: column;
      font-size: 16px;

      & > li {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 50px;
        padding: 0 14px;
        cursor: pointer;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .favBtn {
          width: 14px;
        }

        .tknImg {
          height: 34px;
        }

        .name {
          flex: 1;
        }
      }
    }
  }
`;
