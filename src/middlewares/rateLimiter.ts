import { NextFunction, Request, Response } from "express";
import { LimiterInterface } from "../interface/limiter";

export class Limiter implements LimiterInterface {
  private static instance: Limiter;

  public static getInstance(): Limiter {
    if (!Limiter.instance) {
      Limiter.instance = new Limiter();
    }
    return Limiter.instance;
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
