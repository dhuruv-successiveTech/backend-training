import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
    mobile: {
      type: Number,
      min: 1000000000,
      max: 9999999999,
      required: true,
    },
  }
);

export const user = mongoose.model("User", userSchema);
