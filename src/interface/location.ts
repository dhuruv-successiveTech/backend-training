import { NextFunction, Request, Response } from "express";

export interface LocationInterface {
  geoLocation(
    expectedRegion: string
  ): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
