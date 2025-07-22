import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { mockData } from "./utils";
import { router } from "./route";
import createError from "http-errors";
import { ApiError, Header, Limiter } from "./middlewares";
import { config } from "./config/config";
import { dbConnect } from "./config/dbConnect";

interface MockdataInterface {
  name: string;
  age: number;
  company: string;
}

const app = express();
app.enable("trust proxy");

dbConnect();

app.use((req, res, next) => {
  req.headers["x-forwarded-for"] = "49.249.117.102";
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(Header.customHeader);
app.use(Limiter.rateLimiter(4, 25000));

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

app.use(ApiError.error);

app.listen(config.port, () => {
  console.log(`server listening at http://localhost:${config.port}`);
});
