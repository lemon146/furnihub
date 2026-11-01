"use client";

import MainLayout from "@/components/layout/MainLayout";
import { useCartContext } from "@/context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/images/shop-banner.png";

type PaymentMethod = "cod" | "card" | "easypaisa" | "jazzcash";

const formatPKR = (amount: number) =>
  `Rs. ${amount.toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Checkout = () => {
  const { cartItems, subtotal } = useCartContext();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    customerNote: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    const checkoutData = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      shippingAddress: {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        province: form.province,
        postalCode: form.postalCode,
      },
      paymentMethod,
      customerNote: form.customerNote,
    };

    // TODO: Connect this data to your backend order API.
    console.log("Checkout data:", checkoutData);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-[#B88E2F] focus:ring-1 focus:ring-[#B88E2F] transition";

  if (!cartItems.length) {
    return (
      <MainLayout>
        <div className="relative w-full h-70 md:h-95 overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              Checkout
            </h2>
            <p className="text-gray-200">Your shopping cart is empty.</p>
          </div>

          <img
            src={banner}
            alt="Checkout Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="py-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            No products in your cart
          </h2>
          <button
            onClick={() => navigate("/shop")}
            className="mt-6 bg-[#B88E2F] text-white px-8 py-3 rounded-md hover:bg-[#9d7625] transition"
          >
            Browse Products
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Page Banner */}
      <div className="relative w-full h-70 md:h-95 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Checkout</h2>

          <div className="flex items-center gap-2 text-sm md:text-base text-gray-200">
            <span>Home</span>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 5 7 7-7 7"
              />
            </svg>
            <span className="text-white font-medium">Checkout</span>
          </div>
        </div>

        <img
          src={banner}
          alt="Checkout Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Checkout Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Customer Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-7">
                  Billing & Shipping Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="03XXXXXXXXX"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House number, street, area..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      required
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="e.g. Karachi"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Province *
                    </label>
                    <select
                      required
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select Province</option>
                      <option value="Sindh">Sindh</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Khyber Pakhtunkhwa">
                        Khyber Pakhtunkhwa
                      </option>
                      <option value="Balochistan">Balochistan</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                      <option value="Azad Kashmir">Azad Kashmir</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Postal Code
                    </label>
                    <input
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  {(
                    [
                      [
                        "cod",
                        "Cash on Delivery",
                        "Pay when your order arrives.",
                      ],
                      ["card", "Credit / Debit Card", "Pay securely online."],
                      [
                        "easypaisa",
                        "Easypaisa",
                        "Pay using your Easypaisa account.",
                      ],
                      [
                        "jazzcash",
                        "JazzCash",
                        "Pay using your JazzCash account.",
                      ],
                    ] as const
                  ).map(([value, title, description]) => (
                    <label
                      key={value}
                      className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition ${
                        paymentMethod === value
                          ? "border-[#B88E2F] bg-[#F9F1E7]"
                          : "border-gray-200 hover:border-[#B88E2F]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={value}
                        checked={paymentMethod === value}
                        onChange={() => setPaymentMethod(value)}
                        className="mt-1 accent-[#B88E2F]"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{title}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Online payments will be available once the payment gateway is
                  integrated.
                </p>
              </div>

              {/* Order Notes */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                  Additional Information
                </h2>

                <label className="block text-sm font-medium mb-2">
                  Order Notes (Optional)
                </label>

                <textarea
                  rows={3}
                  name="customerNote"
                  value={form.customerNote}
                  onChange={handleChange}
                  placeholder="Any special instructions for delivery?"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="h-fit bg-[#F9F1E7] rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Your Order
              </h2>

              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-medium text-gray-800 whitespace-nowrap">
                      {formatPKR(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 my-6" />

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPKR(subtotal)}</span>
              </div>

              <div className="flex justify-between text-gray-600 mt-4">
                <span>Shipping</span>
                <span>Calculated later</span>
              </div>

              <div className="border-t border-gray-300 my-6" />

              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="text-xl font-bold text-[#B88E2F]">
                  {formatPKR(subtotal)}
                </span>
              </div>

              {error && <p className="text-sm text-red-600 mt-5">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#B88E2F] text-white font-medium py-4 rounded-lg mt-7 hover:bg-[#9d7625] transition"
              >
                Place Order
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="w-full text-gray-600 mt-5 hover:text-[#B88E2F] transition"
              >
                ← Return to Cart
              </button>
            </div>
          </div>
        </form>
      </section>
    </MainLayout>
  );
};

export default Checkout;
