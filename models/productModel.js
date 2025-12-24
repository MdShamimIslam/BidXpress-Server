import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      title: {
        type: String,
        required: [true, "Please add a title"],
        trim: true,
      },
      slug: {
        type: String,
        unique: true,
      },
      description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
      },
      image: {
        type: Object,
        default: {},
      },
      category: {
        type: String,
        required: [true, "Post category is required"],
        default: "All",
      },
      commission: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        required: [true, "Please add a Price"],
      },
      height: {
        type: Number,
      },
      lengthpic: {
        type: Number,
      },
      width: {
        type: Number,
      },
      mediumused: {
        type: String, 
      },
      weight: {
        type: Number,
      },
      isverify: {
        type: Boolean,
        default: false,
      },
      isSoldout: {
        type: Boolean,
        default: false,
      },
      soldTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          name: String,     
          photo: String,    
          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
          },
          comment: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      rating: {
        type: Number,
        default: 0,
      },
      numReviews: {
        type: Number,
        default: 0,
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending",
      },
      finalBidPrice: {
        type: Number,
      }
    },
    { timestamps: true }
  );

export default mongoose.model("Product", productSchema);