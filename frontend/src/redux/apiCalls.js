import {
  loginFailure,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
  signupFailure,
  forgotpasswordStart,
  forgotpasswordSuccess,
  forgotpasswordFailure,
  resetpasswordStart,
  resetpasswordSuccess,
  resetpasswordFailure,
} from "./userRedux";
import {
  subscriptionStart, subscriptionSuccess, subscriptionFailure
} from "./subscriptionRedux";

import { pubRequest } from "../reqMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await pubRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const signup = (user) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const res = await pubRequest.post("/auth/register", user);
    dispatch(signupSuccess(res.data));
  } catch (err) {
    dispatch(signupFailure());
  }
};
export const forgotpassword = (user) => async (dispatch) => {
  dispatch(forgotpasswordStart());
  try {
    const res = await pubRequest.post("/auth/forgot-password", user);
    dispatch(forgotpasswordSuccess(res.data));
  } catch (err) {
    dispatch(forgotpasswordFailure());
  }
};

export const resetpassword = (user) => async (dispatch) => {
  dispatch(resetpasswordStart());
  try {
    const res = await pubRequest.post(`/auth/reset-password`, {
      token: user.token,
      password: user.password,
    });
    dispatch(resetpasswordSuccess(res.data));
  } catch (err) {
    dispatch(resetpasswordFailure());
  }
};
export const subscriptions = (email) => async (dispatch) => {
  dispatch(subscriptionStart());
  try{
    const res = await pubRequest.post("/subscribe", email);
    dispatch(subscriptionSuccess(res.data));
  } catch(err) {
    dispatch(subscriptionFailure())
  }
}