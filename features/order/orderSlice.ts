import { createSlice } from "@reduxjs/toolkit";

import orderExtraReducers from "./orderExtraReducers";
import { RootState } from "../../fetchConfig/store";
import { InitialOrderStateType } from "./types";

const prevOrder =
  (typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("irep_order"))) ||
  null;

const initialState: InitialOrderStateType = {
  orderList: [],
  orderLoading: "loading",
  initialSearch: true,
  total: null,
  hasNext: false,
  currentOrder: {
    address: prevOrder?.address || "",
    country: prevOrder?.country || "",
    fullName: prevOrder?.fullName || "",
    email: prevOrder?.email || "",
    phone: prevOrder?.phone || "",
    state: prevOrder?.state || "",
    imageBase64: prevOrder?.imageBase64 || "",
  },
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    SetCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: orderExtraReducers,
});

export const { SetCurrentOrder } = OrderSlice.actions;

export const SelectOrder = (state: RootState) => state.order;

export default OrderSlice.reducer;
