//export const URL = "http://options1.net:30708";
// export const URL = "http://litriggy.com:30708";
export const URL = "https://options1.net:30718";
export const API = {
  SIGNUP: URL + "/users/signup", //type
  LOGIN: URL + "/users/login",
  AUTH: URL + "/users/auth",
  REFRESH: URL + "/users/refresh",
  EDIT_REF: URL + "/users/edit/ref",
  USER_PROFILE: URL + "/users/profile",
  USER_CERTIFICATION_EMAIL: URL + "/users/certification/email",
  USER_QUERY: URL + "/users/query", //tablename/offset/limit
  USER_BALANCE: URL + "/users/balance", //:type
  USER_BRANCH: URL + "/users/branch", //:offset/:limit/:orderkey/:orderval
  USER_BRANCH_FEE_LOG: URL + "/users/branch/fee/log", //:offset/:limit/:orderkey/:orderval
  USER_PREDEPOSIT: URL + "/users/predeposit",
  USER_BETLOGS: URL + "/users/betlogs", //:type/:offset/:limit
  USER_DEMO_TOKEN: URL + "/users/demo/token",
  USER_REFERRAL: URL + "/users/myreferrals", //:offset/:limit/id/DESC
  USER_REFERRAL_HISTORY: URL + "/users/myreferrals/fee/log", //:offset/:limit/id/DESC

  GET_ASSETS: URL + "/assets/list",

  PHONE_COUNTRY_CODE: URL + "/queries/v1/rows/country_code", //:offset/:limit

  BETS: URL + "/bets/join", // /:type/:assetId/:amount/:dur/:side
  MY_BETS: URL + "/bets/my", // type

  TRANSACTION_BRANCH_LIST: URL + "/transactions/branch/list",
  TRANSACTION_BRANCH_TRANSFER: URL + "/transactions/branch/transfer",
  TRANS_DEPOSIT: URL + "/transactions/live/DEPOSIT", //:amount
  LISTEN_TRANSACTION: URL + "/transactions/listen",

  TRANS_DEMO_FUND: URL + "/transactions/demo/fund", //:amount

  TRANS_WITHDRAW: URL + "/transactions/live/withdraw", //:amount
  WITHDRAW: URL + "/transactions/withdraw",

  BOOKMARKS: URL + "/bookmarks", //:type/:targetId
  BOOKMARKS_MY: URL + "/bookmarks/my",

  QUERIES_FOREX: URL + "/queries/forex", //:type

  ADMIN_LEVEL_FEE: URL + "/admins/level/fee",
  ADMIN_FEE_SETTING: URL + "/admins/fee/setting", //:level
};
