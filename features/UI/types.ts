export type AlertMessageType = {
  message: string;
  type?: "fail" | "success";
  id?: number;
};

export type UIStateType = {
  alertMessages: AlertMessageType[];
  confirmModalIsOpen: string;
  checkAuthOnFocus: boolean;
};
