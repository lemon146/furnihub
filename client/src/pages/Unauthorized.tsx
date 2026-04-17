import { ShieldAlert, ArrowLeft, ShoppingBag, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const role = user?.role;

  const getContent = () => {
    if (!user) {
      return {
        title: "Login Required",
        desc: "You need to sign in to access this page.",
        iconColor: "text-amber-500",
        badge: "Authentication Required",
      };
    }

    if (role === "USER") {
      return {
        title: "Admin Access Only",
        desc: "This area is restricted to administrators.",
        iconColor: "text-red-500",
        badge: "Access Denied",
      };
    }

    if (role === "ADMIN") {
      return {
        title: "Permission Restricted",
        desc: "You don't have permission to view this section.",
        iconColor: "text-purple-500",
        badge: "Restricted Access",
      };
    }

    return {
      title: "Unauthorized",
      desc: "You cannot access this page.",
      iconColor: "text-gray-400",
      badge: "Blocked",
    };
  };

  const content = getContent();

  return (
    <main className="grid min-h-screen place-items-center bg-[#0f1115] px-6 py-24 font-sans">
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-white/5 p-5 ring-1 ring-white/10">
            <ShieldAlert
              className={`h-12 w-12 animate-pulse ${content.iconColor}`}
            />
          </div>
        </div>

        {/* Badge */}
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-gray-400">
          {content.badge}
        </p>

        {/* Title */}
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-6xl">
          {content.title}
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg leading-8 text-gray-400 max-w-xl mx-auto">
          {content.desc}
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-2 w-full sm:w-auto rounded-full bg-amber-500 px-10 py-3.5 text-sm font-bold text-black hover:scale-105 transition"
            >
              <User className="h-4 w-4" />
              Login
            </Link>
          ) : (
            <Link
              to="/shop"
              className="flex items-center gap-2 w-full sm:w-auto rounded-full border border-gray-700 px-10 py-3.5 text-sm text-gray-300 hover:bg-gray-800"
            >
              <ShoppingBag className="h-4 w-4" />
              Go Shopping
            </Link>
          )}
        </div>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mt-10 flex items-center justify-center gap-2 w-full text-xs text-gray-500 hover:text-white uppercase tracking-widest"
        >
          <ArrowLeft className="h-3 w-3" /> Go Back
        </button>
      </div>
    </main>
  );
};

export default Unauthorized;
