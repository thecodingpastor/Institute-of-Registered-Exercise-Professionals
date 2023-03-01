import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import SendEmail from "../../../utils/sendEmail";

import connectDB from "../../../utils/connectDB";

import User from "../../../models/userModel";
import applyRateLimit from "../../../utils/applyRateLimiting";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await applyRateLimit(req, res);
  } catch {
    return res.status(429).json({ message: "Too many requests" });
  }

  if (req.method === "GET") {
    const { email, userId } = req.query;
    if (!email || !userId)
      return res.status(400).json({ message: "Invalid Parameters" });
    try {
      await connectDB();
      const user = await User.findById(userId);
      if (user?.role !== "superuser")
        return res
          .status(400)
          .json({ message: "You are not permitted to do that." });

      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000;
      await user.save({ validateBeforeSave: false });

      const resetURL =
        process.env.NODE_ENV === "production"
          ? `https://irep.com.ng/reset-password?token=${resetToken}&email=${email}`
          : `http://localhost:3000/reset-password?token=${resetToken}&email=${email}`;

      await SendEmail({
        from: process.env.EMAIL_USER,
        html: `
          <h3>Password Reset</h3>
          <p> You received this email because you are trying to reset the password of one of your staff with the email "${email}". Click on this <a href="${resetURL}" target="__blank">LINK</a> to reset the password. THIS EXPIRES IN 10 MINUTES. If you did not initiate this, contact the developer of this site.</p>
        `,
        subject: "Password Reset for " + email,
        to: process.env.EMAIL_USER,
      });

      return res.json({ message: "ok" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "POST") {
    const { email, password, confirm, token } = req.body;
    if (password !== confirm)
      return res.status(400).json({ message: "Passwords do not match" });

    try {
      // Check for token and if it's not expired, which is on the superuser
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpires: { $gt: Date.now() },
      }).exec();
      if (!user || user?.role !== "superuser")
        return res
          .status(400)
          .json({ message: "Token is invalid or has expired." });

      const userToUpdatePassword = await User.findOne({ email });
      if (!userToUpdatePassword)
        return res.status(400).json({
          message: "The user you are trying to update cannot be found.",
        });

      // updates the password of staff
      userToUpdatePassword.password = password;
      userToUpdatePassword.refreshToken = undefined;
      // updates superuser
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpires = undefined;

      await userToUpdatePassword.save();
      await user.save();

      return res.json({ message: "ok" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export default handler;
