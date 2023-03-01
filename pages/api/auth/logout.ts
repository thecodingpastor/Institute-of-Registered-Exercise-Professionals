import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

import connectDB from "../../../utils/connectDB";

import User from "../../../models/userModel";
import { CookieOptions } from "../../../utils/cookieOptions";
import applyRateLimit from "../../../utils/applyRateLimiting";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(403).json({ message: "Only get request expected" });

  try {
    await applyRateLimit(req, res);
  } catch {
    return res.status(429).json({ message: "Too many requests" });
  }

  try {
    await connectDB();
    await User.findOneAndUpdate(
      { refreshToken: req.cookies.irep },
      { refreshToken: "" }
    );

    const cookies = new Cookies(req, res);

    // Set cookies to expired
    cookies.set("irep", "", CookieOptions);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default handler;
