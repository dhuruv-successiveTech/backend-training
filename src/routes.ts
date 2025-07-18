import express from "express";
import { userRoute } from "./routes/user";

const router = express.Router();

router.use("/user", userRoute);

export { router };
