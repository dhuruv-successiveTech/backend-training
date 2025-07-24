import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a custom type for req.user
interface CustomRequest extends Request {
  user?: { authType: string } | string | jwt.JwtPayload; // Ensure this matches the structure of req.user
}

class AdminAuth {
  private static instance: AdminAuth;

  public static getInstance(): AdminAuth {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public adminAuth = (
    req: CustomRequest, 
    res: Response,
    next: NextFunction
  ): Response<any, Record<string, any>> | void => {
    if (req?.user && typeof req.user !== 'string') {
      if (req.user.authType !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized. No valid token found.' });
    }
    next(); 
  };
}

export default AdminAuth.getInstance();
