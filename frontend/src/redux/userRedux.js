import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isLoggedIn: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isLoggedIn = false;
    },
    signupStart: (state) => {
      state.isFetching = true;
    },
    signupSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isLoggedIn = false; 
    },
    signupFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isLoggedIn = false; 
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false; 
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
