import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3001;
const header = process.env.CUSTOM_HEADER || "";
const secretKey = process.env.SECRET_KEY || "";

export { port, header, secretKey };
