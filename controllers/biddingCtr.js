import asyncHandler from "express-async-handler";
import BiddingProduct from "../models/biddingModel.js";
import Product from "../models/productModel.js";
import { sendEmail } from "../utils/sendEmail.js";

// place bid
export const placeBid = asyncHandler(async (req, res) => {
  const { productId, price } = req.body || {};
  const userId = req.user.id;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  if (product.user.toString() === userId) {
    res.status(400);
    throw new Error("You cannot bid on your own product");
  }

  if (!product.isverify) {
    res.status(400);
    throw new Error("Bidding is not verified for these product.");
  }

  if (["pending"].includes(product.saleStatus)) {
    return res.status(400).json({
      message: "The seller has already selected a winning bid. You cannot place a bid now.",
    });
  }

  if (product.isSoldout) {
    res.status(400);
    throw new Error("Invalid product or bidding is closed");
  }

  const existingUserBid = await BiddingProduct.findOne({
    user: userId,
    product: productId,
  });

  if (existingUserBid) {
    if (price <= existingUserBid.price) {
      res.status(400);
      throw new Error("Your bid must be higher than your previous bid");
    }
    existingUserBid.price = price;
    await existingUserBid.save();
    res.status(200).json(existingUserBid);
  } else {
    const highestBidProduct = await BiddingProduct.findOne({
      product: productId,
    }).sort({ price: -1 });

    if (highestBidProduct && price <= highestBidProduct.price) {
      res.status(400);
      throw new Error("Your bid must be higher than the current highest bid");
    }

    const biddingProduct = await BiddingProduct.create({
      user: userId,
      product: productId,
      price,
    });

    res.status(201).json(biddingProduct);
  }
});

// get bidding history
export const getBiddingHistory = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const biddingHistory = await BiddingProduct.find({ product: productId })
    .sort("-createdAt")
    .populate("user")
    .populate("product");

  res.status(200).json(biddingHistory);
});

export const sellProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const sellerId = req.user.id;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.user.toString() !== sellerId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (["pending", "completed"].includes(product.saleStatus)) {
    return res.status(400).json({
      message: "Product already in selling or sold state",
    });
  }

  const highestBid = await BiddingProduct.findOne({ product: productId }).sort({ price: -1 }).populate("user");

  if (!highestBid) {
    return res.status(400).json({ message: "No bids found" });
  }

  product.saleStatus = "pending";
  product.winningBid = highestBid.price;
  product.soldTo = highestBid.user._id;

  await product.save();

  console.log(highestBid.user.email);

  await sendEmail({
    email: highestBid.user.email,
    subject: "🎉 You won the auction!",
    text: `
            Hi ${highestBid.user.name || ""},

            You won the auction for "${product.title}"
            Winning bid: $${highestBid.price}

            Please complete payment to confirm your purchase.

            Thank you,
            Bidly Team
          `,
  });

  res.json({ message: "Winner selected & notified successfully" });
});

