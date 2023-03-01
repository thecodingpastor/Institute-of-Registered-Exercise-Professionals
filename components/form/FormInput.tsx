import { useState } from "react";

import { MdCancel } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { FormInputPropsType } from "./type";

import classes from "./FormInput.module.scss";

const FormInput: React.FC<FormInputPropsType> = ({
  type = "text",
  name,
  placeholder,
  required = false,
  autoComplete = "off",
  pattern = "",
  onChange,
  disabled,
  value,
  className,
  label,
  errorText,
  border,
  options,
  defaultValue,
}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [Focused, setFocused] = useState(false);

  const handleBlur = () => {
    if (!Focused) setFocused(true);
  };

  let content: React.ReactNode;
  if (type === "select") {
    content = (
      <div className={classes.Select}>
        <select
          name={name}
          id={name}
          onChange={onChange}
          value={value || defaultValue}
          disabled={disabled}
        >
          <option disabled>{defaultValue}</option>
          {options.map((opt) => (
            <option key={opt.caption} value={opt.value}>
              {opt.caption}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    content = (
      <input
        className={`${border ? classes.border : ""} `}
        type={
          type === "password" ? (!ShowPassword ? "password" : "text") : type
        }
        id={name}
        name={name}
        min={type === "number" ? 0 : ""}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        pattern={pattern}
        onChange={onChange}
        value={value}
        onBlur={handleBlur}
        data-focused={Focused.toString()}
        disabled={disabled}
      />
    );
  }

  return (
    <div className={`${classes.Container} ${className ? className : ""}`}>
      {type === "password" ? (
        <span
          className={classes.Eyes}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {ShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      ) : (
        ""
      )}
      {content}
      {type !== "select" && (
        <label htmlFor={name} className={classes.Label}>
          {label}
        </label>
      )}
      {Focused && (
        <span className={classes.ErrorText}>
          {errorText} &nbsp; <MdCancel />
        </span>
      )}
    </div>
  );
};

export default FormInput;
