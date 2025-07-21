import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  header: process.env.CUSTOM_HEADER || "",
  secretKey: process.env.SECRET_KEY || "",
};

export { config };
