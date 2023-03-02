// An interface for our actions
export interface ContactFormInputsAction {
  type: "INPUT_CHANGE";
  inputId: string;
  value: string;
  isValid: boolean;
}
