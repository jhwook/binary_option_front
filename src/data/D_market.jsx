import I_depositWhite from "../img/icon/I_depositWhite.svg";
import I_withDrawalWhite from "../img/icon/I_withDrawalWhite.svg";
import I_historyWhite from "../img/icon/I_historyWhite.svg";
import T_usdt from "../img/token/T_usdt.png";
import T_usdc from "../img/token/T_usdc.png";
import T_cny from "../img/token/T_cny.svg";
import T_usd from "../img/token/T_usd.svg";
import T_krw from "../img/token/T_krw.svg";

export const D_marketLeftBarList = [
  { icon: I_depositWhite, key: "Deposit", url: "deposit" },
  { icon: I_withDrawalWhite, key: "Withdrawal", url: "withdrawal" },
  { icon: I_historyWhite, key: "History", url: "history" },
];

export const D_historyCategoryList = ["DEPOSIT", "WITHDRAWAL"];

export const D_historyListHeader = [
  "No",
  "Date",
  "Amount",
  "Method",
  "Type",
  "Status",
];

export const D_historyList = [
  {
    id: "ioimmoj@gmail.com",
    date: new Date(),
    amount: 10000,
    method: "Tether (ERC20/TRC20)",
    type: "Deposit",
    status: "Expired",
  },
  {
    id: "ioimmoj@gmail.com",
    date: new Date(),
    amount: 10000,
    method: "Tether (ERC20/TRC20)",
    type: "Deposit",
    status: "Expired",
  },
  {
    id: "ioimmoj@gmail.com",
    date: new Date(),
    amount: 10000,
    method: "Tether (ERC20/TRC20)",
    type: "Deposit",
    status: "Expired",
  },
  {
    id: "ioimmoj@gmail.com",
    date: new Date(),
    amount: 10000,
    method: "Tether (ERC20/TRC20)",
    type: "Deposit",
    status: "Expired",
  },
  {
    id: "ioimmoj@gmail.com",
    date: new Date(),
    amount: 10000,
    method: "Tether (ERC20/TRC20)",
    type: "Deposit",
    status: "Expired",
  },
  {
    id: "ioimmoj@gmail.com",
    date: new Date(),
    amount: 10000,
    method: "Tether (ERC20/TRC20)",
    type: "Deposit",
    status: "Expired",
  },
  {
    id: "ioimmoj@gmail.com",
    date: new Date(),
    amount: 10000,
    method: "Tether (ERC20/TRC20)",
    type: "Deposit",
    status: "Expired",
  },
  {
    id: "ioimmoj@gmail.com",
    date: new Date(),
    amount: 10000,
    method: "Tether (ERC20/TRC20)",
    type: "Deposit",
    status: "Expired",
  },
  {
    id: "ioimmoj@gmail.com",
    date: new Date(),
    amount: 10000,
    method: "Tether (ERC20/TRC20)",
    type: "Deposit",
    status: "Expired",
  },
  {
    id: "ioimmoj@gmail.com",
    date: new Date(),
    amount: 10000,
    method: "Tether (ERC20/TRC20)",
    type: "Deposit",
    status: "Expired",
  },
];

export const D_unBranchTokenList = [
  { icon: T_usdt, type: "USDT_BINOPT", text: "USDT" },
  { icon: T_usdc, type: "USDC", text: "USDC" },
];

export const D_branchTokenList = [
  { icon: T_cny, type: "CNY", text: "CNY" },
  { icon: T_usd, type: "USD", text: "USD" },
  { icon: T_krw, type: "KRW", text: "KRW" },
];
