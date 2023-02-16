import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Course from "../../../models/course";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (req.method === "GET") {
    try {
      await connectDB();
      const course = await Course.findOne({ slug });

      if (!course) return res.json({ message: "Course not found" });

      res.json(course);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    return res.status(401).json({ message: "Invalid request" });
  }
}
