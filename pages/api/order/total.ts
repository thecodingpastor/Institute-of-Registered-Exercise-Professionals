import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Order from "../../../models/order";
import Protect from "../../../middleware/protect";
import CheckRole from "../../../middleware/checkRole";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method === "GET") {
    try {
      await connectDB();

      const total = await Order.count({});
      const completed = await Order.count({ status: "completed" });
      const pending = total - completed;
      const free = await Order.count({ paymentMode: "none" });
      const paystack = await Order.count({ paymentMode: "card" });
      const transfer = total - paystack - free;

      return res.json({ total, completed, pending, paystack, transfer, free });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(500).json({ message: "Invalid parameters." });
  }
};

export default Protect(CheckRole(handler, ["admin", "superuser"]));
