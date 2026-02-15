import mongoose from "mongoose";

interface Category {
  title: string;
  image: string;
  createdBy: mongoose.Types.ObjectId;
}

const categorySchema = new mongoose.Schema<Category>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      url: {
        type: String,
        trim: true,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Category = mongoose.model<Category>("Category", categorySchema);
