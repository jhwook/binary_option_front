import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { API } from "../../configs/api";
import I_xWhite from "../../img/icon/I_xWhite.svg";

export default function AddPopup({ off }) {
  const isMobile = useSelector((state) => state.common.isMobile);
  const token = localStorage.getItem("token");

  const [amount, setAmount] = useState("");

  function onClickAddBtn() {
    axios.defaults.headers.common["Authorization"] = `${token}`;

    axios
      .patch(`${API.TRANS_DEMO_FUND}/${amount}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  }

  if (isMobile)
    return (
      <MaddPopupBox className="defaultPopup">
        <article className="topArea">
          <span className="blank" />

          <p className="title">Add</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="inputCont">
            <p className="key">Add virtual money on Demo account</p>
            <div className="value">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder=""
              />

              <p className="unit">USDT</p>
            </div>
          </div>

          <button className="addBtn" onClick={onClickAddBtn}>
            Add funds
          </button>
        </article>
      </MaddPopupBox>
    );
  else
    return (
      <PaddPopupBox className="defaultPopup">
        <article className="topArea">
          <span className="blank" />

          <p className="title">Add</p>

          <button className="exitBtn" onClick={() => off()}>
            <img src={I_xWhite} alt="" />
          </button>
        </article>

        <article className="contArea">
          <div className="inputCont">
            <p className="key">Add virtual money on Demo account</p>
            <div className="value">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder=""
              />

              <p className="unit">USDT</p>
            </div>
          </div>

          <button className="addBtn" onClick={onClickAddBtn}>
            Add funds
          </button>
        </article>
      </PaddPopupBox>
    );
}

const MaddPopupBox = styled.section`
  width: 91.11vw;
  color: #fff;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 16.66vw;
    padding: 0 8.33vw;

    .title {
      font-size: 4.44vw;
    }

    .blank,
    .exitBtn img {
      width: 4.44vw;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 5.55vw;
    padding: 2.77vw 6.66vw 8.33vw;

    .inputCont {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3.33vw;

      .key {
        font-size: 3.33vw;
        color: rgba(255, 255, 255, 0.4);
      }

      .value {
        display: flex;
        align-items: center;
        width: 100%;
        height: 11.11vw;
        padding: 0 5.55vw;
        font-size: 3.88vw;
        background: rgba(0, 0, 0, 0.4);
        border: 1.4px solid transparent;
        border-radius: 1.66vw;

        &:focus-within {
          border-color: rgba(247, 171, 31, 0.4);
        }

        input {
          flex: 1;
        }
      }
    }

    .addBtn {
      height: 13.88vw;
      font-size: 5vw;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 2.22vw;
    }
  }
`;

const PaddPopupBox = styled.section`
  width: 380px;
  color: #fff;

  .topArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 30px;

    .title {
      font-size: 18px;
    }

    .blank,
    .exitBtn img {
      width: 16px;
    }
  }

  .contArea {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 14px 30px 40px;

    .inputCont {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      .key {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
      }

      .value {
        display: flex;
        align-items: center;
        width: 100%;
        height: 44px;
        padding: 0 20px;
        font-size: 16px;
        background: rgba(0, 0, 0, 0.4);
        border: 1.4px solid transparent;
        border-radius: 10px;

        &:focus-within {
          border-color: rgba(247, 171, 31, 0.4);
        }

        input {
          flex: 1;
        }
      }
    }

    .addBtn {
      height: 56px;
      font-size: 18px;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
      border-radius: 12px;
    }
  }
`;