"use client";

import AuthNavbar from "@/components/layout/AuthNavBar";
import { useAuth } from "@/context/AuthContext";
import { RegisterInput, registerSchema } from "@/schema/auth.schema.";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

export default function Register() {
  const { userRegister, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    await userRegister(data);
  };

  if (user) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/"} />;
  }

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
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-semibold text-[#3A3A3A] mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#B88E2F]"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3A3A3A] mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#B88E2F]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#3A3A3A] mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#B88E2F]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#B88E2F] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#a17a24] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
          >
            {isSubmitting ? (
              <>
                <span>Registering...</span>
              </>
            ) : (
              "Register"
            )}
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
