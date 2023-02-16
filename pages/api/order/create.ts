import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import {
  deleteImageInCloud,
  saveImageInCloud,
} from "../../../utils/cloudinary";
import fetchGoogleScore from "../../../utils/fetchGoogleScore";
import { LetterSpaceDash, ValidateEmail } from "../../../utils/validations";
import Order from "../../../models/order";
import applyRateLimit from "../../../utils/applyRateLimiting";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  try {
    await applyRateLimit(req, res);
  } catch {
    return res.status(429).json({ message: "Too many requests" });
  }

  if (method === "POST") {
    const {
      fullName,
      email,
      phone,
      address,
      state,
      country,
      course,
      amount,
      mode,
      promoPercentage,
      gReCaptchaToken,
      imageBase64: { url, size, type },
    } = body;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (url.length < 3000)
      return res.status(400).json({ message: "Image not detected." });

    if (size > 3000000 || !allowedTypes.includes(type))
      return res
        .status(400)
        .json({ message: "Image not accepted. Too big or not valid" });

    const isValid =
      LetterSpaceDash(fullName?.trim()) &&
      ValidateEmail(email?.trim()) &&
      /^.{5,100}$/.test(address?.trim()) &&
      LetterSpaceDash(state?.trim()) &&
      LetterSpaceDash(country?.trim()) &&
      /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/.test(phone?.trim());
    if (!isValid) return res.status(400).json({ message: "Invalid inputs" });

    try {
      const reCaptchaRes = await fetchGoogleScore(gReCaptchaToken);

      if (!reCaptchaRes)
        return res.status(401).json({ message: "Google Recaptcha error" });

      const { secure_url, public_id } = await saveImageInCloud(
        url,
        "irep/receipt"
      );

      if (!secure_url)
        return res
          .status(500)
          .json({ message: "Image could not be uploaded." });

      await connectDB();

      const order = await Order.create({
        fullName,
        email,
        phone,
        address,
        state,
        country,
        course,
        amount,
        promoPercentage,
        mode: mode,
        receipt: {
          secure_url,
          public_id,
        },
      });

      if (!order) {
        await deleteImageInCloud(public_id);
        return res.status(500).json({ message: "Something went wrong" });
      }
      res.json({ message: "ok" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default handler;
