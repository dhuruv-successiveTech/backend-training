import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { user } from "../models";

// Define a custom type for req.user
interface CustomRequest extends Request {
  user?: { authType: string; id: string } | string | jwt.JwtPayload; // Ensure this matches the structure of req.user
}

class AdminAuth {
  private static instance: AdminAuth;

  public static getInstance(): AdminAuth {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public adminAuth = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (req?.user && typeof req.user !== "string") {
      const userId = req.user.id;
      const loggedInUser = await user.findById(userId);

      if (loggedInUser?.authType !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized. No valid token found." });
    }
    next();
  };
}

export default AdminAuth.getInstance();
