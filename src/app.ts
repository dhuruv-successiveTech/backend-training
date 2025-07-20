import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { mockData } from "./utils";
import { router } from "./route";
import createError from "http-errors";
import { error } from "./middlewares";
import { customHeader } from "./middlewares";
import { rateLimiter } from "./middlewares";
import { port } from "./config/config";
import { validateRoute } from "./middlewares";

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
app.use(validateRoute);

const data: MockdataInterface[] = mockData;

app.get("/user", (req: Request, res: Response) => {
  res.status(200).json({
    data: data,
    success: true,
  });
});

app.use("/api", router);

app.use((req, res, next) => {
  next(createError(404, "Route Not Found"));
});

app.use(error);

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
