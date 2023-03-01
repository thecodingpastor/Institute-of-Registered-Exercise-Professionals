import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../components/form/Button";
import FormInput from "../../components/form/FormInput";
import Spin from "../../components/loaders/Spin";
import { ResetPassword } from "../../features/auth/authApi";
import { SelectAuth } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";

import classes from "./Index.module.scss";

const ResetPasswordPage = () => {
  const { userLoading } = useAppSelector(SelectAuth);
  const dispatch = useAppDispatch();
  const { query, push } = useRouter();
  const email = query?.email;
  const token = query?.token;
  if (!email || !token) return push("/");

  const [Values, setValues] = useState({ password: "", confirm: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const isValid =
    Values.confirm === Values.password && Values.password.length > 5;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!isValid) return;
    dispatch(ResetPassword({ ...Values, email, token }));
  };

  return (
    <div className={classes.Container}>
      <h2 className="text-center">Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="password"
          onChange={handleChange}
          value={Values.password}
          label="Enter new password"
          placeholder="Enter new password"
          errorText="Password should have 6-50 characters"
          pattern=".{6,50}$"
          type="password"
          required
        />
        <FormInput
          name="confirm"
          onChange={handleChange}
          value={Values.confirm}
          label="Confirm password"
          placeholder="Confirm password"
          pattern={Values.password}
          errorText="Passwords do not match"
          type="password"
          required
        />
        {userLoading === "reset" ? (
          <Spin />
        ) : (
          <Button
            text="Reset Password"
            type="submit"
            mode="pry"
            disabled={!isValid}
            className={classes.Btn}
          />
        )}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
