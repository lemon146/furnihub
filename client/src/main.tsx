import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import "./index.css" assert { type: "css" };
import { AuthContextProvider } from "./context/AuthContext.js";
import { CartContextProvider } from "./context/CartContext.js";
import { ShopFilterProvider } from "./context/ShopFilterContext.js";
import { WishListContextProvider } from "./context/WishlistContext.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingProvider } from "./context/LoadingContext.js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")! as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoadingProvider>
          <AuthContextProvider>
            <ShopFilterProvider>
              <WishListContextProvider>
                <CartContextProvider>
                  <App />
                </CartContextProvider>
              </WishListContextProvider>
            </ShopFilterProvider>
          </AuthContextProvider>
        </LoadingProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
