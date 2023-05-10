export type FormInputsType = {
  inputs: {
    username: {
      value: string;
      isValid: boolean;
    };
    password: {
      value: string;
      isValid: boolean;
    };
  };
  formIsValid: boolean;
};

export type UserRole = "staff" | "admin" | "superuser";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  accessToken: string;
  numberOfClientsDone: number;
  totalNumberOfClientsDone: number;
}

export type AuthWrapperPropTypes = {
  mode: "login" | "register";
  children: React.ReactNode;
};

export interface InitialAuthStateType {
  user: User | null;
  accessToken: string | null;
  userLoading: string | null;
  usersList: User[];
  assignClientsToStaff: "loading" | User[];
}
