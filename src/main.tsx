import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { AuthContextProvider } from "./context/AuthContext.js";
import { CartContextProvider } from "./context/CartContext.js";
import { ShopFilterProvider } from "./context/ShopFilterContext.js";
import { WishListContextProvider } from "./context/WishlistContext.js";
import "./index.css";

createRoot(document.getElementById("root")! as HTMLElement).render(
  <StrictMode>
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
  </StrictMode>,
);
