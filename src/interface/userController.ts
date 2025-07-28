import { NextFunction, Request, Response } from "express";

export interface userControllerInterface {
  user: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Response<any, Record<string, any>> | void;
  login: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<any, Record<string, any>> | void>;
  register: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response<any, Record<string, any>> | void>;
}
