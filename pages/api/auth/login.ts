import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import createSendToken from "../../../utils/createSendToken";
import applyRateLimit from "../../../utils/applyRateLimiting";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(401).json({ message: "Invalid request" });

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  try {
    await applyRateLimit(req, res);
  } catch {
    return res.status(429).json({ message: "Too many requests" });
  }

  try {
    await connectDB();
    //2.) Check if user with this username exists
    const user = await User.findOne({ email }).select("+password").exec();
    if (["client", "fitnessCoach", "nutritionist"].includes(user?.role))
      return res
        .status(400)
        .json({
          message: "You are not allowed on this platform! Please contact admin",
        });

    if (!user || !(await user.comparePassword(password, user.password))) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect." });
    }

    // I can decide to attach the user to the req in FUTURE
    // Awaiting createSendToken removes a weird error from the console about not sending a response
    await createSendToken(user, 200, req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default handler;
