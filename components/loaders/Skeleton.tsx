import React from "react";

import classes from "./Skeleton.module.scss";

const Skeleton = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Profile}>
        <div className={`${classes.Circle} ${classes.Skeleton}`}></div>
        <div className={classes.AuthorDate}>
          <div className={`${classes.SkeletonText} ${classes.Skeleton}`}></div>
          <div className={`${classes.SkeletonText} ${classes.Skeleton}`}></div>
        </div>
      </div>
      <div className={classes.Body}>
        <div className={`${classes.SkeletonText} ${classes.Skeleton}`}></div>
        <div className={`${classes.SkeletonText} ${classes.Skeleton}`}></div>
        <div className={`${classes.SkeletonText} ${classes.Skeleton}`}></div>
      </div>
    </div>
  );
};

export default Skeleton;
