import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";

import useAxiosProtected from "../../hooks/useAxiosProtected";
import { SelectCourse } from "../../features/course/courseSlice";

import Transition from "../../components/general/Transition";
import CourseList from "../../features/course/components/CourseList";

import classes from "./Index.module.scss";
import Skeleton from "../../components/loaders/Skeleton";
import { BiRefresh } from "react-icons/bi";
import { SelectAuth } from "../../features/auth/authSlice";
import { GetCourses } from "../../features/course/courseApi";
import AuthPageLoading from "../../components/loaders/AuthPageLoading";

const index = () => {
  useAxiosProtected();
  const dispatch = useAppDispatch();
  const { courseList, courseLoading } = useAppSelector(SelectCourse);
  const { user } = useAppSelector(SelectAuth);

  const RefreshCourses = () => {
    dispatch(GetCourses({ pageNumber: 1, id: user?._id }));
  };

  if (courseLoading === "default")
    // @ts-ignore
    return [...Array(10).keys()].map((i) => <AuthPageLoading />);
    // return [...Array(10).keys()].map((i) => <Skeleton key={i} />);

  return (
    <Transition mode="scale-out">
      <div className={classes.Container}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <h1 className="Linez">Courses We Currently Offer</h1>{" "}
          {user?._id && <BiRefresh onClick={RefreshCourses} />}
        </div>
        <CourseList courses={courseList} />
      </div>
    </Transition>
  );
};

export default index;
