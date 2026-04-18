"use client";

import AuthNavbar from "@/components/layout/AuthNavBar";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import { Login } from "@/types/auth";
import { use, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

export default function login() {
  const { login, user } = useAuth();
  const [formUser, formSetUser] = useState({
    email: "",
    password: "",
  });
  if (user) {
    return <Navigate to={"/"} />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(formUser);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 pt-24 flex items-center justify-center">
      <AuthNavbar />
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#333]">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Login to continue shopping</p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-[#3A3A3A] mb-1">
              Email
            </label>
            <input
              type="email"
              value={formUser.email}
              onChange={(e) =>
                formSetUser({ ...formUser, email: e.target.value })
              }
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3A3A3A] mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={formUser.password}
              onChange={(e) =>
                formSetUser({ ...formUser, password: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#B88E2F]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#B88E2F] text-white py-3 rounded-xl font-semibold hover:bg-[#a17a24] transition-colors"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#B88E2F] hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
