import { useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { GetCourses } from "../courseApi";
import { SelectCourse } from "../courseSlice";

import { CourseType } from "../types";

import Button from "../../../components/form/Button";
import CourseCard from "./CourseCard";
import { SelectAuth } from "../../auth/authSlice";
import AuthPageLoading from "../../../components/loaders/AuthPageLoading";

import classes from "./CourseList.module.scss";

// @ts-ignore
const CourseList: React.FC<{ courses: CourseType[] }> = ({ courses }) => {
  const Page = useRef(2);
  const { hasNext } = useAppSelector(SelectCourse);
  const { user } = useAppSelector(SelectAuth);
  const dispatch = useAppDispatch();
  const handleLoadMore = () => {
    dispatch(
      GetCourses({ id: user?._id || "none", pageNumber: Page.current })
    ).then(() => {
      Page.current = Page.current + 1;
    });
  };

  if (courses.length === 0) return <AuthPageLoading />

  return (
    <div className={classes.Container}>
      <div className={classes.Inner}>
        {courses.map((course) => (
          <CourseCard key={course._id} {...course} />
        ))}
      </div>
      {hasNext && (
        <Button
          text="Load More"
          type="button"
          mode="pry"
          className={classes.LoadMore}
          onClick={handleLoadMore}
        />
      )}
    </div>
  );
};

export default CourseList;
