import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { LocationInterface } from "../interface";

class Location implements LocationInterface{

  private static instance : Location;

  public static getInstance ():Location{
    if(!this.instance){
      this.instance = new this();
    }
    return this.instance
  } 

  public geoLocation = (expectedRegion: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const location = await axios.get(`https://ipapi.co/${req.ip}/json`);
      const country_code = location?.data?.country_code;
      if (country_code === expectedRegion) {
        return next();
      } else {
        throw new Error("Country code does not match the region");
      }
    };
  };
}

export default Location.getInstance()
