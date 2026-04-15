import mongoose from "mongoose";

interface Category {
  title: string;
  image: {
    url: string;
    public_id: string;
  };
  createdBy?: mongoose.Types.ObjectId;
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
        required: true,
        trim: true,
      },
      public_id: {
        type: String,
        required: true,
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
