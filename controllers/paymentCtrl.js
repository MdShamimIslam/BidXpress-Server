import Stripe from "stripe";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
  
    const product = await Product.findById(productId);
  
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
  
    // winner check
    if (product.soldTo.toString() !== userId) {
      res.status(403);
      throw new Error("You are not the auction winner");
    }
  
    // already paid
    if (product?.paymentStatus === "paid") {
      res.status(400);
      throw new Error("Already paid");
    }
  
    // amount fallback
    const finalAmount = product.finalBidPrice ?? product.price;
  
    if (!finalAmount || finalAmount <= 0) {
      res.status(400);
      throw new Error("Invalid payment amount");
    }
  
    const amount = Math.round(finalAmount * 100);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: { productId: product._id.toString(), userId },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
});
  

export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
  
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook signature verification failed:", err.message);
      return res.status(400).json({ 
        success: false, 
        message: `Webhook Error: ${err.message}` 
      });
    }
  
    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object;
      const productId = intent.metadata.productId;
  
      await Product.findByIdAndUpdate(productId, {
        paymentStatus: "paid",
        isSoldout: true
      });
    }
  
    res.json({ received: true });
};
  
  
