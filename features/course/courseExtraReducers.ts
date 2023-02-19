import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import { CourseType, InitialCourseStateType } from "./types";
import {
  CreateCourse,
  EditCourse,
  GetCourses,
  GetSingleCourseFromBackend,
  PublishAndUnpublishCourse,
  DeleteCourse,
  CreateAnnouncement,
  DeleteAnnouncement,
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
  builder.addCase(
    GetCourses.fulfilled,
    (state, action: PayloadAction<CourseType[]>) => {
      state.courseLoading = null;
      state.courseList = action.payload;
      state.announcements = action.payload
        .map((course) => course?.announcement)
        .filter((ann) => ann);
    }
  );
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
    state.courseLoading = "edit_course";
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
  builder.addCase(DeleteCourse.pending, (state) => {
    state.courseLoading = "delete_course";
  });
  builder.addCase(DeleteCourse.rejected, (state) => {
    state.courseLoading = null;
  });
  builder.addCase(DeleteCourse.fulfilled, (state, action) => {
    state.courseLoading = null;
    state.courseList = state.courseList.length
      ? state.courseList.filter((p) => action.meta.arg !== p._id)
      : [];
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
  // ============= CreateAnnouncement ======================
  builder.addCase(CreateAnnouncement.pending, (state) => {
    state.courseLoading = "create_announcement";
  });
  builder.addCase(CreateAnnouncement.rejected, (state) => {
    state.courseLoading = null;
  });
  builder.addCase(CreateAnnouncement.fulfilled, (state, action) => {
    state.courseLoading = null;
    if (state.currentCourse !== "loading") {
      state.currentCourse = {
        ...state.currentCourse,
        announcement: action.payload,
      };
    }
    state.courseList = state.courseList.length
      ? state.courseList.map((course) =>
          action.payload.courseId === course._id
            ? { ...course, announcement: action.payload }
            : course
        )
      : [];
  });
  // ============= DeleteAnnouncement ======================
  builder.addCase(DeleteAnnouncement.pending, (state) => {
    state.courseLoading = "delete_announcement";
  });
  builder.addCase(DeleteAnnouncement.rejected, (state) => {
    state.courseLoading = null;
  });
  builder.addCase(DeleteAnnouncement.fulfilled, (state, action) => {
    state.courseLoading = null;
    if (state.currentCourse !== "loading") {
      state.currentCourse = {
        ...state.currentCourse,
        announcement: null,
      };
    }

    state.courseList = state.courseList.length
      ? state.courseList.map((course) =>
          action.meta.arg === course._id
            ? { ...course, announcement: null }
            : course
        )
      : [];
  });
};

export default courseExtraReducers;
