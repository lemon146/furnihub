import React from "react";
import { MapPinOff, Home, Search } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0f1115] px-6 py-24 sm:py-32 lg:px-8 font-sans">
      <div className="text-center">
        {/* Abstract Gold Icon Container */}
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-amber-500/10 p-4 ring-1 ring-amber-500/20">
            <MapPinOff className="h-12 w-12 text-amber-500" />
          </div>
        </div>

        {/* Gold Accents & Typography */}
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-500/80">
          Error 404
        </p>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Page Not Found
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-400 max-w-lg mx-auto">
          The page you are looking for has been moved, deleted, or perhaps never
          existed. Let’s get you back to where you belong.
        </p>

        {/* Premium Gold Gradient Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-400 px-8 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-transform duration-200"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </a>
        </div>

        {/* Footer Link */}
        <p className="mt-12 text-sm text-gray-500">
          Need help?{" "}
          <a
            href="/support"
            className="text-amber-500/70 hover:text-amber-500 underline underline-offset-4"
          >
            Contact Support
          </a>
        </p>
      </div>
    </main>
  );
};

export default NotFound;
