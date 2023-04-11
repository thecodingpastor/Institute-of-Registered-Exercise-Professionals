import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import Protect from "../../../middleware/protect";
import applyRateLimit from "../../../utils/applyRateLimiting";
import CheckRole from "../../../middleware/checkRole";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(403).json({ message: "Invalid Request" });

  try {
    await applyRateLimit(req, res);
  } catch {
    return res.status(429).json({ message: "Too many requests" });
  }

  const { firstName, lastName, email, password } = req.body;
  // Other validations done with mongoose
  if (password.trim().length < 6)
    return res
      .status(400)
      .json({ message: "Password cannot be less than 6 characters" });
  // Validating Via Mongoose
  try {
    await connectDB();

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      numberOfAssignedClients: 0,
    });
    if (!user)
      return res
        .status(500)
        .json({ message: "Could not make new user. Please try later" });

    // This doesn't log in the user
    res.status(200).json(user);
  } catch (err) {
    if (err.code === 11000) {
      // I did this to prevent querying the DB for this new username
      return res.status(400).json({ message: "Email is already taken" });
    }

    return res.status(500).json({ message: err.message });
  }
};

export default Protect(CheckRole(handler, ["admin", "superuser"]));
