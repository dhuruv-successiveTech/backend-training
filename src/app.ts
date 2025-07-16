import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { mockData } from "./utils/mockData";
import { router } from "./routes/user";

import { error } from "./middlewares/error";
import { customHeader } from "./middlewares/customHeader";
import { rateLimiter } from "./middlewares/rateLimiter";
import { userSchema } from "./utils/userSchema";
import { validation } from "./middlewares/validation";
import { port } from "./config/config";

interface MockdataInterface {
  name: string;
  age: number;
  company: string;
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(customHeader);
app.use(rateLimiter(4, 25000));

const data: MockdataInterface[] = mockData;

app.get("/user", (req: Request, res: Response) => {
  res.status(200).json({
    data: data,
    success: true,
  });
});

app.use(validation(userSchema));

app.use("/api", router);

app.use(error);

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
