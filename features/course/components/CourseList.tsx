import { CourseType } from "../types";
import CourseCard from "./CourseCard";

import classes from "./CourseList.module.scss";

const CourseList: React.FC<{ courses: CourseType[] }> = ({ courses }) => {
  if (courses.length === 0)
    return (
      <p
        className="text-center"
        style={{ fontWeight: "300", fontSize: "3rem" }}
      >
        There are no courses yet.
      </p>
    );
  return (
    <div className={classes.Container}>
      {courses.map((course) => (
        <CourseCard key={course._id} {...course} />
      ))}
    </div>
  );
};

export default CourseList;
