import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { InitialOrderStateType } from "./types";

import {
  CreateOrder,
  GetOrders,
  DeleteOrder,
  ChangeOrderStatus,
  SearchOrders,
  GetTotalOrders,
} from "./orderApi";

const orderExtraReducers = (
  builder: ActionReducerMapBuilder<InitialOrderStateType>
) => {
  // =============CreateOrder ======================
  builder.addCase(CreateOrder.pending, (state) => {
    state.orderLoading = "create_order";
  });
  builder.addCase(CreateOrder.rejected, (state) => {
    state.orderLoading = null;
  });
  builder.addCase(CreateOrder.fulfilled, (state) => {
    state.orderLoading = null;
  });
  // =============GetOrders ======================
  builder.addCase(GetOrders.pending, (state) => {
    state.orderLoading = "default";
  });
  builder.addCase(GetOrders.rejected, (state) => {
    state.orderLoading = null;
  });
  builder.addCase(GetOrders.fulfilled, (state, action) => {
    state.orderLoading = null;
    state.hasNext = action.payload.hasNext;
    state.initialSearch = false;
    if (action.meta.arg.page > 1) {
      state.orderList = state.orderList.concat(action.payload.orders);
    } else {
      state.orderList = action.payload.orders;
    }
  });
  // =============GetTotalOrders ======================
  builder.addCase(GetTotalOrders.pending, (state) => {
    state.orderLoading = "default";
  });
  builder.addCase(GetTotalOrders.rejected, (state) => {
    state.orderLoading = null;
  });
  builder.addCase(GetTotalOrders.fulfilled, (state, action) => {
    state.orderLoading = null;
    state.total = action.payload;
  });
  // =============SearchOrders ======================
  builder.addCase(SearchOrders.pending, (state) => {
    state.orderLoading = "search";
  });
  builder.addCase(SearchOrders.rejected, (state) => {
    state.orderLoading = null;
  });
  builder.addCase(SearchOrders.fulfilled, (state, action) => {
    state.orderLoading = null;
    state.hasNext = action.payload.hasNext;
    if (action.meta.arg.page > 1) {
      state.orderList = state.orderList.concat(action.payload.orders);
    } else {
      state.orderList = action.payload.orders;
    }
  });
  // =============DeleteOrder ======================
  builder.addCase(DeleteOrder.pending, (state, action) => {
    state.orderLoading = action.meta.arg;
  });
  builder.addCase(DeleteOrder.rejected, (state) => {
    state.orderLoading = null;
  });
  builder.addCase(DeleteOrder.fulfilled, (state, action) => {
    state.orderLoading = null;
    state.orderList = state.orderList.length
      ? state.orderList.filter((order) => action.meta.arg !== order._id)
      : [];
  });
  // =============ChangeOrderStatus ======================
  builder.addCase(ChangeOrderStatus.pending, (state, action) => {
    state.orderLoading = action.meta.arg.orderId + "status";
  });
  builder.addCase(ChangeOrderStatus.rejected, (state) => {
    state.orderLoading = null;
  });
  builder.addCase(ChangeOrderStatus.fulfilled, (state, action) => {
    const { status, orderId } = action.payload;
    state.orderLoading = null;
    state.orderList = state.orderList.map((order) =>
      order._id === orderId ? { ...order, status } : order
    );
  });
};

export default orderExtraReducers;
