import Link from "next/link";
import Router from "next/router";
import classes from "./Error.module.scss";

const Error = () => {
  return (
    <div className={classes.Container}>
      Page Not Found.<span onClick={() => Router.back()}>Go back</span> or{" "}
      <Link href="/">Go Home</Link>
    </div>
  );
};

export default Error;
