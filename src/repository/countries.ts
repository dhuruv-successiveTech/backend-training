import { CountryDetailsInterface } from "../entities";
import { countries } from "../models";

class CountriesRepo {
  private static instance: CountriesRepo;

  public static getInstance(): CountriesRepo {
    if (!CountriesRepo.instance) {
      CountriesRepo.instance = new CountriesRepo();
    }
    return CountriesRepo.instance;
  }

  public async countriesExist(): Promise<boolean> {
  const existing = await countries.findOne({});
  return !!existing;
}

  public async countriesPostRepo(
    countrydetails: CountryDetailsInterface[]
  ): Promise<CountryDetailsInterface[]> {
    const post = new countries({ countries: countrydetails });
    await post.save();
    return post.countries;
  }
}

export default CountriesRepo.getInstance()