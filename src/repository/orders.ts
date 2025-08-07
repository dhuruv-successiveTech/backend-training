import { IOrder } from "../entities/IOrder";
import { Order } from "../models/orders";

class OrderRepo {
  private static instance: OrderRepo;
  public static getInstance(): OrderRepo {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public seedOrder = async (order: IOrder[]) => {
    try {
      const count = await Order.countDocuments();
      if (count === 0) {
        await Order.insertMany(order);
        console.log("Order inserted to DB");
      } else {
        console.log("Orders already exists");
      }
    } catch (error) {
      throw error;
    }
  };
}

export default OrderRepo.getInstance();
