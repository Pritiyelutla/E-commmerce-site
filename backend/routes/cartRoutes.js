import express from "express";
import { addToCart, checkout, getCartAndTotal, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart",addToCart);

router.delete("/cart/:id",removeFromCart);

router.get("/cart", getCartAndTotal);

router.post("/checkout", checkout);

export default router;