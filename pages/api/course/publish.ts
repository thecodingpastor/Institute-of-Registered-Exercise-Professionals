import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Course from "../../../models/course";
import Protect from "../../../middleware/protect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT")
    return res.status(401).json({ message: "Invalid request" });
  const { slug: id, isPublished } = req.body;
  if (!id) return res.status(404).json({ message: "Invalid parameters" });

  try {
    await connectDB();

    const course = await Course.findByIdAndUpdate(
      id,
      { isPublished: !isPublished },
      { new: true }
    );

    if (!course)
      return res.status(404).json({ message: `The course could not be found` });

    res.json({ _id: course._id, isPublished: course.isPublished });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default Protect(handler);
