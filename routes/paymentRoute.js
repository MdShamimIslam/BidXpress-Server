import express from "express";
import { protect } from "../middlewares/authMiddleWare.js";
import { createCheckoutSession } from "../controllers/paymentCtrl.js";

const router = express.Router();

router.post("/create-checkout-session", protect, createCheckoutSession);

export default router;
