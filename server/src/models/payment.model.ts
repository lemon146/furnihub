import { Schema, Types, model } from "mongoose";
import { randomUUID } from "node:crypto";

export type PaymentMethod = "cod" | "card" | "easypaisa" | "jazzcash";

export type PaymentProvider =
  | "none"
  | "safepay"
  | "jazzcash"
  | "easypaisa"
  | "other";

export type PaymentStatus =
  | "initiated"
  | "pending"
  | "succeeded"
  | "failed"
  | "cancelled"
  | "partially_refunded"
  | "refunded";

export interface IPayment {
  paymentReference: string;
  orderId: Types.ObjectId;
  userId: Types.ObjectId;

  method: PaymentMethod;
  provider: PaymentProvider;

  providerTransactionId?: string;
  idempotencyKey?: string;

  status: PaymentStatus;

  amountPaisa: number;
  currency: "PKR";

  paidAt?: Date;
  failureCode?: string;
  failureMessage?: string;

  refundedAmountPaisa: number;

  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    paymentReference: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      default: () => `PAY-${randomUUID()}`,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      immutable: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },

    method: {
      type: String,
      enum: ["cod", "card", "easypaisa", "jazzcash"],
      required: true,
      immutable: true,
    },

    provider: {
      type: String,
      enum: ["none", "safepay", "jazzcash", "easypaisa", "other"],
      required: true,
      default: "none",
    },

    providerTransactionId: {
      type: String,
      trim: true,
      default: undefined,
    },

    idempotencyKey: {
      type: String,
      trim: true,
      immutable: true,
      default: undefined,
    },

    status: {
      type: String,
      enum: [
        "initiated",
        "pending",
        "succeeded",
        "failed",
        "cancelled",
        "partially_refunded",
        "refunded",
      ],
      required: true,
      default: "initiated",
    },

    amountPaisa: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
      immutable: true,
    },

    currency: {
      type: String,
      enum: ["PKR"],
      required: true,
      default: "PKR",
      immutable: true,
    },

    paidAt: Date,

    failureCode: {
      type: String,
      maxlength: 100,
    },

    failureMessage: {
      type: String,
      maxlength: 500,
    },

    refundedAmountPaisa: {
      type: Number,
      default: 0,
      min: 0,
      validate: Number.isSafeInteger,
    },
  },
  { timestamps: true },
);

// Provider transaction IDs must be unique when supplied.
paymentSchema.index(
  { provider: 1, providerTransactionId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      providerTransactionId: { $type: "string" },
    },
  },
);

paymentSchema.index(
  { userId: 1, idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      idempotencyKey: { $type: "string" },
    },
  },
);

paymentSchema.index({ orderId: 1, createdAt: -1 });
paymentSchema.index({ status: 1, createdAt: -1 });

const Payment = model<IPayment>("Payment", paymentSchema);

export default Payment;
