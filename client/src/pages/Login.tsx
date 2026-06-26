import AuthNavbar from "@/components/layout/AuthNavBar";
import { useAuth } from "@/context/AuthContext";
import { LoginInput, loginSchema } from "@/schema/auth.schema.";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    await login(data);
  };

  if (user) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/"} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 pt-24 flex items-center justify-center">
      <AuthNavbar />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#333]">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Login to continue shopping</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
              {...register("password")}
              placeholder="••••••••"
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
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

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
