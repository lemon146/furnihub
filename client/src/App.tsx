import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import GlobalLoader from "./components/GlobalLoader";
import ScrollToTop from "./components/layout/ScrollToTop";
import About from "./pages/About";
import { Dashboard } from "./pages/admin/Dashboard";
import AnalyticsPage from "./pages/admin/pages/Analytics";
import { CategoriesPage } from "./pages/admin/pages/Categories";
import { CreateProductPage } from "./pages/admin/pages/CreateProduct";
import CustomersPage from "./pages/admin/pages/Customer";
import { EditProductPage } from "./pages/admin/pages/EditProduct";
import MessagesPage from "./pages/admin/pages/Message";
import OrdersPage from "./pages/admin/pages/Order";
import { ProductViewPage } from "./pages/admin/pages/Product_view";
import { ProductsPage } from "./pages/admin/pages/Products";
import { ReviewsPage } from "./pages/admin/pages/Reviews";
import { SettingsPage } from "./pages/admin/pages/Setting";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Product_detail from "./pages/Product_detail";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

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
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />

        {/* protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Admin Routes */}
          <Route element={<RoleRoute allowedRole={["ADMIN"]} />}>
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
              <Route
                path="/admin/products/:id/view"
                element={<ProductViewPage />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};
export default App;
