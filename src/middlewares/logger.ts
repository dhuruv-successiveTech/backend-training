import { Request, Response, NextFunction } from "express";
import { LoggerInterface } from "../interface";

export class Logger implements LoggerInterface {
  private static instance: Logger;
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  public loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const timestamp = new Date();
    console.log(
      `Request method : ${req.method}, URL : ${
        req.originalUrl
      }, timestamp : ${timestamp.toLocaleString()}`
    );
    next();
  };
}
