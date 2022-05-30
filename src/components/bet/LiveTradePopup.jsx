import styled from "styled-components";

export default function LiveTradePopup({ off }) {
  function onClickDepositBtn() {
    off();
  }

  return (
    <LiveTradePopupBox className="defaultPopup">
      <p className="explain">
        Please first top up the balance to start Live Trading. (Minimum
        investment amount is $5)
      </p>

      <div className="buttonBox">
        <button className="depositBtn" onClick={onClickDepositBtn}>
          Deposit now
        </button>

        <button className="demoBtn" onClick={() => off()}>
          Demo trading
        </button>
      </div>
    </LiveTradePopupBox>
  );
}

const LiveTradePopupBox = styled.section`
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
