import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../fetchConfig/api/axios";
import { AddAlertMessage } from "../UI/UISlice";

const defaultMessage = "Something went wrong. Please try again.";

export const CreateCourse = createAsyncThunk(
  "course/CreateCourse",
  async (body: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/course", body);
      dispatch(
        AddAlertMessage({
          message: "Course created successfully",
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

export const EditCourse = createAsyncThunk(
  "course/EditCourse",
  async (body: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.patch("/course", body);
      dispatch(
        AddAlertMessage({
          message: "Course updated successfully",
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

export const GetCourses = createAsyncThunk(
  "course/GetCourses",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/course?id=" + id);
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

// This is to populate the edit course page when refreshed.
export const GetSingleCourseFromBackend = createAsyncThunk(
  "course/GetSingleCourseFromBackend",
  async (slug: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/course/" + slug);
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

export const DeleteCourseImage = createAsyncThunk(
  "course/DeleteCourseImage",
  async (data: any, { dispatch, rejectWithValue }) => {
    const { modelId, imageCloudId } = data;
    try {
      const response = await axios.delete(
        `/delete-image?model=course&modelId=${modelId}&imageCloudId=${imageCloudId}`
      );

      dispatch(
        AddAlertMessage({
          message: "Image deleted",
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

export const PublishAndUnpublishCourse = createAsyncThunk(
  "course/PublishAndUnpublishCourse",
  async (data: any, { dispatch, rejectWithValue }) => {
    const { slug, isPublished } = data;

    try {
      const response = await axios.put("/course/publish", {
        slug,
        isPublished,
      });

      dispatch(
        AddAlertMessage({
          message: response.data.isPublished
            ? "Course published successfully"
            : "Course will no longer appear to the public",
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

export const DeleteCourse = createAsyncThunk(
  "course/DeleteCourse",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete("/course", {
        data,
      });
      dispatch(
        AddAlertMessage({
          message: response.data || "Course deleted successfully",
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
