import mongoose from "mongoose";

const countriesSchema = new mongoose.Schema({
  countries: [
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      code: {
        type: String,
        required: true,
        unique: true,
      },
    },
  ],
});

export const countries = mongoose.model("Country", countriesSchema);
