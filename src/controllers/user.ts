import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { userControllerInterface } from "../interface";
import { user } from "../models/user";
import { UserInterface } from "../interface/user";
import { UserService } from "../services/user";

const userService = UserService.getInstance();

export class UserController implements userControllerInterface {
  private static instance: UserController;
  private constructor() {}

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  public user(
    req: Request & { user?: UserInterface },
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
      const { userName,password } = req.body;
      const existing = await userService.getUser(req.body);
      if (!existing) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      const valid = await bcrypt.compare(password, existing?.password);
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
    
      const existing = await userService.getUser(req.body);
      if (existing) {
        res.status(400).json({ message: "user already exists" });
        return;
      }
      const userPost = await userService.userRegister(req.body);

      res.status(201).json({
        success: true,
        message: "user registered successfully",
        user: userPost,
      });
    } catch (error) {
      next(error);
    }
  }
}
