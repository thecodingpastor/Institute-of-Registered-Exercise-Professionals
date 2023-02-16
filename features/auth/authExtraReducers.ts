import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { InitialAuthStateType } from "./types";

import {
  GetUsers,
  Login,
  LogOut,
  Register,
  DeleteUser,
  ChangeUserRole,
} from "./authApi";

const authExtraReducers = (
  builder: ActionReducerMapBuilder<InitialAuthStateType>
) => {
  // =============LOGIN ======================
  builder.addCase(Login.pending, (state) => {
    state.userLoading = "default";
  });
  builder.addCase(Login.rejected, (state) => {
    state.userLoading = null;
    state.user = null;
    state.accessToken = null;
    // Handling error pending
  });
  builder.addCase(Login.fulfilled, (state, action) => {
    state.userLoading = null;
    state.user = action.payload.user;
    state.accessToken = action.payload.accessToken;
  });
  // ==================LOGOUT ========================
  builder.addCase(LogOut.pending, (state) => {
    state.userLoading = "default";
  });
  builder.addCase(LogOut.rejected, (state) => {
    // Handling error pending
    state.userLoading = null;
  });
  builder.addCase(LogOut.fulfilled, (state, action) => {
    state.userLoading = null;
    state.user = null;
    state.accessToken = null;
  });
  // =============Register ======================
  builder.addCase(Register.pending, (state) => {
    state.userLoading = "default";
  });
  builder.addCase(Register.rejected, (state) => {
    state.userLoading = null;
    // Handling error pending
  });
  builder.addCase(Register.fulfilled, (state, action) => {
    state.userLoading = null;
    state.usersList.unshift(action.payload);
  });
  // =============GetUsers ======================
  builder.addCase(GetUsers.pending, (state) => {
    state.userLoading = "default";
  });
  builder.addCase(GetUsers.rejected, (state) => {
    state.userLoading = null;
    // Handling error pending
  });
  builder.addCase(GetUsers.fulfilled, (state, action) => {
    state.userLoading = null;
    state.usersList = action.payload;
  });
  // =============DeleteUser ======================
  builder.addCase(DeleteUser.pending, (state, action) => {
    console.log(action.meta.arg);

    state.userLoading = action.meta.arg;
  });
  builder.addCase(DeleteUser.rejected, (state) => {
    state.userLoading = null;
    // Handling error pending
  });
  builder.addCase(DeleteUser.fulfilled, (state, action) => {
    state.usersList = state.usersList.filter(
      (user) => action.payload !== user._id
    );
    state.userLoading = null;
  });
  // =============ChangeUserRole ======================
  builder.addCase(ChangeUserRole.pending, (state, action) => {
    // @ts-ignore
    state.userLoading = action.meta.arg?.userId;
  });
  builder.addCase(ChangeUserRole.rejected, (state) => {
    state.userLoading = null;
    // Handling error pending
  });
  builder.addCase(ChangeUserRole.fulfilled, (state, action) => {
    state.usersList = state.usersList.map((user) =>
      action.payload._id === user._id ? action.payload : user
    );
    state.userLoading = null;
  });
};

export default authExtraReducers;
