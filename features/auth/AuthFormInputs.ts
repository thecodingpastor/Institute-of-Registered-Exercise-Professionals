export const LoginFormInputs = {
  email: "",
  password: "",
};

export const RegisterFormInputs = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const EmailPattern = "[a-z0-9]+@[a-z]+.[a-z]{2,3}";

const NamePattern = "^[A-Za-z]{2,50}$";

export const LoginFormInputsArray = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    required: true,
    pattern: EmailPattern,
    errorText: "Invalid email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    required: true,
    type: "password",
    pattern: "^.{6,50}$",
    errorText: "Password should be 6 - 50 characters.",
  },
];

export const RegisterFormInputsArray = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
    required: true,
    pattern: EmailPattern,
    errorText: "Invalid email",
  },
  {
    name: "firstName",
    label: "First Name",
    placeholder: "First Name",
    required: true,
    pattern: NamePattern,
    errorText: "First Name should be 2 - 50 characters.",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Last Name",
    required: true,
    pattern: NamePattern,
    errorText: "Last Name should be 2 - 50 characters.",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    required: true,
    type: "password",
    pattern: "^.{6,50}$",
    errorText: "Password should be 6 - 50 characters.",
  },
];
