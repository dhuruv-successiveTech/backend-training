export interface IOrder {
  orderId: string;
  customerName: string;
  orderDate: string;
  status: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
}
