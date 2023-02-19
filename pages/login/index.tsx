import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";
import AuthPageLoading from "../../components/loaders/AuthPageLoading";

import { SelectAuth } from "../../features/auth/authSlice";

import classes from "./Index.module.scss";
import AuthWrapper from "../../features/auth/components/AuthWrapper";
import {
  LoginFormInputs,
  LoginFormInputsArray,
} from "../../features/auth/AuthFormInputs";
import { Login } from "../../features/auth/authApi";
import FormInput from "../../components/form/FormInput";
import Button from "../../components/form/Button";
import Spin from "../../components/loaders/Spin";
import { ValidateEmail, ValidatePassword } from "../../utils/validations";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const LoginPage = () => {
  const { replace } = useRouter();
  const { accessToken } = useAppSelector(SelectAuth);

  const dispatch = useAppDispatch();
  const { userLoading } = useAppSelector((state) => state.auth);
  const [LoginFormValues, setLoginFormValues] = useState<any>(LoginFormInputs);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!LoginFormIsValid) return;
    dispatch(
      Login({
        email: LoginFormValues.email,
        password: LoginFormValues.password,
      })
    );
  };

  const LoginFormIsValid =
    ValidateEmail(LoginFormValues.email?.trim()) &&
    ValidatePassword(LoginFormValues.password);

  if (accessToken) {
    replace("/");
    return <AuthPageLoading />;
  }

  return (
    // <GoogleReCaptchaProvider></GoogleReCaptchaProvider>
    <div className={classes.Container}>
      <AuthWrapper mode="login">
        <form onSubmit={!LoginFormIsValid ? () => {} : (e) => handleSubmit(e)}>
          {LoginFormInputsArray.map((input) => (
            <FormInput
              key={input.name}
              value={LoginFormValues[input.name]}
              onChange={(e: any) =>
                setLoginFormValues({
                  ...LoginFormValues,
                  [e.target.name]: e.target.value,
                })
              }
              {...input}
            />
          ))}
          <div
            className="text-center"
            style={{
              height: "5rem",
              marginBottom: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!userLoading ? (
              <Button
                text="Login"
                type="submit"
                mode="pry"
                disabled={!LoginFormIsValid}
              />
            ) : (
              <Spin />
            )}
          </div>
        </form>
      </AuthWrapper>
    </div>
  );
};

export default LoginPage;
