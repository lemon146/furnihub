import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product_detail from "./pages/Product_detail";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import AdminLayout from "./components/admin/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { ProductsPage } from "./pages/admin/pages/Products";
import { ProductViewPage } from "./pages/admin/pages/Product_view";
import { CreateProductPage } from "./pages/admin/pages/CreateProduct";
import { EditProductPage } from "./pages/admin/pages/EditProduct";
import { CategoriesPage } from "./pages/admin/pages/Categories";
import { SettingsPage } from "./pages/admin/pages/Setting";
import { ReviewsPage } from "./pages/admin/pages/Reviews";
import CustomersPage from "./pages/admin/pages/Customer";
import OrdersPage from "./pages/admin/pages/Order";
import AnalyticsPage from "./pages/admin/pages/Analytics";
import MessagesPage from "./pages/admin/pages/Message";
import GlobalLoader from "./components/GlobalLoader";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <GlobalLoader />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<Product_detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="productsviews" element={<ProductViewPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route
            path="/admin/products/create"
            element={<CreateProductPage />}
          />
          <Route
            path="/admin/products/:id/edit"
            element={<EditProductPage />}
          />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
};
export default App;
