import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Order from "../../../models/order";
import Protect from "../../../middleware/protect";
import cloudinary from "../../../utils/cloudinary";
import SendEmail from "../../../utils/sendEmail";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { orderId, pageNumber, param },
    body,
  } = req;
  if (method === "GET") {
    const page = Number(pageNumber) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    let condition: any;

    switch (param) {
      case "paystack":
        condition = { paymentMode: "card" };
        break;
      case "transfer":
        condition = { paymentMode: "transfer" };
        break;
      case "pending":
        condition = { status: "pending" };
        break;
      case "completed":
        condition = { status: "completed" };
        break;
      case "free":
        condition = { paymentMode: "none" };
        break;
      default:
        condition = {};
    }

    try {
      await connectDB();

      const orders = await Order.find(condition)
        .skip(skip)
        .limit(limit)
        .sort("-createdAt");

      if (orders.length === 0 || !orders)
        return res.json({ orders: [], hasNext: false });

      return res.json({ orders, hasNext: orders.length === limit });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (method === "DELETE") {
    if (!orderId)
      return res.status(400).json({ message: "Invalid parameters" });

    try {
      await connectDB();
      const order = await Order.findById(orderId);
      if (!order) return res.status(400).json({ message: "Order not found." });

      const imageCloudId = order.receipt?.public_id;
      if (imageCloudId) {
        let pendingDeleteImage =
          imageCloudId && cloudinary.uploader.destroy(imageCloudId);

        const pendingDeletedOrder = Order.findByIdAndDelete(orderId);
        await Promise.all([pendingDeletedOrder, pendingDeleteImage]);
        return res.json({ message: "ok" });
      } else {
        await Order.findByIdAndDelete(orderId);
        return res.json({ message: "ok" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (method === "PATCH") {
    const { orderId, status } = body;

    if (!orderId || !["pending", "completed"].includes(status))
      return res.status(400).json({ message: "Invalid parameters" });
    try {
      await connectDB();
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          status: status === "pending" ? "completed" : "pending",
        },
        { new: true }
      );

      if (!order)
        return res.status(500).json({ message: "Could not find the order." });

      // Still can't validate if the email is correct
      const emailRes = await SendEmail({
        from: process.env.EMAIL_USER,
        html: `
          <h3>${order.course} paid by ${order.fullName}</h3>
          <div>
  Dear Fitness Professional, <b>your payment has been confirmed.</b>
<p>My name is <b>Joel Uzamere</b>, Director of Training here at the Institute of Exercise Professionals (IREP/IEP). I would like to personally welcome you in your journey to becoming a globally recognized fitness Professional. </p>
<p>As Malcolm X said, “Education is the passport to the future, for tomorrow belongs to those who prepare for it today”. So, congratulations as you start your journey into a bright future. </p>

<p>IREP/IEP is an internationally accredited and recognized training provider, and our certificates can be tendered anywhere in the world.</p>

<p>A student representative will contact you shortly to complete your on-boarding process. Thanks for choosing IREP!  </p>

<p>For further enquiries, please reply this email, send a WhatsApp message or call: <a href='tel:09025868678'}>09025868678</a>. </p>
</div>
        `,
        subject: "Payment Confirmed for: " + order.course,
        to: order.email,
      });
      return res.json({ orderId, status: order.status });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export default Protect(handler);
