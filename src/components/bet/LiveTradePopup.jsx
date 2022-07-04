import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function LiveTradePopup({ off }) {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.common.isMobile);

  function onClickDepositBtn() {
    navigate("/market/deposit");
    off();
  }

  function onClickDemoBtn() {
    navigate("/bet/demo");
    off();
  }

  if (isMobile)
    return (
      <MliveTradePopupBox className="defaultPopup">
        <p className="explain">
          Please first top up the balance to start Live Trading.
        </p>

        <div className="buttonBox">
          <button className="depositBtn" onClick={onClickDepositBtn}>
            Deposit now
          </button>

          <button className="demoBtn" onClick={onClickDemoBtn}>
            Demo trading
          </button>
        </div>
      </MliveTradePopupBox>
    );
  else
    return (
      <PliveTradePopupBox className="defaultPopup">
        <p className="explain">
          Please first top up the balance to start Live Trading. (Minimum
          investment amount is $5)
        </p>

        <div className="buttonBox">
          <button className="depositBtn" onClick={onClickDepositBtn}>
            Deposit now
          </button>

          <button className="demoBtn" onClick={onClickDemoBtn}>
            Demo trading
          </button>
        </div>
      </PliveTradePopupBox>
    );
}

const MliveTradePopupBox = styled.section`
  width: 300px;
  font-size: 14px;
  color: #fff;
  border-radius: 14px;
  overflow: hidden;

  .explain {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 104px;
    padding: 0 45px;
    text-align: center;
  }

  .buttonBox {
    display: flex;
    gap: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    button {
      flex: 1;
      height: 50px;
      color: #f7ab1f;

      &:nth-of-type(n + 2) {
        border-left: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const PliveTradePopupBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 440px;
  height: 230px;
  color: #fff;
  padding: 70px 30px 0;

  .explain {
    font-size: 16px;
    text-align: center;
  }

  .buttonBox {
    display: flex;
    gap: 16px;

    button {
      flex: 1;
      height: 50px;
      color: #f7ab1f;
      border: 1.4px solid #f7ab1f;
      border-radius: 12px;

      &:hover {
        background: linear-gradient(
          99.16deg,
          rgba(96, 71, 25, 0.4) 3.95%,
          rgba(247, 171, 31, 0.4) 52.09%
        );
      }
    }
  }
`;
