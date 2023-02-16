// Delete This if the first works
export type InputProps = {
  type?: "text" | "password" | "number" | "url" | string;
  element?: "input" | "textarea" | string;
  placeholder: string;
  name: string;
  required?: boolean;
  id?: string;
  autoComplete?: string;
  onInput: any;
  style?: any;
  row?: number;
  className?: string;
  label: string;
  half?: boolean;
  border?: boolean;
  errorText?: string;
  validators: any[];
};

export type FormInputPropsType = {
  type?: "text" | "password" | "number" | "url" | string;
  element?: "input" | "textarea" | string;
  placeholder: string;
  value: string;
  name: string;
  required?: boolean;
  autoComplete?: string;
  style?: any;
  row?: number;
  className?: string;
  label: string;
  half?: boolean;
  border?: boolean;
  errorText?: string;
  pattern?: any;
  onChange: any;
  disabled?: boolean;
};

export type InputStateType = {
  value: string | undefined; // the value would be undefined at some point
  isValid: boolean;
  isPristine: boolean;
};

// An enum with all the types of actions to use in our reducer
export enum InputActionCases {
  CHANGE = "CHANGE",
  TOUCH = "TOUCH",
}

// An interface for our actions
export interface InputAction {
  type: InputActionCases;
  val?: string;
  validators?: any[];
}

export type ButtonProps = {
  type: string;
  text: React.ReactNode;
  disabled?: boolean;
  to?: string;
  target?: "__blank";
  onClick?: () => void;
  mode?: "pry" | "danger" | "default";
  size?: "small" | "medium";
  className?: any;
};
