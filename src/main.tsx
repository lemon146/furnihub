import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { CartContextProvider } from "./context/CartContext.js";
import { ShopFilterProvider } from "./context/ShopFilterContext.js";
import { WishListContextProvider } from "./context/WishlistContext.js";
import "./index.css";

createRoot(document.getElementById("root")! as HTMLElement).render(
  <StrictMode>
    <ShopFilterProvider>
      <WishListContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartContextProvider>
      </WishListContextProvider>
    </ShopFilterProvider>
  </StrictMode>,
);
