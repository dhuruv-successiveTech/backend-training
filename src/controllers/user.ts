import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

interface userInterface {
  userName: string;
  password: string;
  email?: string;
  gender?: string;
  mobile?: string;
}

export class UserController {
  private static users: userInterface[] = [];

  public static user = (
    req: Request & { user?: userInterface },
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.user) {
        res.status(200).json({
          data: req.user,
          message: "User Data",
        });
      } else {
        res.status(401).json({
          message: "User Unauthorised",
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public static login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userName, password } = req.body;

      const existing = UserController.users.find(
        (user) => user.userName === userName
      );

      if (!existing) {
        return res.status(404).json({ message: "user not found" });
      }
      const passwordVerify = await bcrypt.compare(password, existing.password);
      if (!passwordVerify) {
        return res.status(400).json({ message: "passowrd do not match" });
      }

      const token = jwt.sign(
        {
          userName,
        },
        config.secretKey,
        { expiresIn: "5h" }
      );
      return res.status(201).json({
        message: "user logged in",
        token: token,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public static register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userName, password, email, gender, mobile } = req.body;

      const existing = UserController.users.find(
        (user) => user.userName === userName
      );
      if (existing) {
        return res.status(400).json({ message: "user already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        userName,
        password: hashedPassword,
        email,
        gender,
        mobile,
      };
      UserController.users.push(newUser);

      return res
        .status(201)
        .json({ success: true, message: "user registered successfully" });
    } catch (error) {
      next(error);
    }
  };
}
