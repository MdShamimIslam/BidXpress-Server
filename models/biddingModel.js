
import mongoose from "mongoose";


const BiddingProductSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      price: {
        type: Number,
        required: [true, "Please add a Price"]
      },
    },
    { timestamps: true }
  );
  export default mongoose.model("BiddingProduct", BiddingProductSchema);


