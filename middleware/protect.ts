import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "../general-types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { promisify } from "util";

import User from "../models/userModel";

const Protect = (handler: Function) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    // Get token and check if it exists
    let token: string;
    const headAuth = req.headers.authorization;

    if (headAuth && headAuth.startsWith("Bearer")) {
      token = headAuth.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Please log in to get access.",
      });
    }

    try {
      // Verify token
      const decoded: JwtPayload = await promisify(jwt.verify)(
        token,
        // @ts-ignore
        process.env.ACCESS_TOKEN_SECRET
      );

      // Check if user exists with refresh token
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return res.status(401).json({
          message: "The user that has this token does not exist.",
        });
      }

      const { _id, role } = currentUser;

      // Grant access to protected route
      req.userId = _id;
      req.userRole = role;

      return handler(req, res);
    } catch (err) {
      // return res.status(403).end() is == res.sendStatus(403) in nodeAPI
      // If the token is expired, allow setting refresh token and new access token
      if (err.name === "TokenExpiredError") return res.status(403).end();

      return res.status(401).json({
        message: "Please log in to get access.",
      });
    }
  };
};
export default Protect;
