import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../utils/connectDB";

import Protect from "../../middleware/protect";
import { CourseType } from "../../features/course/types";
import Course from "../../models/course";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { model, name, value, identifier } = req.body;

  if (req.method !== "POST" || model !== "course")
    return res.status(401).json({ message: "Invalid request" });
  if (!name || !value)
    return res.status(400).json({ message: "Invalid parameters" });

  try {
    let course: CourseType;
    await connectDB();
    if (!identifier) {
      course = new Course({
        [name]: value,
      });

      // @ts-ignore
      const savedNewCourse = await course.save();
      if (!savedNewCourse)
        return res.status(500).json({ message: "Draft not saved" });

      return res.json(savedNewCourse);
    } else {
      course = await Course.findOneAndUpdate(
        { _id: identifier },
        { [name]: value },
        { new: true }
      );
      if (!course)
        return res.status(500).json({ message: "Could not update draft " });
      return res.json(course);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default Protect(handler);
