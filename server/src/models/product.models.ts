import mongoose from "mongoose";

interface Product {
  title: string;
  description: string;
  short_desc: string;
  images: [
    {
      url: string;
      publicId: string;
    },
  ];
  category: mongoose.Types.ObjectId;
  additionalInfo: {
    material: string;
    color: string;
    weight: number;
    dimension: string;
  };
  averageRating: number;
  numReviews: number;
  originalPrice: number;
  price: number;
  stock: number;
  createdBy: mongoose.Types.ObjectId;
}

const productSchema = new mongoose.Schema<Product>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    short_desc: {
      type: String,
      trim: true,
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    additionalInfo: {
      material: { type: String, required: true },
      color: { type: String, required: true },
      weight: { type: Number, required: true },
      dimension: { type: String, required: true },
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (this: any, value: number) {
          return value >= this.price;
        },
        message: "Original price must be greater than or equal to price",
      },
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

// indexes
productSchema.index({ title: "text" });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

export const Product = mongoose.model<Product>("Product", productSchema);
