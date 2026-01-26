import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartContext } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { cartItems, removeFromCart } = useCartContext();
  const navigate = useNavigate();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="relative group flex h-10 w-10 items-center justify-center transition-transform hover:scale-110 cursor-pointer">
          <CiShoppingCart
            size={26}
            className="text-gray-700 group-hover:text-black"
          />
        </button>
      </DrawerTrigger>
      <DrawerContent className="w-full sm:max-w-lg ml-auto rounded-t-2xl p-6">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">Your Cart</DrawerTitle>
          <DrawerDescription>
            Review your items before checkout.
          </DrawerDescription>
        </DrawerHeader>

        {/* Scrollable Cart Items */}
        <ScrollArea className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  {/* Image */}
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 ml-3">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {`${item.quantity} × $${(item.price ?? 0) * item.quantity}`}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-3 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center mt-10">
                <p className="text-lg font-medium">Your cart is empty 🛒</p>
                <p className="text-sm mt-1">
                  Add some products to see them here!
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        {cartItems.length > 0 && (
          <DrawerFooter>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Subtotal:</p>
              <p className="text-lg font-bold">Rs. 520,000</p>
            </div>
            <Button
              onClick={() => navigate("/cart")}
              className="w-full bg-[#B88E2F] hover:bg-[#a17a24] mt-2"
            >
              Checkout
            </Button>

            <DrawerClose className="mt-4 text-gray-600 hover:underline text-sm mx-auto block">
              Continue Shopping
            </DrawerClose>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
