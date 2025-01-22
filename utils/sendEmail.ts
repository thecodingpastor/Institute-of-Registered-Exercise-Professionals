import Nodemailer from "nodemailer";
import axios from "axios";

const SendEmail = async ({ from, to, subject, html }) => {
  // you can add reply_to as the fifth arg
  const transporter = Nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    // port: 587,
    secure: false,
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // This is to prevent email failure
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  const mailOptions = {
    from,
    to,
    subject,
    html,
  };

  const data = await transporter.sendMail(mailOptions);
  return data;
};

export default SendEmail;

export const VerifyEmail = async (email: string) => {
  const options = {
    method: "GET",
    url: "https://email-checker.p.rapidapi.com/verify/v1",
    params: { email },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "email-checker.p.rapidapi.com",
    },
  };
  return await axios.request(options);
};
