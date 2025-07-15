import { NextFunction, Request, Response } from "express";
const customHeader = (req: Request, res: Response, next: NextFunction) => {
  const customMessage = process.env.customMessage || "";
  res.setHeader("custom-header", customMessage);
  next();
};

export { customHeader };
