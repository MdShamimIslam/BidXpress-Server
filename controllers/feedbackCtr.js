import asyncHandler from "express-async-handler";
import Feedback from "../models/feedbackModel.js";

// Create Feedback
export const createFeedback = asyncHandler(async (req, res) => {
  const { name, position, quote, image } = req.body;

  if (!name || !position || !quote) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const feedback = await Feedback.create({
    name,
    position,
    quote,
    image
  });

  res.status(201).json(feedback);
});

// get feedbacks
export const getFeedbacks = asyncHandler(async (_req, res) => {
  const feedbacks = await Feedback.find({});

  res.status(200).json(feedbacks);
})
