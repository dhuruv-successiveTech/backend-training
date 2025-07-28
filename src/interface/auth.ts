import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthInterface {
  authMiddleware: (
    req: Request & { user?: string | jwt.JwtPayload },
    res: Response,
    next: NextFunction
  ) => void;
}
