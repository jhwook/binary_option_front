// export const URL = "http://3.34.76.233:30559";
export const URL = "http://litriggy.com:30708";

export const API = {
  SIGNUP: URL + "/users/signup", //type

  LOGIN: URL + "/users/login",
  AUTH: URL + "/users/auth",

  GET_ASSETS: URL + "/assets/list",

  PHONE_COUNTRY_CODE: URL + "/phone/country/codes", //:offset/:limit

  USER_PROFILE: URL + "/users/profile",
  USER_CERTIFICATION_EMAIL: URL + "/users/certification/email",
  USER_QUERY:URL + "/users/query", //tablename/offset/limit

  BET: URL + "/bet",
  BET_ROUND: URL + "/bet/rounds",
  BET_LOG: URL + "/bet/log", // userid

  USER_BALANCE: URL + "/users/balance", //:type
  WITHDRAW: URL + "/transactions/withdraw",

  BOOKMARK: URL + "/bookmarks", //:type/:targetId
  BOOKMARK_LIST: URL + "/users/bookmark/list",

  TRANS_DEMO_FUND: URL + "/transactions/demo/fund", //:amount

  TRANS_WITHDRAW: URL + "/transactions/live/WITHDRAW", //:amount
};
