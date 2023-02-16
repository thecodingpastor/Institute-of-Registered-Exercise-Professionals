import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../utils/connectDB";
import Protect from "../../middleware/protect";
import { deleteImageInCloud } from "../../utils/cloudinary";
import Course from "../../models/course";
import { CourseType } from "../../features/course/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { model, modelId, imageCloudId },
  } = req;

  if (method !== "DELETE")
    return res.status(401).json({ message: "Invalid request" });

  if (model !== "course" || !modelId || !imageCloudId)
    return res.status(400).json({ message: "Invalid parameters." });

  try {
    await connectDB();

    const course: CourseType = await Course.findById(modelId);
    if (!course) return res.status(400).json({ message: "Course not found!" });

    const result = await deleteImageInCloud(imageCloudId as string);
    if (result === null)
      return res
        .status(500)
        .json({ message: "File already deleted or not found." });

    const updatedCourse = await Course.findByIdAndUpdate(
      modelId,
      { image: null },
      { runValidators: false, new: true }
    );

    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default Protect(handler);
