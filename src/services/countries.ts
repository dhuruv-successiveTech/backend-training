import { CountryDetailsInterface } from "../interface/countries";
import { CountriesRepo } from "../repository/countries";

const countryRepo = CountriesRepo.getInstance();

export class Countries {
  private static instance: Countries;

  public static getInstance(): Countries {
    if (!Countries.instance) {
      Countries.instance = new Countries();
    }
    return Countries.instance;
  }
  public async countriesService(
    countrydetails: CountryDetailsInterface[]
  ): Promise<CountryDetailsInterface[]> {
    return countryRepo.countriesPostRepo(countrydetails);
  }
}
