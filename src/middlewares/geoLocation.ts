import axios from "axios";
import { NextFunction, Request, Response } from "express";

export const geoLocation = (expectedRegion: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const location = await axios.get(`https://ipapi.co/${req.ip}/json`);
    const country_code = location.data.country_code;
    if (country_code === expectedRegion) {
      return next();
    } else {
      return next(new Error("Country code does not match the region"));
    }
  };
};
