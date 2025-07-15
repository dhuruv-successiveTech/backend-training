import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface userInterface {
  userName: string;
  password: string;
}
const users: userInterface[] = [];

const loginWithToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const secretKey = process?.env?.secretKey || "";
    const { userName, password } = req.body;

    const existing = users.find((user) => user.userName === userName);

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
      secretKey,
      { expiresIn: "1h" }
    );
    res.status(201).json({
      message: "user logged in",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const registerWithToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, password } = req.body;

    const existing = users.find((user) => user.userName === userName);
    if (existing) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { userName, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ success: true, message: "user registered successfully" });
  } catch (error) {
    next(error);
  }
};

export { loginWithToken, registerWithToken };
