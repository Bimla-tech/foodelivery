import express from "express";
import cors from "cors";
import "dotenv/config";

import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/images",express.static("uploads"));

app.use("/api/user",userRouter);
app.use("/api/food",foodRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.listen(port,()=>{
  console.log("Server running on 4000");
});