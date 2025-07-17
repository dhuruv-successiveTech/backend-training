import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { mockData } from "./utils/mockData";
import { router } from "./routes/user";

import { error } from "./middlewares/error";
import { customHeader } from "./middlewares/customHeader";
import { rateLimiter } from "./middlewares/rateLimiter";
import { port } from "./config/config";
import { valiationRoute } from "./middlewares/validateRoute";

interface MockdataInterface {
  name: string;
  age: number;
  company: string;
}

const app = express();
app.enable("trust proxy");
app.use((req, res, next) => {
  req.headers["x-forwarded-for"] = "49.249.117.102";
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(customHeader);
app.use(rateLimiter(4, 25000));
app.use(valiationRoute);

const data: MockdataInterface[] = mockData;

app.get("/user", (req: Request, res: Response) => {
  res.status(200).json({
    data: data,
    success: true,
  });
});

app.use("/api", router);

app.use(error);

app.use((req, res) => {
  res.status(404);
  res.send("File not found");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
