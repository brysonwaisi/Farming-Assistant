import {
  loginFailure,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
  signupFailure,
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

export const subscriptions = (email) => async (dispatch) => {
  dispatch(subscriptionStart());
  try{
    const res = await pubRequest.post("/subscribe", email);
    dispatch(subscriptionSuccess(res.data));
  } catch(err) {
    dispatch(subscriptionFailure())
  }
}