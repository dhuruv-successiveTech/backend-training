import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { userControllerInterface } from "../interface";

interface userInterface {
  userName: string;
  email?: string;
  phone?: number;
  password: string;
  gender?: string;
}

export class UserController implements userControllerInterface {
  private static instance: UserController;

  private users: userInterface[] = [];
  private constructor() {}

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  public user(
    req: Request & { user?: userInterface },
    res: Response,
    next: NextFunction
  ): void {
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
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userName, password } = req.body;
      const existing = this.users.find((u) => u.userName === userName);
      if (!existing) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      const valid = await bcrypt.compare(password, existing.password);
      if (!valid) {
        res.status(400).json({ message: "password does not match" });
        return;
      }

      const token = jwt.sign({ userName }, config.secretKey, {
        expiresIn: "5h",
      });
      res.status(200).json({ message: "user logged in", token });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userName, password, email, gender, mobile } = req.body;

      const existing = this.users.find((user) => user.userName === userName);
      if (existing) {
        res.status(400).json({ message: "user already exists" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        userName,
        password: hashedPassword,
        email,
        gender,
        mobile,
      };
      this.users.push(newUser);

      res
        .status(201)
        .json({ success: true, message: "user registered successfully" });
    } catch (error) {
      next(error);
    }
  }
}
