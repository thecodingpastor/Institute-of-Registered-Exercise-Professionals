import { useState } from "react";
import Router from "next/router";
import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";

import AuthWrapper from "../../features/auth/components/AuthWrapper";
import FormInput from "../../components/form/FormInput";
import Button from "../../components/form/Button";
import Spin from "../../components/loaders/Spin";

import {
  RegisterFormInputsArray,
  RegisterFormInputs,
} from "../../features/auth/AuthFormInputs";

import {
  ValidateEmail,
  ValidateName,
  ValidatePassword,
} from "../../utils/validations";

import classes from "./Index.module.scss";
import { Register } from "../../features/auth/authApi";
import ProtectedRoute from "../../components/layout/ProtectedRoute";
import ResetPasswordModal from "../../features/auth/components/ResetPasswordModal";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { userLoading, user } = useAppSelector((state) => state.auth);
  const [RegisterFormValues, setRegisterFormValues] =
    useState<any>(RegisterFormInputs);
  const [ShowModal, setShowModal] = useState(false);

  const RegisterFormIsValid =
    ValidateEmail(RegisterFormValues.email?.trim()) &&
    ValidateName(RegisterFormValues.firstName?.trim()) &&
    ValidateName(RegisterFormValues.lastName?.trim()) &&
    ValidatePassword(RegisterFormValues.password);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!RegisterFormIsValid) return;
    dispatch(
      Register({
        firstName: RegisterFormValues.firstName?.trim(),
        lastName: RegisterFormValues.lastName?.trim(),
        email: RegisterFormValues.email?.trim(),
        password: RegisterFormValues.password?.trim(),
      })
    ).then((data) => {
      if (data.meta.requestStatus === "fulfilled") Router.push("/users");
    });
  };

  return (
    <ProtectedRoute>
      <div className={classes.Container}>
        <AuthWrapper mode="register">
          <form onSubmit={(e) => handleSubmit(e)}>
            {RegisterFormInputsArray.map((input) => (
              <FormInput
                key={input.name}
                value={RegisterFormValues[input.name]}
                onChange={(e: any) =>
                  setRegisterFormValues({
                    ...RegisterFormValues,
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
              {userLoading !== "default" ? (
                <Button
                  text="Register"
                  type="submit"
                  mode="pry"
                  disabled={!RegisterFormIsValid}
                />
              ) : (
                <Spin />
              )}
            </div>
          </form>
        </AuthWrapper>
        {user?.role === "superuser" && (
          <p
            className="text-center pointer"
            style={{ marginBottom: "2rem", textDecoration: "underline" }}
            onClick={() => setShowModal(true)}
          >
            Forgot password
          </p>
        )}
        {ShowModal && (
          <ResetPasswordModal
            isOpen={ShowModal}
            close={() => setShowModal(false)}
            loading={userLoading === "forgot"}
            userId={user?._id}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default RegisterPage;
