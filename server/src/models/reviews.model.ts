import mongoose from "mongoose";

interface ReviewReply {
  user: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Review {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  reply?: ReviewReply;
}

const reviewSchema = new mongoose.Schema<Review>(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },

    reply: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      message: {
        type: String,
        trim: true,
      },
      createdAt: {
        type: Date,
      },
      updatedAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Review = mongoose.model<Review>("Review", reviewSchema);
