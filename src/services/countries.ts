import { ICountries } from "../entities";
import { CountriesRepo } from "../repository/";

class Countries {
  private static instance: Countries;

  public static getInstance(): Countries {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
  public async seedCountries(
    countrydetails: ICountries[]
  ): Promise<void> {
    const exists = await CountriesRepo.countriesExist();
    if (!exists) {
      await CountriesRepo.countriesPostRepo(countrydetails);
      console.log("Countries seeded successfully.");
    } else {
      console.log("Countries already exist in the database. Skipping seeding.");
    }
  }
}

export default Countries.getInstance();
