import express from "express";
import { protect } from "../middlewares/authMiddleWare.js";
import { createPaymentIntent, stripeWebhook } from "../controllers/paymentCtrl.js";

const router = express.Router();

router.post("/create-intent", protect, createPaymentIntent);
// router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

export default router;
