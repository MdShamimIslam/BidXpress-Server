import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import biddingRoute from "./routes/biddingRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import { errorHandler } from "./middlewares/errorMiddleWare.js";
import { stripeWebhook } from "./controllers/paymentCtrl.js";

const app = express();

// Stripe webhook
app.post( "/api/payment/webhook", express.raw({ type: "application/json" }), stripeWebhook );

// Middlewares
app.use((req, res, next) => {
  if (req.originalUrl === "/api/payment/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(
  cors({
    origin: ["https://bidxpress.netlify.app"],
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/bidding", biddingRoute);
app.use("/api/category", categoryRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/payment", paymentRoute);

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error Middleware
app.use(errorHandler);

// Connect to MongoDB
await mongoose.connect(process.env.DATABASE_CLOUD);

app.get("/", (_req, res) => {
  res.send("Bidxpress Server is running");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running");
});