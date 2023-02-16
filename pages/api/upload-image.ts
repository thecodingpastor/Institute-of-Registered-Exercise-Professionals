import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../utils/connectDB";
import Course from "../../models/course";
import Protect from "../../middleware/protect";
import { saveImageInCloud } from "../../utils/cloudinary";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { imageBase64String, modelId, model },
  } = req;

  if (method !== "POST")
    return res.status(400).json({ message: "Invalid request" });

  if (
    model !== "course" ||
    !imageBase64String ||
    imageBase64String.trim().length < 8000
  )
    return res.status(400).json({ message: "Invalid parameters" });

  try {
    await connectDB();

    if (modelId) {
      // If the course is already in the database.
      const course = await Course.findById(modelId);
      if (!course)
        return res
          .status(400)
          .json({ message: "Course for the uploaded imaged is not found" });

      const imageResult = await saveImageInCloud(imageBase64String);
      if (imageResult === null)
        // This doesn't work as catch kicks in
        return res
          .status(500)
          .json({ message: "Image could not be uploaded for the course" });

      course.image = imageResult;

      await course.save();

      return res.json(course);
    } else {
      // If the project has not been saved in the database, i.e. new project

      // 1. save the image to the cloud
      const imageResult = await saveImageInCloud(imageBase64String);

      const newCourse = new Course({
        image: imageResult,
      });

      const savedNewCourse = await newCourse.save();

      if (!savedNewCourse)
        return res
          .status(500)
          .json({ message: "Could not save new course as draft" });
      return res.json(savedNewCourse);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default Protect(handler);
