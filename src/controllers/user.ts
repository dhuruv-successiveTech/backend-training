import { NextFunction, Request, Response } from "express";

interface userInterface {
    password:string;
    userName:string
}

const user = (
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
    next(error);
  }
};

export { user };
