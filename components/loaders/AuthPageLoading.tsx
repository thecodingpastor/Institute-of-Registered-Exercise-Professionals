import classes from "./AuthPageLoading.module.scss";

const AuthPageLoading = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Inner}>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <div className={classes.shadow}></div>
        <div className={classes.shadow}></div>
        <div className={classes.shadow}></div>
        <span>Please Wait</span>
      </div>
    </div>
  );
};

export default AuthPageLoading;
