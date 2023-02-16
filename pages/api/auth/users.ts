import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "../../../general-types";

import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import Protect from "../../../middleware/protect";
import CheckRole from "../../../middleware/checkRole";

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await connectDB();
      const users = await User.find().sort({ createdAt: -1 });

      if (!users)
        return res
          .status(500)
          .json({ message: "Could not get users at this time" });

      return res.json(users);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "PATCH") {
    // I used this to update the role of a user
    const { userId, role } = req.body;
    const allowedRoles = ["admin", "staff"];
    if (!userId || !allowedRoles.includes(role))
      return res.status(401).json({ message: "Invalid parameters" });

    try {
      await connectDB();
      const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );

      if (!user)
        return res.status(500).json({
          message: "Could not update user role at this time. Please try later",
        });

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "DELETE") {
    const { userId } = req.query;
    const role = req.userRole;
    if (!userId) return res.status(400).json({ message: "Invalid Paramters" });

    if (role !== "superuser")
      return res
        .status(401)
        .json({ message: "You are not allowed to do that" });

    try {
      await connectDB();

      const user = await User.findByIdAndDelete(userId);

      if (!user)
        return res.status(500).json({
          message: "Could not delete user at this time. Please try later.",
        });

      return res.json(userId);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

export default Protect(CheckRole(handler, ["admin", "superuser"]));
