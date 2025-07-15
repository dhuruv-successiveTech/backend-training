import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request & { user?: string | jwt.JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const secretKey = process.env.secretKey || "";

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
