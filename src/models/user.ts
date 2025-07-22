import mongoose from "mongoose";
const AddressSchema = new mongoose.Schema({
  city: String,
  zip: Number,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  hobbies: [String],
  address: AddressSchema,
});

export const user = mongoose.model("User", userSchema);
