export const URL = "http://3.34.76.233:30559";

export const API = {
  SIGNUP: URL + "/users/signup",

  LOGIN: URL + "/users/login",
  LOGIN_GOOGLE: URL + "/users/login/google",
  LOGIN_CHECK: URL + "/users/auth",

  PHONE_COUNTRY_CODE: URL + "/phone/country/codes", //:offset/:limit

  USER_PROFILE: URL + "/users/profile",
  USER_CERTIFICATION_EMAIL: URL + "/users/certification/email",

  BET_ROUND: URL + "/bet/rounds",

  TRANS_BALANCE: URL + "/users/balance", //:username
};
