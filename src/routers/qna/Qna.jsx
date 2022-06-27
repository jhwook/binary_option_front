import styled from "styled-components";
import { useSelector } from "react-redux";
import I_dnArw from "../../img/icon/I_dnArw.svg";
import I_sendWhite from "../../img/icon/I_sendWhite.svg";
import { useState } from "react";
import PopupBg from "../../components/common/PopupBg";
import ReqeustPopup from "../../components/qna/RequestPopup";
import DefaultHeader from "../../components/header/DefaultHeader";

export default function Qna() {
  const isMobile = useSelector((state) => state.common.isMobile);

  const [requestPopup, setRequestPopup] = useState(false);

  if (isMobile)
    return (
      <>
        <DefaultHeader title="Help" />

        <MqnaBox>
          <header>
            <section className="innerBox">
              <strong className="title">Frequently Asked Questions</strong>
            </section>
          </header>

          <section className="contSec">
            <article className="innerBox">
              <div className="listBox">
                <ul className="platformList">
                  <strong className="title">Trading Platform</strong>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>What are digital options?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>What is the expiration period of a tra de?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>
                </ul>

                <ul className="paymentList">
                  <strong className="title">Payment</strong>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>
                          Is there a minimum amount that I can deposit to my
                          account at registration?
                        </p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>How can I deposit?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>
                          Do I need to deposit the account of the trading
                          platform and how often do I need to do this?
                        </p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>What is the minimum deposit amount?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>
                </ul>

                <ul className="payoutList">
                  <strong className="title">Payouts</strong>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>How to withdraw money from the account?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>What is the minimum withdrawal amount?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>
                          Do I need to provide any documents to make a
                          withdrawal?
                        </p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>How long does it take to withdraw funds?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>
                          Is there any fee for depositing or withdrawing funds
                          from the account?
                        </p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>
                </ul>
              </div>

              <button className="sendBtn" onClick={() => setRequestPopup(true)}>
                <img src={I_sendWhite} alt="" />

                <strong>Send us a message</strong>
              </button>
            </article>
          </section>
        </MqnaBox>

        {requestPopup && (
          <>
            <ReqeustPopup off={setRequestPopup} />
            <PopupBg bg off={setRequestPopup} />
          </>
        )}
      </>
    );
  else
    return (
      <>
        <DefaultHeader />
        
        <PqnaBox>
          <header>
            <section className="innerBox">
              <strong className="title">Frequently Asked Questions</strong>
            </section>
          </header>

          <section className="contSec">
            <article className="innerBox">
              <div className="listBox">
                <ul className="platformList">
                  <strong className="title">Trading Platform</strong>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>What are digital options?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>What is the expiration period of a tra de?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>
                </ul>

                <ul className="paymentList">
                  <strong className="title">Payment</strong>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>
                          Is there a minimum amount that I can deposit to my
                          account at registration?
                        </p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>How can I deposit?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>
                          Do I need to deposit the account of the trading
                          platform and how often do I need to do this?
                        </p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>What is the minimum deposit amount?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>
                </ul>

                <ul className="payoutList">
                  <strong className="title">Payouts</strong>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>How to withdraw money from the account?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>What is the minimum withdrawal amount?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>
                          Do I need to provide any documents to make a
                          withdrawal?
                        </p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>How long does it take to withdraw funds?</p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>

                  <li>
                    <details>
                      <summary>
                        <img src={I_dnArw} alt="" />

                        <p>
                          Is there any fee for depositing or withdrawing funds
                          from the account?
                        </p>
                      </summary>

                      <div className="answerBox">
                        <p>{lorem}</p>
                      </div>
                    </details>
                  </li>
                </ul>
              </div>

              <div className="sendBox">
                <p className="key">Didn't find an answer to your question?</p>

                <button
                  className="sendBtn"
                  onClick={() => setRequestPopup(true)}
                >
                  <img src={I_sendWhite} alt="" />

                  <strong>Send us a message</strong>
                </button>
              </div>
            </article>
          </section>
        </PqnaBox>

        {requestPopup && (
          <>
            <ReqeustPopup off={setRequestPopup} />
            <PopupBg bg blur off={setRequestPopup} />
          </>
        )}
      </>
    );
}

const MqnaBox = styled.main`
  padding: 15.55vw 0 0 0;
  color: #fff;
  background: #0a0e17;

  header {
    display: flex;
    justify-content: center;
    height: 35vw;

    .innerBox {
      padding: 5.55vw 5.55vw 8.33vw;

      .title {
        font-size: 8.33vw;
        opacity: 0.6;
      }
    }
  }

  .contSec {
    display: flex;
    justify-content: center;
    font-size: 4.44vw;
    color: #000;
    background: #fff;
    padding: 5.55vw 5.55vw 50vw;

    .innerBox {
      .listBox {
        display: flex;
        flex-direction: column;
        gap: 5.55vw;

        ul {
          display: flex;
          flex-direction: column;
          gap: 3.33vw;

          .title {
          }

          li {
            details {
              color: #868686;

              &[open] {
                summary {
                  img {
                    transform: rotate(180deg);
                    opacity: 1;
                  }
                }
              }

              summary {
                display: flex;
                align-items: center;
                gap: 2.77vw;

                img {
                  width: 2.77vw;
                  opacity: 0.33;
                }
              }

              .answerBox {
                padding: 3.88vw 4.44vw;
                margin: 3.88vw 0 0;
                background: #f3f5f7;
                border-radius: 8px;
              }
            }
          }
        }
      }

      .sendBtn {
        display: flex;
        align-items: center;
        gap: 2.77vw;
        height: 11.11vw;
        padding: 0 8.33vw;
        font-size: 3.88vw;
        color: #fff;
        background: #81828a;
        border-radius: 5.55vw;
        bottom: 8.33vw;
        left: 50%;
        position: fixed;
        z-index: 2;
        transform: translate(-50%, 0);

        strong {
          white-space: nowrap;
        }

        &:hover {
          background: #403f4c;
        }
      }
    }
  }
`;

const PqnaBox = styled.main`
  padding: 60px 0 0 0;
  color: #fff;
  background: #0a0e17;

  header {
    display: flex;
    justify-content: center;
    height: 196px;
    padding: 0 0 60px;

    .innerBox {
      display: flex;
      align-items: flex-end;
      width: 932px;
      height: 100%;

      .title {
        font-size: 36px;
        opacity: 0.6;
      }
    }
  }

  .contSec {
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: #000;
    background: #fff;
    padding: 60px 0 220px;

    .innerBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 90px;
      width: 932px;

      .listBox {
        display: flex;
        flex-direction: column;
        gap: 60px;
        width: 100%;

        ul {
          display: flex;
          flex-direction: column;
          gap: 20px;

          .title {
          }

          li {
            details {
              color: #868686;

              &[open] {
                summary {
                  img {
                    transform: rotate(180deg);
                    opacity: 1;
                  }
                }
              }

              summary {
                display: flex;
                align-items: center;
                gap: 10px;

                img {
                  width: 10px;
                  opacity: 0.33;
                }
              }

              .answerBox {
                width: 912px;
                padding: 14px 20px;
                margin: 14px 0 0 auto;
                font-size: 14px;
                background: #f3f5f7;
                border-radius: 8px;
              }
            }
          }
        }
      }

      .sendBox {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        width: 440px;
        padding: 24px 0;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2),
          0px 4px 20px rgba(0, 0, 0, 0.14);

        .key {
          font-size: 16px;
          color: #868686;
        }

        .sendBtn {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 40px;
          padding: 0 30px;
          font-size: 14px;
          color: #fff;
          background: #403f4c;
          border-radius: 20px;
        }
      }
    }
  }
`;

const lorem =
  "Option is a derivative financial instrument based on any underlying asset, such as a stock, a currency pair, oil, etc. DIGITAL OPTION - a non-standard option that is used to make a profit on price movements of such assets for a certain period of time. A digital option, depending on the terms agreed upon by the parties to the transaction, at a time determined by the parties, brings a fixed income (the difference between the trade income and the price of the asset) or loss (in the amount of the value of the asset). Since the digital option is purchased in advance at a fixed price, the size of the profit, as well as the size of the potential loss, are known even before the trade. Another feature of these deals is the time limit. Any option has its own term (expiration time or conclusion time). Regardless of the degree of change in the price of the underlying asset (how much it has become higher or lower), in case of winning an option, a fixed payment is always made. Therefore, your risks are limited only by the amount for which the option is acquired.";
