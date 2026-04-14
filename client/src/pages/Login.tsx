"use client";

import AuthNavbar from "@/components/layout/AuthNavBar";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import { Login } from "@/types/auth";
import { use, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

export default function login() {
  const { login } = useAuth();
  const { loading } = useLoading();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // if (user) {
  //   return <Navigate to={"/"} />;
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(user);
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
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
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
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#B88E2F]"
            />
          </div>
          {loading ? (
            <button
              type="button"
              className="inline-flex items-center text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary-soft shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-neutral-tertiary animate-spin fill-brand me-2"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-[#B88E2F] text-white py-3 rounded-xl font-semibold hover:bg-[#a17a24] transition-colors"
            >
              Login
            </button>
          )}
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
