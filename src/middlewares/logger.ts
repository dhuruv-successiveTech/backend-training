import { Request, Response, NextFunction } from "express";
import { LoggerInterface } from "../interface/logger";

class Logger implements LoggerInterface {
  private static instance: Logger;
  public static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
  public loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const timestamp = new Date();
    console.log(
      `Request method : ${req?.method}, URL : ${
        req?.originalUrl
      }, timestamp : ${timestamp.toLocaleString()}`
    );
    next();
  };
}

export default Logger.getInstance()
