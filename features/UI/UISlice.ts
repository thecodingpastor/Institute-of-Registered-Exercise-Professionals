import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../fetchConfig/store";
import { AlertMessageType, UIStateType } from "./types";

const initialState: UIStateType = {
  alertMessages: [],
  confirmModalIsOpen: null,
  checkAuthOnFocus: false,
};

export const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    AddAlertMessage: (state, action: PayloadAction<AlertMessageType>) => {
      const { message, type } = action.payload;
      // This prevents duplicate error messages
      if (state.alertMessages.find((alert) => alert.message === message)) {
        return;
      }
      const newAlert = {
        id: Date.now(),
        message: message || "Something went wrong",
        type: type || "fail",
      };

      state.alertMessages.push(newAlert);
    },
    RemoveAlertMessage: (state, action) => {
      state.alertMessages = state.alertMessages.filter(
        (alert) => alert.id !== action.payload
      );
    },
    ClearAlertMessages: (state) => {
      state.alertMessages = [];
    },
    SetConfirmModal: (state, action: PayloadAction<string | null>) => {
      state.confirmModalIsOpen = action.payload;
    },
    // This is for administrators when they click away and click back on the app.
    SetCheckAuthOnFocus: (state, action) => {
      state.checkAuthOnFocus = action.payload;
    },
  },
});

export const {
  AddAlertMessage,
  RemoveAlertMessage,
  ClearAlertMessages,
  SetConfirmModal,
  SetCheckAuthOnFocus,
} = UISlice.actions;

export const SelectUI = (state: RootState) => state.UI;

export default UISlice.reducer;
