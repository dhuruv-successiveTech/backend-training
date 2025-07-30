import { NextFunction, Request, Response } from "express";

class Limiter{
  private static instance: Limiter;

  public static getInstance(): Limiter {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public rateLimiter = (requestLimit: number, timeLimit: number) => {
    const reqObj = new Map();
    return (req: Request, res: Response, next: NextFunction) => {
      const ip = req?.ip;
      if (!reqObj.has(ip)) {
        reqObj.set(ip, { count: 1, previousTime: Date.now() });
      }

      const currentRequest = reqObj.get(ip);

      if (Date.now() - currentRequest.previousTime > timeLimit) {
        currentRequest.count = 1;
        currentRequest.previousTime = Date.now();
      }

      if (currentRequest.count > requestLimit) {
        return res.status(429).json({
          message: "too many request",
        });
      }
      currentRequest.count++;
      next();
    };
  };
}

export default Limiter.getInstance()