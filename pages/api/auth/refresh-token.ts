import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "../../../utils/connectDB";
import createToken from "../../../utils/createToken";
import User from "../../../models/userModel";
import Cookies from "cookies";
import { CookieOptions } from "../../../utils/cookieOptions";
import { promisify } from "util";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("DATA 1 => ", process.env.NODE_ENV);
  console.log("DATA 2 => ", process.env.LIVE_MONGO_URI);
  if (req.method !== "GET")
    return res.status(401).json({ message: "Invalid request" });

  try {
    await connectDB();

    const refreshTokenFromBrowser = req.cookies.irep;
    if (!refreshTokenFromBrowser) return res.send(null);

    const decoded: JwtPayload = await promisify(jwt.verify)(
      refreshTokenFromBrowser, // @ts-ignore
      process.env.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = createToken(decoded.id, decoded.userRole);
    const newRefreshToken = createToken(
      decoded.id,
      decoded.userRole,
      "refresh"
    );

    const user = await User.findByIdAndUpdate(decoded.id, {
      refreshToken: newRefreshToken,
    });

    // This sets ANOTHER REFRESH TOKEN in the cookies tab of the browser. This ensures that whenever a new accessToken is made, a new refresh token is made also
    const cookies = new Cookies(req, res, {
      secure: process.env.NODE_ENV === "production" /* request is secure */,
    });
    cookies.set("irep", newRefreshToken, CookieOptions);

    return res.status(200).json({
      accessToken: newAccessToken,
      user, // I need to set this user in other to hydrate the user state in the front end as it would have cleared when the user refreshes or leaves the page
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError")
      return res
        .status(401)
        .json({ message: "Invalid credentials, please log in." });
    if (err.name === "TokenExpiredError")
      return res
        .status(401)
        .json({ message: "Session expired, please log in again." });
    res.status(500).json({ message: err.message });
  }
};

export default handler;
