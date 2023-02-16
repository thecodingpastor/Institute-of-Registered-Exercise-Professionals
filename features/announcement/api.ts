import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddAlertMessage } from "../UI/UISlice";
import { AxiosInstance } from "axios";

interface AxiosType {
  AxiosPrivate: AxiosInstance;
  data?: any;
}

const defaultErrorMessage = "Something went wrong, please try again later.";

export const GetDraftProject = createAsyncThunk(
  "project/GetDraftProject",
  async (axios: AxiosInstance, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/projects/get-draft-project");
      if (response.data)
        dispatch(
          AddAlertMessage({
            message: "You have an unfinished draft project",
          })
        );
      return response.data;
    } catch (err) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const UploadImage = createAsyncThunk(
  "project/UploadImage",
  async (params: AxiosType, { dispatch, rejectWithValue }) => {
    const { AxiosPrivate, data } = params;

    try {
      const response = await AxiosPrivate.post("/projects/upload-image", {
        data,
      });
      dispatch(
        AddAlertMessage({
          message: "Image upload successfully.",
          type: "success",
        })
      );
      return response.data;
    } catch (err) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const DeleteImageFromCloud = createAsyncThunk(
  "project/DeleteImageFromCloud",
  async (params: AxiosType, { dispatch, rejectWithValue }) => {
    const { AxiosPrivate, data } = params;

    try {
      const response = await AxiosPrivate.delete("/projects/delete-image", {
        data,
      });
      dispatch(
        AddAlertMessage({
          message: response.data.message,
          type: "success",
        })
      );
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const GetAllProjects = createAsyncThunk(
  "project/GetAllProjectsAuth",
  async (params: AxiosType, { dispatch, rejectWithValue }) => {
    const { AxiosPrivate, data } = params;
    try {
      const response = data
        ? await AxiosPrivate.get("/projects?username=" + data.username)
        : await AxiosPrivate.get("/projects");

      return response.data.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message:
            err.response.data.message ||
            "Could not fetch projects at this time. Please try later",
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const UpdateProject = createAsyncThunk(
  "project/UpdateProject",
  async (params: AxiosType, { dispatch, rejectWithValue }) => {
    const { AxiosPrivate, data } = params;

    try {
      const response = await AxiosPrivate.patch("/projects/", {
        data,
      });
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message:
            err.response.data.message ||
            "Could not edit project at this time. Please try later",
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const CreateProject = createAsyncThunk(
  "project/CreateProject",
  async (params: AxiosType, { dispatch, rejectWithValue }) => {
    const { AxiosPrivate, data } = params;
    const { isDraft } = data;
    try {
      const response = await AxiosPrivate.post("/projects/", {
        data,
      });

      dispatch(
        AddAlertMessage({
          message: "Project created successfully",
          type: "success",
        })
      );

      return !isDraft
        ? response.data.data
        : { ...response.data.data, savedFromDraft: true };
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const DeleteProject = createAsyncThunk(
  "project/DeleteProject",
  async (params: AxiosType, { dispatch, rejectWithValue }) => {
    const { AxiosPrivate, data } = params;
    try {
      const response = await AxiosPrivate.delete("/projects/" + data);

      dispatch(
        AddAlertMessage({
          message: "Project deleted successfully",
          type: "success",
        })
      );

      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const PublishAndUnpublishProject = createAsyncThunk(
  "project/PublishAndUnpublishProject",
  async (params: AxiosType, { dispatch, rejectWithValue }) => {
    const {
      AxiosPrivate,
      data: { slug, isPublished },
    } = params;

    try {
      const response = await AxiosPrivate.put("/projects/publish", {
        slug,
        isPublished,
      });

      dispatch(
        AddAlertMessage({
          message: response.data.isPublished
            ? "Project published successfully"
            : "Project will no longer appear to the public",
          type: "success",
        })
      );

      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);
