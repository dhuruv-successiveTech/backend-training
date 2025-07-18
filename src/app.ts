import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { mockData } from "./utils";
import { router } from "./route";

import { error } from "./middlewares";
import { customHeader } from "./middlewares";
import { rateLimiter } from "./middlewares";
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

app.use("/api", router);

app.use(error);

app.use((req, res) => {
  res.status(404);
  res.send("File not found");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
