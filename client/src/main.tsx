import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { AuthContextProvider } from "./context/AuthContext.js";
import { CartContextProvider } from "./context/CartContext.js";
import { ShopFilterProvider } from "./context/ShopFilterContext.js";
import { WishListContextProvider } from "./context/WishlistContext.js";
import "./index.css" assert { type: "css" };

const queryClient = new QueryClient();

createRoot(document.getElementById("root")! as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <ShopFilterProvider>
            <WishListContextProvider>
              <CartContextProvider>
                <App />
              </CartContextProvider>
            </WishListContextProvider>
          </ShopFilterProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
