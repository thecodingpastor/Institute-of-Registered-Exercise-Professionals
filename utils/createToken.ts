import jwt from "jsonwebtoken";

const createToken = (id: string, role: string, typeOfToken?: string) => {
  if (typeOfToken === "refresh") {
    return jwt.sign(
      { id, role: role },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
      }
    );
  }

  return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
};

export default createToken;
