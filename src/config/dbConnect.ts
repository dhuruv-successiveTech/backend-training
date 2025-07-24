import mongoose from "mongoose";
import { CountriesController } from "../controllers";

export const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/successivedb"
    );
    if (connect) {
      await CountriesController.postCountries()
      console.log("db connected");
    }
  } catch (error) {
    console.error(error);
  }
};
