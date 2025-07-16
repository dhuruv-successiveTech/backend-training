import { NextFunction, Request, Response } from "express";
import { header } from "../config/config";
const customHeader = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("custom-header", header);
  next();
};

export { customHeader };
