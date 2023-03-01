import { NextApiRequest } from "next";

export type Role = "user" | "admin" | "superman";

export interface UserInterface {
  _id: string;
  username: string;
  role: string;
  refreshToken?: string | undefined;
  passwordResetToken?: string | undefined;
  passwordResetExpires?: Date | undefined;
  password: string | undefined;
  isNew: boolean;
  passwordChangedAt?: any;
  isModified: any;
  comparePassword: Function;
}

export type NextApiRequestWithUser = NextApiRequest & {
  userId?: Role;
  userRole?: string;
};
