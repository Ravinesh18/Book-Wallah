const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000/api/v1" 

export const endpoints = {
    SENDOTP_API: BASE_URL + "/sendOtp",
    SIGNUP_API: BASE_URL + "/register",
    LOGIN_API: BASE_URL + "/login",
    POST_BOOK: BASE_URL + "/create-book"
  }