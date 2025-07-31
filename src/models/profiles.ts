import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    city:String,
    zip:Number
})

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  hobbies: [String],
  address:addressSchema
});

export const profiles = mongoose.model("Profile", profileSchema);
