import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productName: String,
  quantity: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerName: { type: String, required: true },
  orderDate: Date,
  status: String,
  items: [itemSchema],
  totalAmount: Number,
});

export const Order = mongoose.model("Order", orderSchema);


