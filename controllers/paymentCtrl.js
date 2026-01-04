import Stripe from "stripe";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = asyncHandler ( async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId).populate("soldTo");
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.saleStatus !== "pending") {
    return res.status(400).json({ message: "Payment not allowed" });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: product.soldTo.email, // bidder email
    success_url: `${process.env.CLIENT_SITE_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_SITE_URL}/winning-products`,
    metadata: {
      productId: product._id.toString(),
    },
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: product.winningBid * 100,
          product_data: {
            name: product.title,
            description: "Winning auction product",
            images: [product.image.filePath],
          },
        },
        quantity: 1,
      },
    ],
  });

  res.json({ url: session.url });
});

export const stripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Payment successful
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const productId = session.metadata.productId;

    // Load product + seller
    const product = await Product.findById(productId).populate("user");

    if (!product) {
      return res.json({ received: true });
    }

    // Idempotency check
    if (product.saleStatus === "completed") {
      return res.json({ received: true });
    }

    const winningBid = product.winningBid;
    const commissionPercent = product.commission || 0;

    // Calculate commission
    const commissionAmount = (winningBid * commissionPercent) / 100;

    const sellerAmount = winningBid - commissionAmount;

    // Update product
    product.saleStatus = "completed";
    product.isSoldout = true;
    await product.save();

    // Update seller balance
    await User.findByIdAndUpdate(product.user._id, {
      $inc: { balance: sellerAmount },
    });

    // Update admin commission balance
    const admin = await User.findOne({ role: "admin" });

    if (admin) {
      await User.findByIdAndUpdate(admin._id, {
        $inc: { commissionBalance: commissionAmount },
      });
    }

    console.log("Payment distributed successfully");
  }

  res.json({ received: true });
});
  
  
