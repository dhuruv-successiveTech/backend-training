import { IOrder } from "../entities/IOrder";
import orders from "../repository/orders";

class OrderService {
  private static instance: OrderService;
  public static getInstance(): OrderService {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public seedOrder = async (order:IOrder[]) => {
    return await orders.seedOrder(order);
  };
}

export default OrderService.getInstance();
