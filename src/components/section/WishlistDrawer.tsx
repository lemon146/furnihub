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
import { CiHeart } from "react-icons/ci";

export default function WishlistDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="relative group flex h-10 w-10 items-center justify-center transition-transform hover:scale-110">
          <CiHeart
            size={26}
            strokeWidth={1}
            className="text-gray-700 group-hover:text-black"
          />
        </button>
      </DrawerTrigger>

      {/* Drawer Content */}
      <DrawerContent className="w-full sm:max-w-100 ml-auto rounded-t-2xl p-6">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">Wishlist</DrawerTitle>
          <DrawerDescription>Save items you love ❤️</DrawerDescription>
        </DrawerHeader>

        {/* Wishlist products */}
        <ScrollArea className="h-[300px] pr-2">
          <div className="space-y-4">
            {/* Wishlist Item Example */}
            <div className="flex items-center justify-between border p-3 rounded-md">
              <p>Product Name</p>
              <Button size="sm" variant="secondary">
                Add to Cart
              </Button>
            </div>
          </div>
        </ScrollArea>

        <DrawerClose className="mt-4 text-gray-600 hover:underline text-sm mx-auto block">
          Continue Shopping
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
