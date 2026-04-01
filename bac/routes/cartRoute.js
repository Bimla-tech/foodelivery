import express from "express";
import auth from "../middleware/auth.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add",auth,addToCart);
router.post("/remove",auth,removeFromCart);
router.post("/get",auth,getCart);

export default router;