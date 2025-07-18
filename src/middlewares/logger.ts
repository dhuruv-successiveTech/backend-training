import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date();
  console.log(
    `Request method : ${req.method}, URL : ${
      req.originalUrl
    }, timestamp : ${timestamp.toLocaleString()}`
  );
  next();
};

export { loggerMiddleware };
