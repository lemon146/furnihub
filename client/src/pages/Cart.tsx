import Footers from "@/components/layout/Footers";
import MainLayout from "@/components/layout/MainLayout";
import Nav from "@/components/layout/Nav";
import { useCartContext } from "@/context/CartContext";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/images/shop-banner.png";

const formatUSD = (amount: number) =>
  `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Cart = () => {
  const {
    cartItems,
    incrementProduct,
    decrementProduct,
    subtotal,
    removeFromCart,
  } = useCartContext();
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Nav />
      <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Cart</h2>
          <div className="flex items-center gap-2 text-sm md:text-base text-gray-200">
            <span className="text-gray-300">Home</span>
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
            <span className="text-white font-medium">Cart</span>
          </div>
        </div>

        <img
          src={banner}
          alt="Shop Banner"
          className="w-full h-full object-cover"
        />
      </div>
      {cartItems.length > 0 ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Desktop Header - Outside scroll to stay visible */}
            <div className="hidden bg-[#F9F1E7] lg:grid lg:sticky lg:top-0 z-10 grid-cols-[2fr_1fr_1fr_1.2fr] items-center px-6 py-6 border-b">
              <span>Product</span>
              <span>Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Subtotal</span>
            </div>

            {/* Scrollable Container */}
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white lg:bg-transparent rounded-xl lg:rounded-none shadow-sm lg:shadow-none border lg:border-0 p-4 lg:p-0"
                >
                  {/* Desktop Row */}
                  <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1.2fr] items-center px-6 py-6 border-b">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <span className="font-medium">{item.title}</span>
                    </div>

                    <span className="text-gray-500">
                      {formatUSD(item.price)}
                    </span>

                    <div className="flex justify-center">
                      <div className="flex items-center border rounded-full">
                        <button
                          className="px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => decrementProduct(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="px-4 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-1"
                          onClick={() => incrementProduct(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end items-center gap-4">
                      <span className="font-semibold">
                        {formatUSD(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#B88E2F]"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div className="lg:hidden flex gap-4">
                    <img
                      src={item.image}
                      className="w-24 h-24 rounded-lg object-cover"
                    />

                    <div className="flex-1 space-y-3">
                      <h3 className="font-medium">{item.title}</h3>

                      <p className="text-gray-500 text-sm">
                        {formatUSD(item.price)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-full">
                          <button
                            className="px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => decrementProduct(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="px-4 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-1"
                            onClick={() => incrementProduct(item.id)}
                          >
                            +
                          </button>
                        </div>

                        <button className="text-[#B88E2F]">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <p className="font-semibold text-right">
                        {formatUSD(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Totals */}
          <div className="bg-[#F9F1E7] rounded-xl p-6 sm:p-8 h-fit lg:sticky lg:top-28">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
              Cart Totals
            </h2>

            <div className="flex justify-between text-gray-700 mb-3">
              <span>Subtotal</span>
              <span>{formatUSD(subtotal)}</span>
            </div>

            <div className="flex justify-between font-semibold text-[#B88E2F] text-lg mb-8">
              <span>Total</span>
              <span>{formatUSD(subtotal)}</span>
            </div>

            <button className="w-full border border-[#B88E2F] py-3 rounded-full font-medium hover:bg-[#B88E2F] hover:text-white transition">
              Check Out
            </button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#FCF8F3]">
            <ShoppingCart className="h-10 w-10 text-[#B88E2F]" />
          </div>

          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mb-6 max-w-sm text-sm leading-6 text-gray-500">
            You haven't added any products to your cart yet. Please add a
            product before continuing to checkout.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="rounded-md bg-[#B88E2F] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#9A7626] hover:shadow-md"
          >
            Browse Products
          </button>
        </div>
      )}

      <Footers />
    </MainLayout>
  );
};

export default Cart;
