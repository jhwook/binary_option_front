import { useEffect, useState } from "react";
import styled from "styled-components";
import I_Arw from "../../img/icon/I_XSArw.svg";
import T_usdt from "../../img/token/T_usdt.png";
import T_usdc from "../../img/token/T_usdc.png";
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
import ConfirmationPopup from "../../components/market/deposit/ConfirmationPopup";
import {reqTx, getabistr_forfunction} from "../../util/contractcall"
import TokenSelectPopup from "../../components/common/TokenSelectPopup";
import contractaddr from "../../configs/contractaddr"

export default function Deposit({userData}) {
  const [isBranch, setIsBranch] = useState(false);
  const isMobile = useSelector((state) => state.common.isMobile);

  const [amount, setAmount] = useState("");
  const [branchData, setBranchData] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [detailPopup, setDetailPopup] = useState(false);
  const [securityVerifiPopup, setSecurityVerifiPopup] = useState(false);
  const [confirmationPopup, setConfirmationPopup] = useState(false);
  const [balancePopup, setBalancePopup] = useState(false);
  const [tokenPopup, setTokenPopup] = useState(false)
  const [token, setToken] = useState({icon: T_usdt, text: 'USDT'});
  const [tokenList, setTokenList] = useState([{icon: T_usdt, text: 'USDT'}, {icon: T_usdc, text: 'USDC'}])

  useEffect(()=>{
    if(!userData){return;}
    let {isbranch} = userData;
    setIsBranch(isbranch)
    if(isbranch){
      setTokenList([{icon: T_usdc, text: 'CNY'}])
    }else{
      setTokenList([{icon: T_usdt, text: 'USDT'}, {icon: T_usdc, text: 'USDC'}])
    }
  }, [userData])

  async function directPayment(){
    let {ethereum} = window;
    let address = await ethereum.enable()
    console.log(address[0])
    if(!ethereum){alert("Install Metamask"); return;}
    let abistr=getabistr_forfunction({
      contractaddress: contractaddr[token.text],
      abikind: 'ERC20',
      methodname: 'transfer',
      aargs: [contractaddr['admin'], amount+""]
    })
    reqTx({
      from: address[0],
      to: contractaddr[token.text],
      data: abistr,
      gas: 3000000
    }, (txHash)=>{
      axios.patch(`${API.TRANS_DEPOSIT}/${amount}`,{
        tokentype: token.text,
        txhash: txHash,
        
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        }
      })
      .then(resp=>{
        if(resp){
          //Success
          window.location.reload()
        }
      })
    })
  }
  function postLocale(){
    if(!branchData){return;}
    axios.patch(`${API.TRANS_DEPOSIT}/${amount}`,{
      tokentype: token.text,
      ...branchData,
      
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      }
    })
    .then(_=>{
      //Posted
    })
  }

  function onClickDepositBtn() {
    if (isBranch) setSecurityVerifiPopup(true);
    else {
      directPayment()
      setConfirm(true);
    }
  }

  useEffect(()=>{
    if(!userData) return;
    console.log(userData)
    if(userData?.isbranch){
      
      setIsBranch(true)
    }else{
      setIsBranch(false)
    }
  },[userData])

  // useEffect(() => {
  //   axios
  //     .get(API.BET_ROUND)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.error(err));
  // }, []);

  if (isMobile)
    return (
      <>
        <DefaultHeader title="Deposit" />

        <MdepositBox>
          <section className="innerBox">
            <article className="tokenArea">
              <img src={T_usdt} alt="" />
              <strong>USDT</strong>
            </article>

            <ul className="infoList">
              <li>
                <p className="key">Commission</p>
                <p className="value">0%</p>
              </li>
              <li>
                <p className="key">Minimum deposit amount</p>
                <p className="value">5 USDT</p>
              </li>
              <li>
                <p className="key">Max amount per transaction</p>
                <p className="value">0no limits</p>
              </li>
            </ul>

            <article className="amountArea">
              <div className="contBox">
                <p className="key">Amount</p>

                <div className="valueBox">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder=""
                  />
                  <strong className="unit">{isBranch ? "CNY" : "USDT"}</strong>
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
              </div>

              <button
                className="depositBtn"
                disabled={!amount}
                onClick={() => setConfirm(true)}
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
              <div className="tokenBoxre">
                <p className="key">Asset</p>

                <div className="valueBox" onClick={()=>setTokenPopup(!tokenPopup)}>
                  <div className="selectedToken">
                    <img className="token" src={token.icon} alt="" />
                    <strong className="unit">{token.text}</strong>
                  </div>
                  <img className="Arw" src={I_Arw} />
                  
                </div>
                {
                  tokenPopup && (
                    <TokenSelectPopup off={setTokenPopup} list={tokenList} setCont={setToken}/>
                  )
                }
                
              </div>
              
              

              

              <div className="amountBox">
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
                <ConfirmCny setConfirm={setConfirm} setOk={(e)=>{(e)&&postLocale()}}/>
              ) : (
                <ConfirmUsdt />
              )
            ) : (
              <div className="value">
                <p className="head">Important :</p>

                <ul className="bodyList">
                  <li>
                    Please make sure that only ETH deposit is made via this
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
            <BalancePopup off={setBalancePopup} setConfirm={setConfirm} setData={setBranchData} />
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
    gap: 8.33vw;

    .tokenArea {
      display: flex;
      align-items: center;
      gap: 2.77vw;
      font-size: 6.11vw;

      img {
        width: 10.55vw;
        height: 10.55vw;
        object-fit: contain;
      }
    }

    .infoList {
      display: flex;
      flex-direction: column;
      gap: 2.22vw;
      padding: 3.33vw 3.88vw;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 2.22vw;

      li {
        display: flex;
        justify-content: space-between;
        font-size: 3.88vw;

        .key {
        }

        .value {
        }
      }
    }

    .amountArea {
      display: flex;
      flex-direction: column;
      gap: 8.33vw;

      .contBox {
        display: flex;
        flex-direction: column;
        gap: 2.77vw;

        .key {
          font-size: 3.88vw;
        }

        .valueBox {
          display: flex;
          align-items: center;
          height: 13.88vw;
          padding: 0 5.55vw;
          font-size: 5vw;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2.77vw;
          border: 1.4px solid rgba(0, 0, 0, 0);

          &:focus-within {
            border-color: #f7ab1f;
          }

          input {
            flex: 1;
            height: 100%;
            font-weight: inherit;
          }

          .unit {
          }
        }

        .optList {
          display: flex;
          gap: 2.77vw;

          button {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 9.44vw;
            color: rgba(255, 255, 255, 0.6);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.4);
            border-radius: 2.22vw;

            &.on {
              color: #fff;
              border: 1px solid #fff;
            }
          }
        }
      }

      .depositBtn {
        width: 100%;
        height: 13.88vw;
        font-size: 5vw;
        font-weight: 700;
        color: #4e3200;
        background: linear-gradient(99.16deg, #604719 3.95%, #f7ab1f 52.09%);
        border-radius: 10px;

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

      & > .value {
        .tokenBox {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 24px;

          img {
            width: 50px;
            height: 50px;
          }
        }
        .tokenBoxre{
          .key {
            font-size: 16px;
          }

          .valueBox {
            display: flex;
            align-items: center;
            height: 56px;
            padding: 0 24px;
            margin: 10px 0 0 0;
            font-size: 20px;
            font-weight: 700;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            border: 1.4px solid rgba(0, 0, 0, 0);
            line-height: 56px;
            justify-content: space-between;
            cursor: pointer;
            .selectedToken{
              line-height: 56px;
              display: flex;
              justify-content: center;
              align-items: center;
              .token{
              width: 38px;
              height: 38px;
              margin-right: 10px;
              }
              .unit{
                text-align: center;
              }
            }
            .Arw{

            }
            

            &:focus-within {
              border-color: #f7ab1f;
            }

            input {
              flex: 1;
              height: 100%;
              font-weight: inherit;
            }
          }
        }

        .infoList {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px 18px;
          margin: 20px 0 0 0;
          background: rgba(0, 0, 0, 0.6);

          li {
            display: flex;
            justify-content: space-between;
            font-size: 16px;

            .key {
            }

            .value {
            }
          }
        }

        .amountBox {
          margin: 20px 0 0 0;

          .key {
            font-size: 16px;
          }

          .valueBox {
            display: flex;
            align-items: center;
            height: 56px;
            padding: 0 24px;
            margin: 10px 0 0 0;
            font-size: 20px;
            font-weight: 700;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            border: 1.4px solid rgba(0, 0, 0, 0);

            &:focus-within {
              border-color: #f7ab1f;
            }

            input {
              flex: 1;
              height: 100%;
              font-weight: inherit;
            }

            .unit {
            }
          }

          .optList {
            display: flex;
            gap: 12px;
            margin: 14px 0 0 0;
            overflow-x: scroll;

            button {
              height: 42px;
              width: 102px;
              padding: 0 22px;
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

          .depositBtn {
            width: 100%;
            height: 56px;
            margin: 44px 0 0 0;
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
