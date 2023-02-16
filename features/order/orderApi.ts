import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../fetchConfig/api/axios";
import { AddAlertMessage } from "../UI/UISlice";

const defaultMessage = "Something went wrong. Please try again.";

export const CreateOrder = createAsyncThunk(
  "order/CreateOrder",
  async (body: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/order/create", body);
      dispatch(
        AddAlertMessage({
          message:
            "Your order has been created. A message has been sent to you via the email you provided.",
          type: "success",
        })
      );
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data || defaultMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const GetOrders = createAsyncThunk(
  "order/GetOrders",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/order");
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const DeleteOrder = createAsyncThunk(
  "order/DeleteOrder",
  async (_id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete("/order?orderId=" + _id);
      dispatch(
        AddAlertMessage({
          message: "Order deleted successfully",
          type: "success",
        })
      );
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const ChangeOrderStatus = createAsyncThunk(
  "order/ChangeOrderStatus",
  async (params: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.patch("/order", params);
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);
