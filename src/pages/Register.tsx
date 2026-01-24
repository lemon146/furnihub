"use client";

import AuthNavbar from "@/components/layout/AuthNavBar";
import { useAuth } from "@/context/AuthContext";
import { RegisterFormType } from "@/types/auth";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function Register() {
  const { register, user } = useAuth();
  const [formData, setFormData] = useState<RegisterFormType>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
  };
  if (user) return <Navigate to={"/"} />;
  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 pt-24 flex items-center justify-center">
      <AuthNavbar />
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#333]">Create Account</h1>
          <p className="text-gray-500 mt-2">
            Join Furniro for a better experience
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-[#3A3A3A] mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              name="name"
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#B88E2F]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3A3A3A] mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
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
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#B88E2F]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#B88E2F] text-white py-3 rounded-xl font-semibold hover:bg-[#a17a24] transition-colors"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#B88E2F] hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
