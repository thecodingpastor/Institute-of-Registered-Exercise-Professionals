import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import { InitialCourseStateType } from "./types";
import {
  DeleteCourseImage,
  CreateCourse,
  EditCourse,
  GetCourses,
  GetSingleCourseFromBackend,
  PublishAndUnpublishCourse,
  DeleteCourse,
} from "./courseApi";

const courseExtraReducers = (
  builder: ActionReducerMapBuilder<InitialCourseStateType>
) => {
  // =============GetCourses ======================
  builder.addCase(GetCourses.pending, (state) => {
    state.courseLoading = "default";
  });
  builder.addCase(GetCourses.rejected, (state) => {
    state.courseLoading = null;
  });
  builder.addCase(GetCourses.fulfilled, (state, action) => {
    state.courseLoading = null;
    state.courseList = action.payload;
  });
  // =============CreateCourse ======================
  builder.addCase(CreateCourse.pending, (state) => {
    state.courseLoading = "create_course";
  });
  builder.addCase(CreateCourse.rejected, (state) => {
    state.courseLoading = null;
  });
  builder.addCase(CreateCourse.fulfilled, (state, action) => {
    state.courseLoading = null;
    state.draftCourse = undefined;
    state.courseList.unshift(action.payload);
  });
  // =============EditCourse ======================
  builder.addCase(EditCourse.pending, (state) => {
    state.courseLoading = "default";
  });
  builder.addCase(EditCourse.rejected, (state) => {
    state.courseLoading = null;
  });
  builder.addCase(EditCourse.fulfilled, (state, action) => {
    state.courseLoading = null;
    state.courseList = state.courseList
      ? state.courseList.map((p) =>
          p._id === action.payload._id ? action.payload : p
        )
      : [];
  });
  // =============DeleteCourse ======================
  builder.addCase(DeleteCourse.pending, (state, action) => {
    state.courseLoading = action.meta.arg.itemID;
  });
  builder.addCase(DeleteCourse.rejected, (state) => {
    state.courseLoading = null;
  });
  builder.addCase(DeleteCourse.fulfilled, (state, action) => {
    state.courseLoading = null;
    if (action.payload === "Draft deleted successfully") {
      state.draftCourse = null;
    } else if (action.payload === "Course deleted successfully") {
      state.courseList = state.courseList.length
        ? state.courseList.filter((p) => action.meta.arg.itemID !== p._id)
        : [];
    }
  });
  // =============DeleteCourseImage ======================
  builder.addCase(DeleteCourseImage.pending, (state) => {
    state.courseLoading = "delete-course-image";
  });
  builder.addCase(DeleteCourseImage.rejected, (state) => {
    state.courseLoading = null;
  });
  builder.addCase(DeleteCourseImage.fulfilled, (state, action) => {
    state.courseLoading = null;
    state.draftCourse = action.payload;
  });

  // ============= GetSingleCourseFromBackend ======================
  builder.addCase(GetSingleCourseFromBackend.pending, (state) => {
    state.courseLoading = "default";
  });
  builder.addCase(GetSingleCourseFromBackend.rejected, (state) => {
    state.courseLoading = null;
  });
  builder.addCase(GetSingleCourseFromBackend.fulfilled, (state, action) => {
    state.courseLoading = null;
    state.currentCourse = action.payload;
  });
  // ============= PublishAndUnpublishCourse ======================
  builder.addCase(PublishAndUnpublishCourse.pending, (state) => {
    state.courseLoading = "default";
  });
  builder.addCase(PublishAndUnpublishCourse.rejected, (state) => {
    state.courseLoading = null;
  });
  builder.addCase(
    PublishAndUnpublishCourse.fulfilled,
    (state, action: PayloadAction<{ _id: string; isPublished: boolean }>) => {
      state.courseLoading = null;
      if (state.currentCourse !== "loading") {
        state.currentCourse = {
          ...state.currentCourse,
          isPublished: action.payload.isPublished,
        };
      }
    }
  );
};

export default courseExtraReducers;
