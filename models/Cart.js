import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    UserId: { type: String, required: true },

    products: [
      {
        productsID: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", CartSchema);
