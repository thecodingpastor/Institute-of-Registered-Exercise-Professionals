import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import Protect from "../../../middleware/protect";
import CheckRole from "../../../middleware/checkRole";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(403).json({ message: "Invalid Request" });

  const { userId, role } = req.query;
  if (!userId || !role)
    return res.status(400).json({ message: "Invalid data sent" });

  try {
    await connectDB();
    const users = await User.find({ [`${role}._id`]: userId })
      .sort("-updatedAt")
      .select(`firstName lastName ${role}`);

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default Protect(
  CheckRole(handler, ["admin", "superuser", "nutritionist", "fitnessCoach"])
);
