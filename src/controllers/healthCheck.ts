import { Request, Response } from "express";

class HealthCheck {
  private static instance: HealthCheck;
  public static getInstance(): HealthCheck {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public healthCheckController = (req: Request, res: Response) => {
    return res.status(200).json({
      message: "Routes working properly",
    });
  };
}

export default HealthCheck.getInstance();
