import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { SelectCourse } from "../../../features/course/courseSlice";
import { GetSingleCourseFromBackend } from "../../../features/course/courseApi";

import Transition from "../../../components/general/Transition";
import AuthPageLoading from "../../../components/loaders/AuthPageLoading";
import CourseForm from "../../../features/course/components/CourseForm";

import classes from "./Edit.module.scss";
import { AddAlertMessage } from "../../../features/UI/UISlice";

const EditCoursePage = () => {
  const { pathname, query, replace } = useRouter();
  const { slug } = query;

  const dispatch = useAppDispatch();
  const { currentCourse } = useAppSelector(SelectCourse);

  useEffect(() => {
    // This works when the edit page is reloaded
    if (
      currentCourse === "loading" &&
      pathname === "/course/[slug]/edit" &&
      slug
    ) {
      dispatch(GetSingleCourseFromBackend(slug as string));
    }
  }, [slug]);

  if (currentCourse === "loading") return <AuthPageLoading />;

  if (!currentCourse?._id) {
    replace("/course");
    dispatch(AddAlertMessage({ message: "Course not found" }));
    return;
  }

  return (
    <Transition mode="scale-out" className={classes.Container}>
      <CourseForm isEdit />
    </Transition>
  );
};

export default EditCoursePage;
