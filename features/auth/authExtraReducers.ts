import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { InitialAuthStateType } from "./types";

import {
  GetUsers,
  Login,
  LogOut,
  Register,
  DeleteUser,
  ChangeUserRole,
  ForgotPassword,
  ResetPassword,
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
  builder.addCase(LogOut.fulfilled, (state) => {
    state.userLoading = null;
    state.user = null;
    state.accessToken = null;
    window.location.href = "/";
    window.location.reload();
  });
  // =============Register ======================
  builder.addCase(Register.pending, (state) => {
    state.userLoading = "default";
  });
  builder.addCase(Register.rejected, (state) => {
    state.userLoading = null;
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
  });
  builder.addCase(GetUsers.fulfilled, (state, action) => {
    state.userLoading = null;
    state.usersList = action.payload;
  });
  // =============ForgotPassword ======================
  builder.addCase(ForgotPassword.pending, (state) => {
    state.userLoading = "forgot";
  });
  builder.addCase(ForgotPassword.rejected, (state) => {
    state.userLoading = null;
  });
  builder.addCase(ForgotPassword.fulfilled, (state) => {
    state.userLoading = null;
  });
  // =============ResetPassword ======================
  builder.addCase(ResetPassword.pending, (state) => {
    state.userLoading = "reset";
  });
  builder.addCase(ResetPassword.rejected, (state) => {
    state.userLoading = null;
  });
  builder.addCase(ResetPassword.fulfilled, (state) => {
    state.userLoading = null;
  });
  // =============DeleteUser ======================
  builder.addCase(DeleteUser.pending, (state, action) => {
    state.userLoading = action.meta.arg;
  });
  builder.addCase(DeleteUser.rejected, (state) => {
    state.userLoading = null;
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
  });
  builder.addCase(ChangeUserRole.fulfilled, (state, action) => {
    state.usersList = state.usersList.map((user) =>
      action.payload._id === user._id ? action.payload : user
    );
    state.userLoading = null;
  });
};

export default authExtraReducers;
