import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { IUserController } from "../entities";

interface UserInterface {
  userName: string;
  email: string;
  mobile: number;
  password: string;
  gender: string;
}

class UserController implements IUserController {
  private static instance: UserController;

  private users: UserInterface[] = [];

  public static getInstance(): UserController {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public user = (
    req: Request & { user?: UserInterface },
    res: Response,
    next: NextFunction
  ): Response<any, Record<string, any>> | void => {
    try {
      if (req?.user) {
        return res.status(200).json({
          data: req?.user,
          message: "User Data",
        });
      } else {
        return res.status(403).json({
          message: "Access Denied",
        });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> => {
    try {
      const { userName, password } = req?.body;
      const isExist = this.users.find((u) => u?.userName === userName);
      if (!isExist) {
        return res.status(404).json({ message: "user not found" });
      }

      const valid = await bcrypt.compare(password, isExist?.password);
      if (!valid) {
        return res.status(400).json({ message: "password does not match" });
      }

      const token = jwt.sign({ userName }, config.secretKey, {
        expiresIn: "5h",
      });
      return res.status(200).json({ message: "user logged in", token });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> => {
    try {
      const { userName, password, email, gender, mobile } = req?.body;

      const isExist = this.users.find((user) => user?.userName === userName);
      if (isExist) {
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
      this.users.push(newUser);

      return res
        .status(201)
        .json({ success: true, message: "user registered successfully" });
    } catch (error) {
      throw error;
    }
  };
}

export default UserController.getInstance();
