import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface IAuth {
  authMiddleware: (
    req: Request & { user?: string | jwt.JwtPayload },
    res: Response,
    next: NextFunction
  ) => void;
}
