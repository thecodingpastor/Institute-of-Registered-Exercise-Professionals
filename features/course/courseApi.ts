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
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/course?id=${data?.id}&pageNumber=${data?.pageNumber}`
      );
      console.log(response.data);

      return response.data;
    } catch (err: any) {
      console.log(err);
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
  async (courseId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete("/course?courseId=" + courseId);
      dispatch(
        AddAlertMessage({
          message: "Course deleted successfully",
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

export const CreateAnnouncement = createAsyncThunk(
  "course/CreateAnnouncement",
  async (body: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/course/announcement", body);
      dispatch(
        AddAlertMessage({
          message: "Announcement created successfully",
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

export const DeleteAnnouncement = createAsyncThunk(
  "course/DeleteAnnouncement",
  async (courseId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        "/course/announcement?courseId=" + courseId
      );
      dispatch(
        AddAlertMessage({
          message: "Announcement deleted successfully",
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
