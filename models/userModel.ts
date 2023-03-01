import crypto from "crypto";
import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import { UserInterface } from "../general-types";
import { ValidateEmail } from "../utils/validations";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: [2, "First name cannot be less than 2 characters."],
      trim: true,
    },
    lastName: {
      type: String,
      minlength: [2, "Last name cannot be less than 2 characters."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [
        true,
        "The email already exists, try another one or login if it's yours.",
      ],
      validate: {
        validator: function (email: string) {
          return ValidateEmail(email);
        },
        message: "Please provide a valid email",
      },
    },
    role: {
      type: String,
      default: "staff",
      enum: {
        values: ["staff", "admin", "superuser"],
        message: "Invalid role entered",
      },
    },
    password: {
      type: String,
      trim: true,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpires: {
      type: Date,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (this: UserInterface, next) {
  // ensures password was modified before it runs
  if (!this.isModified("password")) return next();
  // hashes the password
  this.password = await bcrypt.hash(this.password!, 12);
  next();
});

UserSchema.pre("save", function (this: UserInterface, next) {
  // Sets password changed at field in the user collection
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Instance Method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// models.User prevents unnecessary re-instatiation of User model
// const User = model<UserInterface>("User", UserSchema);
const User = models.User || (model("User", UserSchema) as any);
export default User;
