import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";

import { SelectAuth } from "../../features/auth/authSlice";
import { GetCourses } from "../../features/course/courseApi";
import useAxiosProtected from "../../hooks/useAxiosProtected";
import { SelectCourse } from "../../features/course/courseSlice";

import AuthPageLoading from "../../components/loaders/AuthPageLoading";
import Transition from "../../components/general/Transition";
import CourseList from "../../features/course/components/CourseList";

import classes from "./Index.module.scss";
import Skeleton from "../../components/loaders/Skeleton";

const index = () => {
  useAxiosProtected();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(SelectAuth);
  const { courseList, courseLoading } = useAppSelector(SelectCourse);

  useEffect(() => {
    if (courseList.length === 0) {
      dispatch(GetCourses(user?._id || "none"));
    }
  }, [user?._id]);

  if (courseLoading === "default")
    // @ts-ignore
    return [...Array(10).keys()].map((i) => <Skeleton key={i} />);

  return (
    <Transition mode="scale-in">
      <div className={classes.Container}>
        <h1 className="Linez">Courses We Currently Offer</h1>
        <CourseList courses={courseList} />
      </div>
    </Transition>
  );
};

export default index;
