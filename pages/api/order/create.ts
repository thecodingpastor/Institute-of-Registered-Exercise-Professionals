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
import SendEmail, { VerifyEmail } from "../../../utils/sendEmail";
import Course from "../../../models/course";
import { CheckDate } from "../../../utils/formatDate";

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
      courseId,
      amount,
      mode,
      paymentMode,
      promoPercentage,
      gReCaptchaToken,
      image,
    } = body;

    // verify email
    const verifyEmail = await VerifyEmail(email);
    if (verifyEmail.data.status === "invalid") {
      return res.status(400).json({ message: verifyEmail.data.reason });
    }

    let imageResult: any;

    if (image?.url && paymentMode === "transfer") {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (image?.url.length < 3000)
        return res.status(400).json({ message: "Image not detected." });

      if (image?.size > 3000000 || !allowedTypes.includes(image?.type))
        return res
          .status(400)
          .json({ message: "Image not accepted. Too big or not valid" });
    }

    const isValid =
      LetterSpaceDash(fullName?.trim()) &&
      ValidateEmail(email?.trim()) &&
      /^.{5,100}$/.test(address?.trim()) &&
      LetterSpaceDash(state?.trim()) &&
      LetterSpaceDash(country?.trim());
    // &&
    // /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/.test(phone?.trim());
    if (!isValid) return res.status(400).json({ message: "Invalid inputs" });

    try {
      await connectDB();

      const checkCourse = await Course.findById(courseId);
      if (!checkCourse)
        return res.status(400).json({
          message: "The course you want to register for does not exist",
        });

      if (
        checkCourse?.announcement?.date &&
        !CheckDate(checkCourse?.announcement?.date)
      )
        return res
          .status(400)
          .json({ message: "Promo you applied has expired" });

      const reCaptchaRes = await fetchGoogleScore(gReCaptchaToken);

      if (!reCaptchaRes)
        return res.status(401).json({ message: "Google Recaptcha error" });

      if (image?.url) {
        imageResult = await saveImageInCloud(image?.url, "irep/receipt");

        if (!imageResult?.secure_url)
          return res
            .status(500)
            .json({ message: "Image could not be uploaded." });
      }

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
        paymentMode,
        receipt: imageResult || null,
      });

      if (!order && imageResult?.public_id) {
        await deleteImageInCloud(imageResult?.public_id);
        return res.status(500).json({ message: "Something went wrong" });
      }

      const emailRes = await SendEmail({
        from: process.env.EMAIL_USER,
        html: `
          <h3>${order.course}</h3>
          <p> Dear ${order.fullName}, your order has been received. You will get another email from us when your payment is confirmed. This should take between 5 mins to 24 hours. <p>For further enquiries, please reply this email, send a WhatsApp message or call: <a href='tel:+2349025818046'}> +2349025818046</a>. </p>
        `,
        subject: "Confirmation Pending for: " + order.course,
        to: order.email,
      });
      // replyTo: "ireplearning@gmail.com",

      res.json({ message: "ok" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default handler;
