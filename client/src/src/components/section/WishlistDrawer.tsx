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
import { useWishListContext } from "@/context/WishlistContext";
import { Trash2 } from "lucide-react";
import { CiHeart } from "react-icons/ci";

export default function WishlistDrawer() {
  const { savedProducts, toggleFavorite } = useWishListContext();
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
        <ScrollArea className="h-75 pr-2">
          <div className="space-y-4">
            {savedProducts.length > 0 ? (
              savedProducts.map((item) => (
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
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="ml-3 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center mt-10">
                <p className="text-lg font-medium">Your wishlist is empty 😢</p>
                <p className="text-sm mt-1">
                  Save items you love to see them here!
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DrawerClose className="mt-4 text-gray-600 hover:underline text-sm mx-auto block">
          Continue Shopping
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}
