import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "../general-types";

const CheckRole = (handler: Function, roles: string[]) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    // Roles in an array
    if (!roles.includes(req.userRole)) {
      return res.status(401).json({
        success: false,
        message: "You do not have permission to perform this action.",
      });
    }

    return handler(req, res);
  };
};

export default CheckRole;
