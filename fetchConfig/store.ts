import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import UIREducer from "../features/UI/UISlice";
import AuthReducer from "../features/auth/authSlice";
import CourseReducer from "../features/course/courseSlice";
import OrderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    UI: UIREducer,
    auth: AuthReducer,
    course: CourseReducer,
    order: OrderReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
