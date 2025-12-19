import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } 
);

export default mongoose.model("Feedback", FeedbackSchema);
