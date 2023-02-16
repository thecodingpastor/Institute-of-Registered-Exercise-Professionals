import { createSlice } from "@reduxjs/toolkit";

import authExtraReducers from "./authExtraReducers";
import { InitialAuthStateType } from "./types";
import { RootState } from "../../fetchConfig/store";

const initialState: InitialAuthStateType = {
  user: null,
  accessToken: null,
  userLoading: null,
  usersList: [],
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetCredentials: (state, action) => {
      // SetCredentials: (state, action: PayloadAction<InitialAuthStateType>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
  },
  extraReducers: authExtraReducers,
});

export const { SetCredentials } = AuthSlice.actions;

export const SelectAuth = (state: RootState) => state.auth;

export default AuthSlice.reducer;
