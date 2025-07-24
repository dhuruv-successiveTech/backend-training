
import { countryDetails } from "../utils";
import { Countries } from "../services";
import { CountryDetailsInterface } from "../interface";

const country: CountryDetailsInterface[] = countryDetails;
class CountriesController {
  private static instance: CountriesController;

  public static getInstance(): CountriesController {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async postCountries(): Promise<void> {
    await Countries.seedCountries(country);
  }
}

export default CountriesController.getInstance()
