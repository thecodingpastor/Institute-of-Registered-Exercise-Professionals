import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Order from "../../../models/order";
import Protect from "../../../middleware/protect";
import cloudinary from "../../../utils/cloudinary";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { orderId },
    body,
  } = req;
  if (method === "GET") {
    try {
      await connectDB();
      const orders = await Order.find().sort({ createdAt: -1 });

      if (orders.length === 0 || !orders) return res.json({ orders: [] });

      return res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (method === "DELETE") {
    if (!orderId)
      return res.status(400).json({ message: "Invalid parameters" });

    try {
      await connectDB();
      const order = await Order.findById(orderId);

      if (!order)
        return res.status(500).json({ message: "Could not delete order." });

      const imageCloudId = order.receipt.public_id;

      let pendingDeleteImage =
        imageCloudId && cloudinary.uploader.destroy(imageCloudId);

      const pendingDeletedOrder = Order.findByIdAndDelete(orderId);
      await Promise.all([pendingDeletedOrder, pendingDeleteImage]);
      return res.json({ message: "ok" });
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
      return res.json({ orderId, status: order.status });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export default Protect(handler);
