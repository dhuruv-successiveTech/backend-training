import { Request, Response } from "express";

export class HealthCheck {
  private static instance: HealthCheck;
  public static getInstance(): HealthCheck {
    if (!HealthCheck.instance) {
      HealthCheck.instance = new HealthCheck();
    }
    return HealthCheck.instance;
  }

  public healthCheckController = (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Routes working properly",
    });
  };
}
