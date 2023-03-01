import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    // Doing validations at the controller level
    fullName: String,
    receipt: {
      type: Object,
      default: null,
    },
    email: {
      required: [true, "Invalid email"],
      type: String,
    },
    phone: {
      required: [true, "Invalid phone number"],
      type: String,
    },
    paymentMode: String,
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "completed"],
        message: "Invalid status entered",
      },
    },
    promoPercentage: {
      type: Number,
      default: 0,
    },
    mode: {
      type: String,
      required: [true, "An order must have a mode of Online or Offline"],
      enum: {
        values: ["online", "offline"],
        message: "Invalid status entered",
      },
    },
    course: String,
    amount: String,
    address: String,
    state: String,
    country: String,
  },
  { timestamps: true }
);

const Order = models.Order || (model("Order", OrderSchema) as any);
export default Order;
