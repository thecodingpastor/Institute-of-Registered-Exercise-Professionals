import { useRouter } from "next/router";

import { AuthWrapperPropTypes } from "../types";

import classes from "./AuthWrapper.module.scss";

const AuthWrapper: React.FC<AuthWrapperPropTypes> = ({ mode, children }) => {
  const { push } = useRouter();

  const Switch = () => {
    if (mode === "login") {
      push("/register");
    } else push("/login");
  };

  return (
    <div className={classes.Container}>
      <h1 onDoubleClick={Switch}>{mode === "login" ? "Login" : "Register"}</h1>
      {children}
    </div>
  );
};

export default AuthWrapper;
