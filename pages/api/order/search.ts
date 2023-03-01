import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Order from "../../../models/order";
import Protect from "../../../middleware/protect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { page, term },
  } = req;

  // @ts-ignore
  if (term?.trim().length < 3)
    return res
      .status(400)
      .json({ message: "Search term must be at least 3 characters." });
  if (method === "GET") {
    const pageNumber = Number(page) || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;
    await connectDB();
    try {
      // @ts-ignore
      const orders = await Order.find({
        $or: [
          {
            fullName: {
              $regex: term,
              $options: "i",
            },
          },
          { email: { $regex: term, $options: "i" } },
        ],
      })
        .skip(skip)
        .limit(limit)
        .sort("-createdAt");

      if (orders.length === 0 || !orders)
        return res.json({ orders: [], hasNext: false });

      return res.json({ orders, term, hasNext: orders.length === limit });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export default Protect(handler);
