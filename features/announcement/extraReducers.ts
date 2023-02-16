import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import {
  UploadImage,
  DeleteImageFromCloud,
  CreateProject,
  GetAllProjects,
  DeleteProject,
  UpdateProject,
  PublishAndUnpublishProject,
  GetDraftProject,
} from "./api";
import { InitialProjectStateType } from "./type";

const ProjectExtraReducers = (
  builder: ActionReducerMapBuilder<InitialProjectStateType>
) => {
  // =============UploadImage ======================
  builder.addCase(UploadImage.pending, (state) => {
    state.projectLoading = "upload";
  });
  builder.addCase(UploadImage.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(UploadImage.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.currentProject = action.payload;
    state.projects = state.projects
      ? state.projects.map((p) =>
          p._id === action.payload._id ? action.payload : p
        )
      : [];
  });
  // =============DeleteImageFromCloud ======================
  builder.addCase(DeleteImageFromCloud.pending, (state, action) => {
    state.projectLoading = action.meta.arg.data;
  });
  builder.addCase(DeleteImageFromCloud.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(DeleteImageFromCloud.fulfilled, (state) => {
    state.projectLoading = null;
  });
  // ============= GetAllProjects ======================
  builder.addCase(GetAllProjects.pending, (state) => {
    state.projectLoading = "default";
  });
  builder.addCase(GetAllProjects.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(GetAllProjects.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.projects = action.payload;
  });
  // ============= CreateProject ======================
  builder.addCase(CreateProject.pending, (state) => {
    state.projectLoading = "default";
  });
  builder.addCase(CreateProject.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(CreateProject.fulfilled, (state, action) => {
    state.projectLoading = null;
    if (action.payload.savedFromDraft) state.draftProject = null;
    state.projects.unshift(action.payload);
  });
  // ============= UpdateProject ======================
  builder.addCase(UpdateProject.pending, (state) => {
    state.projectLoading = "default";
  });
  builder.addCase(UpdateProject.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(UpdateProject.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.projects = state.projects
      ? state.projects.map((p) =>
          p._id === action.payload._id ? action.payload : p
        )
      : [];
  });
  // ============= DeleteProject ======================
  builder.addCase(DeleteProject.pending, (state, action) => {
    state.projectLoading = action.meta.arg.data;
  });
  builder.addCase(DeleteProject.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(DeleteProject.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.projects.filter((p) => action.payload !== p.slug);
  });
  // ============= PublishAndUnpublishProject ======================
  builder.addCase(PublishAndUnpublishProject.pending, (state) => {
    state.projectLoading = "default";
  });
  builder.addCase(PublishAndUnpublishProject.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(
    PublishAndUnpublishProject.fulfilled,
    (state, action: PayloadAction<{ _id: string; isPublished: boolean }>) => {
      state.projectLoading = null;
      state.currentProject = {
        ...state.currentProject,
        isPublished: action.payload.isPublished,
      };
    }
  );
  // ============= GetDraftProject ======================
  builder.addCase(GetDraftProject.pending, (state) => {
    state.projectLoading = "default";
  });
  builder.addCase(GetDraftProject.rejected, (state) => {
    state.projectLoading = null;
  });
  builder.addCase(GetDraftProject.fulfilled, (state, action) => {
    state.projectLoading = null;
    state.draftProject = action.payload;
    state.lookForDraftProject = false;
  });
};

export default ProjectExtraReducers;
