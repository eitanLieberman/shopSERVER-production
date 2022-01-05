import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { default as userRoute } from "./routes/user.js";
import { default as authRoute } from "./routes/auth.js";
import { default as productRoute } from "./routes/product.js";
import { default as categoryRoute } from "./routes/category.js";
import { default as cartRoute } from "./routes/cart.js";
import { default as orderRoute } from "./routes/order.js";
import { default as stripeRoute } from "./routes/stripe.js";
dotenv.config();
const app = express();
//check
try {
  const connection = await mongoose.connect(process.env.MONGO_URL);

  console.log(" great success");
} catch (error) {
  console.log(error);
}
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.listen(8080, () => {
  console.log("backend server running!");
});
