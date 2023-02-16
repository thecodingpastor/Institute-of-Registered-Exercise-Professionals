import { NextApiRequest, NextApiResponse } from "next";

import Captcha from "../../../models/captcha";
import connectDB from "../../../utils/connectDB";
import GenerateCaptcha from "../../../utils/captcha";
// import { CaptchaType } from "../../../features/auth/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await connectDB();

      let captcha: any;

      if (req.body) {
        // check if it has captcha previously saved in the LocalStorage
        captcha = await Captcha.findOne({ text: req.body });
        if (!captcha)
          return res.status(401).json({ message: "Something is not right." });
      }
      captcha = await Captcha.create({ text: GenerateCaptcha() });
      console.log("captcha => ", captcha);
      return res.json(captcha);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  return res.status(500).json({ message: "Something went wrong" });
};

export default handler;
