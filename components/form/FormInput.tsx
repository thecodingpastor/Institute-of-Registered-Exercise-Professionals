import { useState } from "react";
// import { useRouter } from "next/router";
// @ts-ignore
// import { useDebounce } from "use-debounce";

import { MdCancel } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { ImShrink } from "react-icons/im";

import { FormInputPropsType } from "./type";
// import { useAppDispatch } from "../../fetchConfig/store";
// import { SaveAsDraft } from "../../features/course/courseApi";

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
}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [Focused, setFocused] = useState(false);
  // const [IsFocused, setIsFocused] = useState(false);
  // const dispatch = useAppDispatch();
  // const { pathname } = useRouter();

  // const [debouncedEditor] = useDebounce(value, 3000);

  // const isDebouncePage = pathname === "/course/create";
  // const handleDebounce = () => {
  //   if (!isDebouncePage || value.trim().length < 1) return;

  //   // No need for huge validation as it is not saved as project yet
  //   dispatch(SaveAsDraft({ name, value }));
  // };

  // useEffect(() => {
  //   if (debouncedEditor && IsFocused) {
  //     handleDebounce();
  //   }
  // }, [debouncedEditor]);

  const handleBlur = () => {
    if (!Focused) setFocused(true);
  };

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
      <input
        className={`${border ? classes.border : ""} `}
        type={
          type === "password" ? (!ShowPassword ? "password" : "text") : type
        }
        id={name}
        name={name}
        // onFocus={() => setIsFocused(true)}
        // onFocus={isDebouncePage ? () => setIsFocused(true) : null}
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
      <label htmlFor={name} className={classes.Label}>
        {label}
      </label>
      {Focused && (
        <span className={classes.ErrorText}>
          {errorText} &nbsp; <MdCancel />
        </span>
      )}
    </div>
  );
};

export default FormInput;
