import { Schema, model, models } from "mongoose";

const AnnouncementSchema = new Schema(
  {
    courseId: {
      type: String,
      required: [true, "An announcement must belong to a course or be general"],
    },
    text: {
      type: String,
      required: [true, "An announcement must have a text"],
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    showCountDown: Boolean,
  },
  { timestamps: true }
);

// const Announcement = model<AnnouncementInterface>("Announcement", AnnouncementSchema);
const Announcement =
  models.Announcement || (model("Announcement", AnnouncementSchema) as any); //any is incorrect,
export default Announcement;
