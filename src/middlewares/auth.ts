import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { AuthInterface } from "../interface";

export class Auth implements AuthInterface {
  private static instance: Auth;

  private constructor() {}

  public static getInstance(): Auth {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  }

  public  authMiddleware = (
    req: Request & { user?: string | jwt.JwtPayload },
    res: Response,
    next: NextFunction
  ) :void=>  {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
       res.status(401).json({ message: "No token provided" });
       return;
    }
    try {
      const decoded = jwt.verify(token, config.secretKey);
      req.user = decoded;
      return next();
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
