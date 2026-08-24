import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

const createToken = (id: string, role: string, typeOfToken?: string) => {
  if (typeOfToken === "refresh") {
    return jwt.sign(
      { id, role: role },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES as SignOptions["expiresIn"],
      }
    );
  }

  return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES as SignOptions["expiresIn"],
  });
};

export default createToken;
