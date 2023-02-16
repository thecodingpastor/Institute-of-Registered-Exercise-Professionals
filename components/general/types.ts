export type ImageAreaProps = {
  UploadedFile: any;
  setUploadedFile: React.Dispatch<React.SetStateAction<any>>;
  isPayment?: boolean;
};

// An interface for our actions
export interface ContactFormInputsAction {
  type: "INPUT_CHANGE";
  inputId: string;
  value: string;
  isValid: boolean;
}
