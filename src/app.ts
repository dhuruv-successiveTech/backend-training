import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { mockData } from "./assignment-2/mockData";

interface MockdataInterface {
  name: string;
  age: number;
  company: string;
}

const app = express();

app.use(cookieParser());

const data: MockdataInterface[] = mockData;
const port = 3000;

app.get("/user", (req: Request, res: Response) => {
  res.status(200).json({
    data: data,
    success: true,
  });
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:3000`);
});
