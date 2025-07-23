import express from "express";
import { CountriesController } from "../controllers/countries";

const countryRoute = express.Router();
const country = CountriesController.getInstance()


countryRoute.post("/",country.postCountries);


export { countryRoute };
