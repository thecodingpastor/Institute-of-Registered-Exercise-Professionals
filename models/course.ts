import { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      minlenth: [5, "A course must have a least 5 characters"],
      trim: true,
    },
    image: {
      type: Object,
    },
    onlinePrice: Number,
    offlinePrice: Number,
    promoPercentage: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      unique: [
        true,
        "Tweak the Course Title a bit, Course Title already in use",
      ],
    },
    duration: {
      type: String,
    },
    mainContent: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: String,
    },
    announcement: {
      type: Object,
      default: null,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// const Course = model<CourseInterface>("Course", CourseSchema);
// const Course = models.Course || (model("Course", CourseSchema) as any);
const Course = models.Course || (model("Course", CourseSchema) as any);
export default Course;
