import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CiShoppingCart } from "react-icons/ci";

export default function CartDrawer() {
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

      <DrawerContent className="w-full sm:max-w-100 ml-auto rounded-t-2xl p-6">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">Your Cart</DrawerTitle>
          <DrawerDescription>
            Review your items before checkout.
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-75 pr-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between border p-3 rounded-md">
              <p>Product Name</p>
              <p>$49</p>
            </div>
          </div>
        </ScrollArea>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-semibold">Subtotal:</p>
          <p className="text-lg font-bold">$49</p>
        </div>

        <div className="mt-6 flex">
          <Button className="w-full bg-[#B88E2F] hover:bg-[#a17a24]">
            Checkout
          </Button>
        </div>

        <DrawerClose className="mt-4 text-gray-600 hover:underline text-sm mx-auto block">
          Continue Shopping
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
