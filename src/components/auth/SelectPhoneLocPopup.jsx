import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { API } from "../../configs/api";

export default function SelectPhoneLocPopup({ off, setCont }) {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API.PHONE_COUNTRY_CODE}`)
      .then(({ data }) => {
        console.log(data);
        setList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  function onClickCont(v) {
    if (setCont) setCont(v.dialcode);
    if (off) off();
  }

  if (isMobile)
    return (
      <MselectPhoneLocPopup className="selectPopup">
        <ul className="contList">
          {list
            .sort((a, b) => {
              return a.dialcode - b.dialcode;
            })
            .map((v, i) => (
              <li key={i} onClick={() => onClickCont(v)}>
                <p>{v.dialcode}</p>
              </li>
            ))}
        </ul>
      </MselectPhoneLocPopup>
    );
  else
    return (
      <PselectPhoneLocPopup className="selectPopup">
        <ul className="contList">
          {list
            .sort((a, b) => {
              return a.dialcode - b.dialcode;
            })
            .map((v, i) => (
              <li key={i} onClick={() => onClickCont(v)}>
                <p>{v.dialcode}</p>
              </li>
            ))}
        </ul>
      </PselectPhoneLocPopup>
    );
}

const MselectPhoneLocPopup = styled.section`
  display: flex;
  flex-direction: column;
  width: 77.77vw;
  height: 74.44vw;
  padding: 4.44vw 2.22vw 4.44vw 0;
  background: #fff;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.2);
  border-radius: inherit;
  top: 14.44vw;
  position: absolute;
  z-index: 6;

  .contList {
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      width: 6px;
      background-color: #888;
      border-radius: 10px;
    }

    li {
      display: flex;
      align-items: center;
      height: 9.44vw;
      padding: 0 5.55vw;
      font-size: 3.88vw;
      cursor: pointer;

      &:hover {
        color: #f7ab1f;
      }

      p {
        width: 100%;
      }
    }
  }
`;

const PselectPhoneLocPopup = styled.section`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 268px;
  padding: 16px 8px 16px 0;
  background: #fff;
  border: 1px solid #d6d6d6;
  border-radius: inherit;
  top: 52px;
  position: absolute;
  overflow-y: scroll;
  z-index: 6;

  .contList {
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      width: 6px;
      background-color: #888;
      border-radius: 10px;
    }

    li {
      display: flex;
      align-items: center;
      height: 34px;
      padding: 0 20px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: #f7ab1f;
      }

      p {
        width: 100%;
      }
    }
  }
`;
