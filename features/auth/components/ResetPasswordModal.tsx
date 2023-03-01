import { useState } from "react";
import Button from "../../../components/form/Button";
import FormInput from "../../../components/form/FormInput";
import Spin from "../../../components/loaders/Spin";
import Modal from "../../../components/modal/Modal";
import { useAppDispatch } from "../../../fetchConfig/store";
import { AddAlertMessage } from "../../UI/UISlice";
import { ForgotPassword } from "../authApi";

import classes from "./ResetPasswordModal.module.scss";

const ResetPasswordModal = ({ isOpen, close, loading, userId }) => {
  const [Value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const isValid = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(Value);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!isValid)
      return dispatch(AddAlertMessage({ message: "Invalid email" }));

    dispatch(ForgotPassword({ email: Value, userId })).then((data) => {
      if (data.meta.requestStatus === "fulfilled") {
        close();
      }
    });
  };

  return (
    <Modal isOpen={isOpen} close={close} className={classes.Container}>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="forgot-email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          value={Value}
          label="Enter the account's email"
          placeholder="Enter the account's email"
          pattern="[a-z0-9]+@[a-z]+.[a-z]{2,3}"
          required
          errorText="Enter a valid email"
        />
        {loading ? (
          <Spin />
        ) : (
          <Button
            text="Send Email"
            mode="default"
            // @ts-ignore
            onClick={(e: any) => handleSubmit(e)}
            disabled={!isValid}
          />
        )}
      </form>
    </Modal>
  );
};

export default ResetPasswordModal;
