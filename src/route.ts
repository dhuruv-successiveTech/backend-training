import express from "express";
import { userRoute } from "./routes";

const router = express.Router();

router.use("/user", userRoute);

export { router };
