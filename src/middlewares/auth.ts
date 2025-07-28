import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

class Auth{
  private static instance: Auth;

  public static getInstance(): Auth {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public authMiddleware = (
    req: Request & { user?: string | jwt.JwtPayload },
    res: Response,
    next: NextFunction
  ): Response<any, Record<string, any>> | void => {
    try {
      const authHeader = req?.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decoded = jwt.verify(token, config?.secretKey);
       
      req.user = decoded;
      return next();
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "User Unauthorised";
      return res.status(403).json({ message: errorMessage });
    }
  };
}

export default Auth.getInstance();
