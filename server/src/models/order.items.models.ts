import { Schema, Types, model } from "mongoose";

export interface IOrderItem {
  orderId: Types.ObjectId;
  productId: Types.ObjectId;

  productName: string;
  sku?: string;
  imageUrl?: string;

  unitPricePaisa: number;
  quantity: number;
  lineTotalPaisa: number;

  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      immutable: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      immutable: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      immutable: true,
    },

    sku: {
      type: String,
      default: "",
      immutable: true,
    },

    imageUrl: {
      type: String,
      default: "",
      immutable: true,
    },

    unitPricePaisa: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
      immutable: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isSafeInteger,
        message: "Quantity must be a positive integer",
      },
      immutable: true,
    },

    lineTotalPaisa: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
      immutable: true,
    },
  },
  { timestamps: true },
);

orderItemSchema.index({ orderId: 1 });
orderItemSchema.index({ productId: 1 });

const OrderItem = model<IOrderItem>("OrderItem", orderItemSchema);

export default OrderItem;
