import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialProjectStateType, ProjectType } from "./type";
import ProjectExtraReducers from "./extraReducers";
import { RootState } from "../../fetchConfig/store";

const initialState: InitialProjectStateType = {
  projects: [],
  projectLoading: null,
  currentProject: null,
  currentlyUploadedImages: [],
  draftProject: undefined,
  lookForDraftProject: true,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    ClearAllProjects: (state) => {
      state.projects = [];
    },
    // Not in use yet
    ResetProjectState: (state) => {
      state.projects = [];
      state.projectLoading = null;
      state.currentlyUploadedImages = [];
    },
    GetCurrentProject: (state, action: PayloadAction<string>) => {
      state.currentProject =
        state.projects.find((p) => p.slug === action.payload) || null;
    },
    SetCurrentProject: (state, action: PayloadAction<ProjectType | null>) => {
      state.currentProject = action.payload;
    },
  },
  extraReducers: ProjectExtraReducers,
});

export const { ClearAllProjects, GetCurrentProject, SetCurrentProject } =
  projectSlice.actions;

export const SelectProject = (state: RootState) => state.announcement;
export default projectSlice.reducer;
