import mongoose, { Schema, model } from "mongoose";
import { randomUUID } from "node:crypto";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderPaymentMethod = "cod" | "card" | "easypaisa" | "jazzcash";

export type OrderPaymentStatus =
  | "unpaid"
  | "pending"
  | "paid"
  | "failed"
  | "partially_refunded"
  | "refunded";

export interface IShippingAddress {
  recipientName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode?: string;
  country: string;
}

export interface IOrder {
  orderNumber: string;
  userId: mongoose.Types.ObjectId;

  status: OrderStatus;
  paymentMethod: OrderPaymentMethod;
  paymentStatus: OrderPaymentStatus;

  currency: "PKR";

  subtotalPaisa: number;
  discountPaisa: number;
  shippingPaisa: number;
  taxPaisa: number;
  totalPaisa: number;

  shippingAddress: IShippingAddress;
  customerNote?: string;

  confirmedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const shippingAddressSchema = new Schema<IShippingAddress>(
  {
    recipientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    addressLine1: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    addressLine2: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    province: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    postalCode: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      required: true,
      default: "Pakistan",
      immutable: true,
    },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      default: () =>
        `ORD-${randomUUID().replace(/-/g, "").slice(0, 16).toUpperCase()}`,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "card", "easypaisa", "jazzcash"],
      required: true,
      immutable: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "unpaid",
        "pending",
        "paid",
        "failed",
        "partially_refunded",
        "refunded",
      ],
      required: true,
      default: "unpaid",
    },

    currency: {
      type: String,
      enum: ["PKR"],
      default: "PKR",
      required: true,
      immutable: true,
    },

    subtotalPaisa: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
    },
    discountPaisa: {
      type: Number,
      default: 0,
      min: 0,
      validate: Number.isSafeInteger,
    },
    shippingPaisa: {
      type: Number,
      default: 0,
      min: 0,
      validate: Number.isSafeInteger,
    },
    taxPaisa: {
      type: Number,
      default: 0,
      min: 0,
      validate: Number.isSafeInteger,
    },
    totalPaisa: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
    },

    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    customerNote: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    confirmedAt: Date,
    shippedAt: Date,
    deliveredAt: Date,
    cancelledAt: Date,
  },
  { timestamps: true },
);

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ paymentStatus: 1, createdAt: -1 });

const Order = model<IOrder>("Order", orderSchema);

export default Order;
