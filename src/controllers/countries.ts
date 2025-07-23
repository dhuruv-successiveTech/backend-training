import { NextFunction, Request, Response } from "express";
import { countryDetails } from "../utils";
import { Countries } from "../services/countries";
import { CountryDetailsInterface } from "../interface/countries";

const countries = Countries.getInstance();
const country: CountryDetailsInterface[] = countryDetails;
export class CountriesController {
  private static instance: CountriesController;

  public static getInstance(): CountriesController {
    if (!CountriesController.instance) {
      CountriesController.instance = new CountriesController();
    }
    return CountriesController.instance;
  }

  public async postCountries(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    
    const data = await countries.countriesService(country);

    res.status(201).json({
      message: "Countries posted successfully",
      countries: data,
    });
  }
}
