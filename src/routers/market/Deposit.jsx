import { useEffect, useState } from "react";
import styled from "styled-components";
import I_dnPolWhite from "../../img/icon/I_dnPolWhite.svg";
import T_usdt from "../../img/token/T_usdt.png";
import T_usdc from "../../img/token/T_usdc.png";
import T_CNY from "../../img/token/T_CNY.png";
import { useSelector } from "react-redux";
import DefaultHeader from "../../components/header/DefaultHeader";
import PopupBg from "../../components/common/PopupBg";
import DetailPopup from "./deposit/DetailPopup";
import { API } from "../../configs/api";
import axios from "axios";
import AddressPopup from "./deposit/AddressPopup";
import SecurityVerifiPopup from "../../components/market/deposit/SecurityVerifiPopup";
import BalancePopup from "../../components/market/deposit/BalancePopup";
import ConfirmUsdt from "../../components/market/deposit/ConfirmUsdt";
import ConfirmCny from "../../components/market/deposit/ConfirmCny";
import { reqTx, getabistr_forfunction } from "../../util/contractcall";
import TokenSelectPopup from "../../components/common/TokenSelectPopup";
import contractaddr from "../../configs/contractaddr";
import { setToast } from "../../util/Util";

export default function Deposit({ userData }) {
  const [isBranch, setIsBranch] = useState(false);
  const isMobile = useSelector((state) => state.common.isMobile);

  const [amount, setAmount] = useState("");
  const [branchData, setBranchData] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [detailPopup, setDetailPopup] = useState(true);
  const [securityVerifiPopup, setSecurityVerifiPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [balancePopup, setBalancePopup] = useState(false);
  const [tokenPopup, setTokenPopup] = useState(false);
  const [token, setToken] = useState({ icon: T_usdt, text: "USDT" });
  const [tokenList, setTokenList] = useState([
    { icon: T_usdt, text: "USDT" },
    { icon: T_usdc, text: "USDC" },
  ]);

  useEffect(() => {
    if (!userData) {
      return;
    }
    let { isbranch } = userData;
    setIsBranch(isbranch);
    if (isbranch) {
      setTokenList([{ icon: T_CNY, text: "CNY" }]);
    } else {
      setTokenList([
        { icon: T_usdt, text: "USDT" },
        { icon: T_usdc, text: "USDC" },
      ]);
    }
  }, [userData]);

  useEffect(()=>{
    if(tokenList){
      setToken(tokenList[0])
    }
  },[tokenList])

  async function directPayment() {
    let { ethereum } = window;
    let address = await ethereum.enable();
    console.log(address[0]);
    if (!ethereum) {
      alert("Install Metamask");
      return;
    }
    let abistr = getabistr_forfunction({
      contractaddress: contractaddr[token.text],
      abikind: "ERC20",
      methodname: "transfer",
      aargs: [contractaddr["admin"], amount + ""],
    });
    reqTx(
      {
        from: address[0],
        to: contractaddr[token.text],
        data: abistr,
        gas: 3000000,
      },
      (txHash) => {
        axios
          .patch(`${API.TRANS_DEPOSIT}/${amount}`, {
            tokentype: token.text,
            txhash: txHash,
            senderaddr: address[0],
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          })
          .then((resp) => {
            if (resp) {
              //Success
              // window.location.reload();

              setToast({ type: "alarm", cont: "Submission Successful" });
              setTimeout(()=>{window.location.reload(false);}, 3000)

            }
          });
      }
    );
  }

  function postLocale() {
    if (!branchData) {
      return;
    }
    axios
      .patch(`${API.TRANS_DEPOSIT}/${amount}`, {
        tokentype: token.text,
        ...branchData,

        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((_) => {
        //Posted
        
        setToast({ type: "alarm", cont: "Submission Successful" });
        setTimeout(()=>{window.location.reload(false);}, 3000)

      });
  }

  function onClickDepositBtn() {
    if (isBranch) setSecurityVerifiPopup(true);
    else {
      directPayment();
    }
  }

  useEffect(() => {
    if (!userData) return;
    console.log(userData);
    if (userData?.isbranch) {
      setIsBranch(true);
    } else {
      setIsBranch(false);
    }
  }, [userData]);

  if (isMobile)
    return (
      <>
        <DefaultHeader title="Deposit" />

        <MdepositBox>
          <section className="innerBox">
            <ul className="inputList">
              <li className="tokenBox">
                <p className="key">Asset</p>

                <div className="selectBox">
                  <button
                    className={`${tokenPopup && "on"} selBtn`}
                    onClick={() => setTokenPopup(true)}
                  >
                    <img className="token" src={token.icon} alt="" />
                    <strong className="name">{token.text}</strong>

                    <img className="arw" src={I_dnPolWhite} />
                  </button>

                  {tokenPopup && (
                    <>
                      <TokenSelectPopup
                        off={setTokenPopup}
                        list={tokenList}
                        setCont={setToken}
                      />
                      <PopupBg off={setTokenPopup} />
                    </>
                  )}
                </div>
              </li>

              <li className="amountBox">
                <p className="key">Amount</p>

                <div className="valueBox">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder=""
                  />
                  <strong className="unit">{token.text}</strong>
                </div>

                <ul className="optList">
                  <button
                    className={`${amount === 100 && "on"} optBtn`}
                    onClick={() => setAmount(100)}
                  >
                    {isBranch ? "¥" : "$"}100
                  </button>
                  <button
                    className={`${amount === 200 && "on"} optBtn`}
                    onClick={() => setAmount(200)}
                  >
                    {isBranch ? "¥" : "$"}200
                  </button>
                  <button
                    className={`${amount === 300 && "on"} optBtn`}
                    onClick={() => setAmount(300)}
                  >
                    {isBranch ? "¥" : "$"}300
                  </button>
                  <button
                    className={`${amount === 400 && "on"} optBtn`}
                    onClick={() => setAmount(400)}
                  >
                    {isBranch ? "¥" : "$"}400
                  </button>
                </ul>
              </li>
            </ul>

            <article className="depositArea">
              <ul className="infoList">
                <li>
                  <p className="key">Commission</p>
                  <p className="value">0%</p>
                </li>
                <li>
                  <p className="key">Minimum deposit amount</p>
                  <p className="value">5 {token.text}</p>
                </li>
                <li>
                  <p className="key">Max amount per transaction</p>
                  <p className="value">0no limits</p>
                </li>
              </ul>

              <button
                className="depositBtn"
                disabled={!amount}
                onClick={onClickDepositBtn}
              >
                Deposit
              </button>
            </article>
          </section>
        </MdepositBox>

        {detailPopup && (
          <>
            <DetailPopup off={setDetailPopup} />
            <PopupBg bg off={setDetailPopup} />
          </>
        )}

        {confirm && (
          <>
            <AddressPopup off={setConfirm} />
            <PopupBg bg off={setConfirm} />
          </>
        )}
      </>
    );
  else
    return (
      <>
        <PdepositBox>
          <article className="deposit">
            <div className="key">
              <span className="count">1</span>

              <strong className="title">Deposit</strong>
            </div>

            <div className="value">
              <ul className="inputList">
                <li className="tokenBox">
                  <p className="key">Asset</p>

                  <div className="selectBox">
                    <button
                      className={`${tokenPopup && "on"} selBtn`}
                      onClick={() => setTokenPopup(true)}
                    >
                      <img className="token" src={token.icon} alt="" />
                      <strong className="name">{token.text}</strong>

                      <img className="arw" src={I_dnPolWhite} />
                    </button>

                    {tokenPopup && (
                      <>
                        <TokenSelectPopup
                          off={setTokenPopup}
                          list={tokenList}
                          setCont={setToken}
                        />
                        <PopupBg off={setTokenPopup} />
                      </>
                    )}
                  </div>
                </li>

                <li className="amountBox">
                  <p className="key">Amount</p>

                  <div className="valueBox">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder=""
                    />
                    <strong className="unit">{token.text}</strong>
                  </div>

                  <ul className="optList">
                    <button
                      className={`${amount === 100 && "on"} optBtn`}
                      onClick={() => setAmount(100)}
                    >
                      {isBranch ? "¥" : "$"}100
                    </button>
                    <button
                      className={`${amount === 200 && "on"} optBtn`}
                      onClick={() => setAmount(200)}
                    >
                      {isBranch ? "¥" : "$"}200
                    </button>
                    <button
                      className={`${amount === 300 && "on"} optBtn`}
                      onClick={() => setAmount(300)}
                    >
                      {isBranch ? "¥" : "$"}300
                    </button>
                    <button
                      className={`${amount === 400 && "on"} optBtn`}
                      onClick={() => setAmount(400)}
                    >
                      {isBranch ? "¥" : "$"}400
                    </button>
                  </ul>
                </li>
              </ul>

              <div className="depositBox">
                <ul className="infoList">
                  <li>
                    <p className="key">Commission</p>
                    <p className="value">0%</p>
                  </li>
                  <li>
                    <p className="key">Minimum deposit amount</p>
                    <p className="value">5 {token.text}</p>
                  </li>
                  <li>
                    <p className="key">Max amount per transaction</p>
                    <p className="value">0no limits</p>
                  </li>
                </ul>

                <button
                  className="depositBtn"
                  disabled={!amount}
                  onClick={onClickDepositBtn}
                >
                  Deposit
                </button>
              </div>
            </div>
          </article>

          <article className="detailArea">
            <div className="key">
              <span className="count">2</span>

              <strong className="title">Confirm deposit details</strong>
            </div>

            {confirm ? (
              isBranch ? (
                <ConfirmCny
                  setConfirm={setConfirm}
                  amount={amount}
                  setOk={(e) => {
                    e && postLocale();
                  }}
                />
              ) : (
                <ConfirmUsdt />
              )
            ) : (
              <div className="value">
                <p className="head">Important :</p>

                <ul className="bodyList">
                  <li>
                    Please make sure that only USD deposit is made via this
                    address. Otherwise, your deposited funds will not be added
                    to your available balance — nor will it be refunded.
                  </li>
                  <li>
                    Please make sure that your Betbit deposit address is
                    correct. Otherwise, your deposited funds will not be added
                    to your available balance — nor will it be refunded.
                  </li>
                  <li>
                    Please note that the current asset does not support deposit
                    via the smart contract. If used, your deposited funds will
                    not be added to your available balance — nor will it be
                    refunded.
                  </li>
                </ul>
              </div>
            )}
          </article>
        </PdepositBox>

        {securityVerifiPopup && (
          <>
            <SecurityVerifiPopup
              off={setSecurityVerifiPopup}
              setBalancePopup={setBalancePopup}
            />
            <PopupBg off={setSecurityVerifiPopup} />
          </>
        )}

        {balancePopup && (
          <>
            <BalancePopup
              off={setBalancePopup}
              setConfirm={setConfirm}
              setData={setBranchData}
            />
            <PopupBg off={setBalancePopup} />
          </>
        )}
      </>
    );
}

const MdepositBox = styled.main`
  padding: 5.55vw;

  .innerBox {
    display: flex;
    flex-direction: column;
    gap: 15vw;

    .inputList {
      display: flex;
      flex-direction: column;
      gap: 3.88vw;

      li {
        &.tokenBox {
          .selectBox {
            margin: 2.77vw 0 0 0;
            background: rgba(255, 255, 255, 0.1);
            border: 1.4px solid rgba(0, 0, 0, 0);
            border-radius: 10px;
            position: relative;

            .selBtn {
              display: flex;
              align-items: center;
              gap: 2.22vw;
              width: 100%;
              height: 13.88vw;
              padding: 0 6.11vw;
              font-size: 20px;
              font-weight: 700;

              &.on {
                .arw {
                  opacity: 1;
                  transform: rotate(180deg);
                }
              }

              .token {
                width: 8.33vw;
                aspect-ratio: 1;
              }

              .name {
                text-align: start;
                flex: 1;
              }

              .arw {
                height: 8px;
                opacity: 0.4;
              }
            }
          }
        }

        &.amountBox {
          .optList {
            display: flex;
            gap: 2.77vw;
            margin: 2.77vw 0 0 0;
            font-size: 4.44vw;
            overflow-x: scroll;

            .optBtn {
              flex: 1;
              height: 9.44vw;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 2.22vw;
              color: rgba(255, 255, 255, 0.6);
              border: 1px solid rgba(255, 255, 255, 0.4);

              &.on {
                color: #fff;
                border: 1px solid #fff;
              }
            }
          }
        }

        .key {
          font-size: 3.88vw;
        }

        .valueBox {
          display: flex;
          align-items: center;
          gap: 2.22vw;
          height: 13.88vw;
          padding: 0 6.11vw;
          margin: 2.77vw 0 0 0;
          font-size: 5vw;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2.77vw;
          border: 1.4px solid rgba(0, 0, 0, 0);
          cursor: pointer;
          position: relative;

          input {
            flex: 1;
            height: 100%;
          }

          &:focus-within {
            border-color: #f7ab1f;
          }
        }
      }
    }

    .depositArea {
      .infoList {
        display: flex;
        flex-direction: column;
        gap: 2.22vw;
        padding: 3.33vw 3.88vw 3.88vw;
        background: rgba(0, 0, 0, 0.6);

        li {
          display: flex;
          justify-content: space-between;
          font-size: 3.88vw;

          .key {
            opacity: 0.6;
          }

          .value {
          }
        }
      }

      .depositBtn {
        width: 100%;
        height: 13.88vw;
        font-size: 4.44vw;
        font-weight: 700;
        color: #4e3200;
        background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
        border-radius: 2.77vw;

        &:disabled {
          color: #f7ab1f;
          background: #fff;
        }
      }
    }
  }
`;

const PdepositBox = styled.main`
  flex: 1;
  display: flex;
  gap: 100px;
  padding: 70px 140px;

  @media (max-width: 1440px) {
    max-width: 1020px;
    min-width: 1020px;
    padding: 70px 40px 70px 80px;
  }

  & > article {
    display: flex;
    flex-direction: column;
    gap: 40px;

    & > .key {
      display: flex;
      align-items: center;
      gap: 12px;

      .count {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        font-size: 14px;
        color: #2a2a2a;
        border-radius: 50%;
        background: #f7ab1f;
      }

      .title {
        font-size: 24px;
      }
    }

    &.deposit {
      width: 454px;
      min-width: 392px;

      & > .value {
        display: flex;
        flex-direction: column;
        gap: 60px;

        .inputList {
          display: flex;
          flex-direction: column;
          gap: 20px;

          li {
            &.tokenBox {
              .selectBox {
                margin: 10px 0 0 0;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                border: 1.4px solid rgba(0, 0, 0, 0);
                position: relative;

                .selBtn {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  width: 100%;
                  height: 56px;
                  padding: 0 24px;
                  font-size: 20px;
                  font-weight: 700;

                  &.on {
                    .arw {
                      opacity: 1;
                      transform: rotate(180deg);
                    }
                  }

                  .token {
                    width: 38px;
                    aspect-ratio: 1;
                    filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4));
                  }

                  .name {
                    text-align: start;
                    flex: 1;
                  }

                  .arw {
                    height: 8px;
                    opacity: 0.4;
                  }
                }
              }
            }

            &.amountBox {
              .optList {
                display: flex;
                gap: 12px;
                margin: 14px 0 0 0;
                font-size: 20px;
                overflow-x: scroll;

                .optBtn {
                  flex: 1;
                  height: 42px;
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 8px;
                  color: rgba(255, 255, 255, 0.6);
                  border: 1px solid rgba(255, 255, 255, 0.4);

                  &.on {
                    color: #fff;
                    border: 1px solid #fff;
                  }
                }
              }
            }

            .key {
              font-size: 16px;
            }

            .valueBox {
              display: flex;
              align-items: center;
              gap: 10px;
              height: 56px;
              padding: 0 24px;
              margin: 10px 0 0 0;
              font-size: 20px;
              font-weight: 700;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
              border: 1.4px solid rgba(0, 0, 0, 0);
              cursor: pointer;
              position: relative;

              input {
                flex: 1;
                height: 100%;
              }

              &:focus-within {
                border-color: #f7ab1f;
              }
            }
          }
        }

        .depositBox {
          .infoList {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 16px 18px 20px;
            background: rgba(0, 0, 0, 0.6);

            li {
              display: flex;
              justify-content: space-between;
              font-size: 16px;

              .key {
                opacity: 0.6;
              }

              .value {
              }
            }
          }

          .depositBtn {
            width: 100%;
            height: 56px;
            font-size: 18px;
            font-weight: 700;
            color: #4e3200;
            background: linear-gradient(
              99.16deg,
              #604719 3.95%,
              #f7ab1f 52.09%
            );
            border-radius: 10px;

            &:disabled {
              color: #f7ab1f;
              background: #fff;
            }
          }
        }
      }
    }

    &.detailArea {
      width: 472px;

      & > .value {
        height: 478px;
        padding: 40px 28px;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.4),
          0px 10px 40px rgba(255, 255, 255, 0.2);

        .head {
          font-size: 16px;
        }

        .bodyList {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 14px 0 0 0;

          li {
            margin: 0 0 0 20px;
            font-size: 14px;
            opacity: 0.4;
            list-style-type: disc;
          }
        }
      }
    }
  }
`;
