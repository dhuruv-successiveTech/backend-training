import { CountryDetailsInterface } from "../interface";
import { countries } from "../models";

export class CountriesRepo {
  private static instance: CountriesRepo;

  public static getInstance(): CountriesRepo {
    if (!CountriesRepo.instance) {
      CountriesRepo.instance = new CountriesRepo();
    }
    return CountriesRepo.instance;
  }
  public async countriesPostRepo(
    countrydetails: CountryDetailsInterface[]
  ): Promise<CountryDetailsInterface[]> {
    const post = new countries({ countries: countrydetails });
    await post.save();
    return post.countries;
  }
}
