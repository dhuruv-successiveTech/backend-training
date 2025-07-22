import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

interface AuthInterface {
  user?: string | jwt.JwtPayload;
}

export class Auth {
  public static authMiddleware = (
    req: Request & AuthInterface,
    res: Response,
    next: NextFunction
  ) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
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
