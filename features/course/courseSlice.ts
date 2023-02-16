import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import courseExtraReducers from "./courseExtraReducers";
import { RootState } from "../../fetchConfig/store";
import { CourseType, InitialCourseStateType } from "./types";

const prevCourse =
  (typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("irep_course_draft"))) ||
  null;

const initialState: InitialCourseStateType = {
  courseLoading: "default",
  courseList: [],
  draftCourse: {
    title: prevCourse?.title || "",
    onlinePrice: prevCourse?.onlinePrice || "",
    offlinePrice: prevCourse?.offlinePrice || "",
    duration: prevCourse?.duration || "",
    promoPercentage: prevCourse?.promoPercentage || "",
    mainContent: prevCourse?.mainContent || "",
    imageBase64: prevCourse?.imageBase64 || "",
  },
  currentCourse: "loading",
};

const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    SetCurrentCourse: (state, action: PayloadAction<CourseType>) => {
      state.currentCourse = action.payload;
      state.courseLoading = null;
    },
    SetDraftCourse: (state, action: PayloadAction<CourseType>) => {
      state.draftCourse = action.payload;
    },
  },
  extraReducers: courseExtraReducers,
});

export const { SetCurrentCourse, SetDraftCourse } = CourseSlice.actions;

export const SelectCourse = (state: RootState) => state.course;

export default CourseSlice.reducer;
