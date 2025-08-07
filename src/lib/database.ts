import mongoose from "mongoose";
import { CountriesController } from "../controllers";
import orders from "../controllers/orders";

class DataBase {
  private static instance: DataBase;

  public static getInstance(): DataBase {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect("mongodb://localhost:27017/successivedb");
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  }

  public async seed(): Promise<void> {
    try {
      await CountriesController.postCountries();
    } catch (error) {
      console.error("Database seeding failed:", error);
    }
  }

  public async seed2(): Promise<void> {
    try {
      await orders.seedOrder()
    } catch (error) {
      console.error("Orders seeding failed:", error);
    }
  }
}

export default DataBase.getInstance();
