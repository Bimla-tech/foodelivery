import express from "express";
import auth from "../middleware/auth.js";
import { listOrders, placeOrder, updateStatus, userOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place",auth,placeOrder);
router.post("/userorders",auth,userOrders);
router.get("/list",listOrders);
router.post("/status",updateStatus);

export default router;