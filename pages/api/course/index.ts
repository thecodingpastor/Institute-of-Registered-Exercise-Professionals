import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import { NextApiRequestWithUser, UserInterface } from "../../../general-types";
import Course from "../../../models/course";
import { CourseType } from "../../../features/course/types";
import slugify from "../../../utils/slugify";
import cloudinary, {
  deleteImageInCloud,
  saveImageInCloud,
} from "../../../utils/cloudinary";
import ValidateImage from "../../../utils/validateImage";

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await connectDB();
      const { id } = req.query;
      let user: UserInterface, courses: CourseType[];
      // let now = Date.now();
      // let SevenDays = Date.now() + 7 * 24 * 60 * 60 * 1000;
      // // console.log("Now => ", Date.now());
      // // console.log("7 days time => ", Date.now() + 7 * 24 * 60 * 60 * 1000);
      // console.log(SevenDays - now);

      if (id == "none") {
        courses = await Course.find({ isPublished: true })
          .sort("-createdAt")
          .select("-isPublished -__v -mainContent");
      } else {
        user = await User.findById(id);
        if (user) {
          courses = await Course.find().sort("-createdAt");
        } else {
          courses = await Course.find({ isPublished: true })
            .sort("-createdAt")
            .select("-isPublished -__v -mainContent");
        }
      }

      if (!courses)
        return res.status(500).json({
          message: "Something is wrong. Could not get courses at this time",
        });
      if (courses.length === 0) return res.json([]);
      res.json(courses);
    } catch (err) {
      if (err.name === "CastError")
        return res.status(500).json({ message: "Something went wrong" });

      res.status(500).json({
        message:
          err.message ||
          "Something is wrong. Could not get courses at this time",
      });
    }
  } else if (req.method === "POST") {
    try {
      await connectDB();
      const {
        title,
        onlinePrice,
        offlinePrice,
        promoPercentage,
        duration,
        image,
        authorId,
        createdBy,
        mainContent,
      } = req.body;

      // Since i didnt use protect
      const user = await User.findById(authorId);
      if (!user)
        return res
          .status(401)
          .json({ message: "You are not allowed to do that" });

      const checkImage = ValidateImage(image);
      if (!["newImage", "ok"].includes(checkImage))
        return res.status(400).json({ message: checkImage });

      const imageUpload = await saveImageInCloud(image.url);
      if (!imageUpload.secure_url)
        return res
          .status(500)
          .json({ message: "Could not upload image. Please try again later." });
      const newCourse = await Course.create({
        title,
        onlinePrice,
        offlinePrice,
        promoPercentage,
        duration,
        image: imageUpload,
        createdBy,
        mainContent,
        slug: slugify(title),
      });

      if (!newCourse)
        return res.status(500).json({ message: "Something went wrong" });
      return res.json(newCourse);
    } catch (err) {
      if (err.code === 11000)
        return res.json({ message: "Another course has a similar title." });

      return res.status(500).json({
        message: err.message || "Could not create course. Please try later",
      });
    }
  } else if (req.method === "PATCH") {
    try {
      await connectDB();
      const {
        title,
        onlinePrice,
        offlinePrice,
        promoPercentage,
        duration,
        image,
        authorId,
        createdBy,
        mainContent,
        slug,
      } = req.body;

      // Since I did not use Protect.
      const user = await User.findById(authorId);
      if (!user)
        return res
          .status(401)
          .json({ message: "You are not allowed to do that" });

      const course = await Course.findOne({ slug });

      if (!course)
        return res.status(400).json({ message: "Could not find course." });
      // Validate image
      const checkImage = ValidateImage(image);

      if (!["oldImage", "newImage"].includes(checkImage))
        return res.status(400).json({ message: checkImage });

      let newImage: any;
      if (checkImage === "newImage") {
        // Delete the initial uploaded image from the cloud
        const deleteImage = await deleteImageInCloud(course.image.public_id);
        if (!deleteImage)
          return res
            .status(500)
            .json({ message: "Could not delete the previous image" });
        // saveIn cloudinary
        newImage = await saveImageInCloud(image.url);
        if (!newImage)
          return res.status(500).json({ message: "Could not update image." });
      } else {
        // Set the previous image
        newImage = image;
      }

      const updatedCourse = await Course.findOneAndUpdate(
        { slug },
        {
          title,
          onlinePrice,
          offlinePrice,
          promoPercentage,
          duration,
          image: newImage,
          createdBy,
          mainContent,
          slug: slugify(title),
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedCourse)
        return res.status(500).json({ message: "Course not update course." });
      res.json(updatedCourse);
    } catch (err) {
      if (err.code === 11000)
        return res
          .status(400)
          .json({ message: "There is another course with that same title." });
      return res.status(500).json({
        message: err.message || "Something went wrong. Please try later.",
      });
    }
  } else if (req.method === "DELETE") {
    const { courseId } = req.query;

    let course: CourseType;
    try {
      await connectDB();
      course = await Course.findById(courseId);
      if (!course)
        return res
          .status(400)
          .json({ message: "That course cound not be found." });

      const imageCloudId = course.image?.public_id;

      let pendingDeleteImage =
        imageCloudId && cloudinary.uploader.destroy(imageCloudId);

      const pendingDeletedCourse = Course.findByIdAndDelete(courseId);
      await Promise.all([pendingDeletedCourse, pendingDeleteImage]);
      return res.json({ message: "ok" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    return res.status(401).json({ message: "Invalid request" });
  }
};

export default handler;
