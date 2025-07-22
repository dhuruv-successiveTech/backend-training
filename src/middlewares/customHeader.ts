import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
export class Header {
  public static customHeader = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.setHeader("custom-header", config.header);
    next();
  };
}
