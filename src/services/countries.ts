import { ICountries } from "../entities";
import { CountriesRepo } from "../repository/countries";

const countryRepo = CountriesRepo.getInstance();

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
    const exists = await countryRepo.countriesExist();
    if (!exists) {
      await countryRepo.countriesPostRepo(countrydetails);
      console.log("Countries seeded successfully.");
    } else {
      console.log("Countries already exist in the database. Skipping seeding.");
    }
  }
}

export default Countries.getInstance()