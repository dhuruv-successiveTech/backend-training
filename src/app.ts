import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { mockData } from "./utils/mockData";
import { router } from "./routes/user";
import dotenv from "dotenv";
import { error } from "./middlewares/error";
import { customHeader } from "./middlewares/customHeader";
import { rateLimiter } from "./middlewares/rateLimiter";

interface MockdataInterface {
  name: string;
  age: number;
  company: string;
}

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(customHeader)
app.use(rateLimiter(4,10000))

const data: MockdataInterface[] = mockData;
const port = 3000;

app.get("/user", (req: Request, res: Response) => {
  res.status(200).json({
    data: data,
    success: true,
  });
});

app.use("/api", router);

app.use(error);

app.listen(port, () => {
  console.log(`server listening at http://localhost:3000`);
});
