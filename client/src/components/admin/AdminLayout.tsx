import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { Image, LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Sofa,
  Users,
  ShoppingCart,
  Menu,
  X,
  MessageSquare,
  Mail,
  Tag,
  CreditCard,
  Package,
  BarChart,
  Settings,
} from "lucide-react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },

    // Catalog
    { to: "/admin/products", label: "Products", icon: Sofa },
    { to: "/admin/categories", label: "Categories", icon: Sofa },
    { to: "/admin/inventory", label: "Inventory", icon: Package },

    // Sales
    { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { to: "/admin/payments", label: "Payments", icon: CreditCard },
    { to: "/admin/coupons", label: "Coupons", icon: Tag },

    // Users
    { to: "/admin/customers", label: "Customers", icon: Users },
    { to: "/admin/users", label: "Admins", icon: Users },

    // Content
    { to: "/admin/reviews", label: "Reviews", icon: MessageSquare },
    { to: "/admin/messages", label: "Messages", icon: Mail },
    { to: "/admin/banners", label: "Banners", icon: Image },

    // Insights
    { to: "/admin/analytics", label: "Analytics", icon: BarChart },

    // System
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const navClass = (isActive: boolean) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h1 className="font-bold text-lg">FurniAdmin</h1>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon as LucideIcon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end ?? false}
                className={({ isActive }) => navClass(isActive)}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            );
          })}

          {/* Divider */}
          <div className="border-t my-4" />

          {/* Logout */}
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition">
            <span>🚪</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="md:hidden">
              <Menu size={22} />
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-600">Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-9 h-9 rounded-full border"
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white text-center text-xs py-3 text-gray-500 border-t">
          © {new Date().getFullYear()} FurniAdmin — All rights reserved
        </footer>
      </div>
    </div>
  );
}
