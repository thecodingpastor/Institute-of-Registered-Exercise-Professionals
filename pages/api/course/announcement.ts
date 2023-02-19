import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import Course from "../../../models/course";
import Protect from "../../../middleware/protect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { text, date, link, isGeneral, courseId } = req.body;

    if (!text || !date || !link)
      return res.status(400).json({ message: "Invalid parameters." });

    try {
      await connectDB();

      const course = await Course.findById(courseId);
      if (!course)
        return res
          .status(404)
          .json({ message: `The parent course could not be found` });

      course.announcement = {
        text,
        date,
        link,
        isGeneral: isGeneral === "true" ? true : false,
        courseId,
      };

      await course.save();

      return res.json(course.announcement);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else if (req.method === "DELETE") {
    const { courseId } = req.query;

    try {
      await connectDB();
      const course = await Course.findByIdAndUpdate(
        courseId,
        { announcement: null },
        { new: true }
      );
      console.log(course);
      if (!course)
        return res.status(500).json({ message: "Something went wrong!" });

      return res.json({ message: "ok" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  return res.status(400).json({ message: "Invalid parameters" });
};

export default Protect(handler);
