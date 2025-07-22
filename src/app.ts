import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { mockData } from "./utils";
import { router } from "./route";
import createError from "http-errors";
import { ApiError, Header, Limiter } from "./middlewares";
import { config } from "./config/config";

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

const header = Header.getInstance();
const apiError = ApiError.getInstance();
const limiter = Limiter.getInstance();

app.use(header.customHeader);
app.use(limiter.rateLimiter(4, 25000));

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

app.use(apiError.error);

app.listen(config.port, () => {
  console.log(`server listening at http://localhost:${config.port}`);
});
