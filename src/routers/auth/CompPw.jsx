import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function CompPw() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickConfirmBtn() {
    navigate("/auth/login");
  }

  if (isMobile)
    return (
      <>
        <McompPwBox>
          <section className="innerBox">
            <article className="titleArea">
              <strong className="title">Password Changed</strong>

              <p className="explain">Please log in with the new password.</p>
            </article>

            <button className="contBtn" onClick={onClickConfirmBtn}>
              Continue
            </button>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </McompPwBox>
      </>
    );
  else
    return (
      <>
        <PcompPwBox>
          <section className="innerBox">
            <article className="titleArea">
              <strong className="title">Password Changed</strong>

              <p className="explain">Please log in with the new password.</p>
            </article>

            <button className="contBtn" onClick={onClickConfirmBtn}>
              Continue
            </button>
          </section>

          <p className="cpRight">© 2022 Betbit.com. All rights reserved</p>
        </PcompPwBox>
      </>
    );
}

const McompPwBox = styled.main`
  padding: 15.55vw 0 0 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 12.22vw;
    padding: 38.88vw 4.44vw 0;

    .titleArea {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3.33vw;
      color: #2a2a2a;

      .title {
        font-size: 6.11vw;
      }

      .explain {
        font-size: 3.88vw;
      }
    }

    .contBtn {
      height: 13.88vw;
      font-size: 4.44vw;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(98.13deg, #604719 -9.29%, #f7ab1f 45.07%);
      border-radius: 2.22vw;
    }
  }

  .cpRight {
    margin: 8.33vw 0;
    font-size: 3.33vw;
    text-align: center;
    white-space: nowrap;
    color: #ddd;
  }
`;

const PcompPwBox = styled.main`
  display: flex;
  justify-content: center;
  padding: 70px 0;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 44px;
    width: 400px;
    padding: 90px 0;

    .titleArea {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .pgTitle {
        font-size: 28px;
      }

      .explain {
        font-size: 16px;
      }
    }

    .contBtn {
      height: 56px;
      font-size: 18px;
      font-weight: 700;
      color: #4e3200;
      background: linear-gradient(98.13deg, #604719 -9.29%, #f7ab1f 45.07%);
      border-radius: 8px;
    }
  }

  .cpRight {
    font-size: 12px;
    bottom: 30px;
    left: 50%;
    position: fixed;
    transform: translate(-50%);
  }
`;
