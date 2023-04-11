import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import { UserInterface } from "../general-types";
import { ValidateEmail } from "../utils/validations";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      minlength: [2, "First name cannot be less than 2 characters."],
      maxlength: [50, "First name cannot be less than 50 characters."],
      trim: true,
    },
    lastName: {
      type: String,
      minlength: [2, "Last name cannot be less than 2 characters."],
      maxlength: [50, "Last name cannot be less than 50 characters."],
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
    code: String,
    numberOfAssignedClients: Number,
    role: {
      type: String,
      default: "staff",
      enum: {
        values: [
          "client",
          "admin",
          "superuser",
          "staff",
          "fitness-coach",
          "nutritionist",
        ],
        message: "Invalid role",
      },
    },
    phone: {
      type: String,
      unique: [true, "This phone number already exists."],
    },
    age: String,
    height: {
      type: Number,
    },
    // Pending validation
    weight: String,
    bmi: String,
    fat: String,
    whr: String,
    bp: String,
    exerciseFrequency: Object,
    exerciseIntensity: Object,
    exerciseDuration: Object,
    exerciseType: Object,
    healthStatus: {
      type: String,
      maxlength: [300, "Health status cannot be more than 300 characters."],
    },
    lifeStyleDescription: {
      type: String,
      maxlength: [
        300,
        "Life Style Description cannot be more than 300 characters.",
      ],
    },
    dayOne: Object,
    dayTwo: Object,
    dayThree: Object,
    likedFoods: {
      type: String,
      maxlength: [300, "Liked Foods cannot be more than 300 characters."],
    },
    dislikedFoods: {
      type: String,
      maxlength: [300, "Disliked Foods cannot be more than 300 characters."],
    },
    exerciseAnswers: Object,
    exerciseAnswersDetails: Object,
    likedExercises: {
      type: String,
      maxlength: [300, "Liked Exercises cannot be more than 300 characters."],
    },
    dislikedExercises: {
      type: String,
      maxlength: [
        300,
        "Disliked Exercises cannot be more than 300 characters.",
      ],
    },
    posturalAlignmentIssues: {
      type: String,
      maxlength: [
        300,
        "Postural Alignment issues cannot be more than 300 characters.",
      ],
    },
    nutritionist: Object,
    fitnessCoach: Object,
    beepTest: String,
    sitAndReach: String,
    plankTest: String,
    pushUp: String,
    nutrition: String,
    cardio: String,
    muscular: String,
    flex: String,
    shortTermWellBeingGoal: {
      type: String,
      maxlength: [300, "Goals cannot be more than 300 characters."],
    },
    mediumTermWellBeingGoal: {
      type: String,
      maxlength: [300, "Goals cannot be more than 300 characters."],
    },
    longTermWellBeingGoal: {
      type: String,
      maxlength: [300, "Goals cannot be more than 300 characters."],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Invalid gender entered",
      },
    },
    reportIsReady: Boolean,
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
  // Sets password changed at field in theUser collection
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Instance Method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
  UserPassword: string
) {
  return await bcrypt.compare(candidatePassword, UserPassword);
};

// models.User prevents unnecessary re-instatiation of User model
// const User = model<UserInterface>("User", UserSchema);
const User = models.User || (model("User", UserSchema) as any);
export default User;
