// export const URL = "http://3.34.76.233:30559";
export const URL = "http://litriggy.com:30708";

export const API = {
  SIGNUP: URL + "/users/signup", //type

  LOGIN: URL + "/users/login",
  LOGIN_CHECK: URL + "/users/auth",

  GET_ASSETS: URL + "/assets/list",

  PHONE_COUNTRY_CODE: URL + "/phone/country/codes", //:offset/:limit

  USER_PROFILE: URL + "/users/profile",
  USER_CERTIFICATION_EMAIL: URL + "/users/certification/email",

  BET: URL + "/bet",
  BET_ROUND: URL + "/bet/rounds",
  BET_LOG: URL + "/bet/log", // userid

  USER_BALANCE: URL + "/users/balance", //:type

  SET_BOOKMARK: URL + "/users/bookmark",
  BOOKMARK_LIST: URL + "/users/bookmark/list",
};
