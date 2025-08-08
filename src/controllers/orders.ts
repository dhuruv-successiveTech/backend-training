import { IOrder } from "../entities/IOrder";
import orders from "../services/orders";
import { orderdata } from "../utils/order";

class Order {
  private static instance: Order;
  public static getInstance(): Order {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public seedOrder = async () => {
    try {
      const orderData: IOrder[] = orderdata;
      await orders.seedOrder(orderData);
    } catch (error) {
      throw error;
    }
  };
}
export default Order.getInstance();
