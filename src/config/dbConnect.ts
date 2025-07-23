import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/successivedb"
    );
    if (connect) {
      console.log("db connected");
    }
  } catch (error) {
    console.error(error);
  }
};
