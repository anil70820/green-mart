"use client";

import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "register"

  return (
    <>
      <div className="min-h-screen bg-[#f5f7f6] flex items-center justify-center px-4">
        <div className="w-full max-w-[600px]">
          <div className="bg-white rounded-3xl shadow-md p-8 md:p-10 flex flex-col">
            {/* Toggle */}
            <div className="relative mb-6 bg-gray-100 rounded-full p-1">
              {/* Sliding pill */}
              <div
                className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-green-600 shadow transition-transform duration-300 ease-out ${
                  mode === "login" ? "translate-x-0" : "translate-x-full"
                }`}
              />

              <button
                onClick={() => setMode("login")}
                className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-full transition-colors duration-200 w-1/2 cursor-pointer ${
                  mode === "login" ? "text-white" : "text-gray-600"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setMode("register")}
                className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-full transition-colors duration-200 w-1/2 cursor-pointer ${
                  mode === "register" ? "text-white" : "text-gray-600"
                }`}
              >
                Register
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <form className="space-y-4">
                {mode === "register" && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-gray-600 mb-1"
                    >
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-gray-600 mb-1"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold text-gray-600 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {mode === "register" && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-xs font-semibold text-gray-600 mb-1"
                    >
                      Confirm password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                )}

                {mode === "login" && (
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-gray-600">
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="font-semibold text-green-600 hover:text-green-700"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-2.5 rounded-xl shadow-md transition-all"
                >
                  {mode === "login"
                    ? "Login to your account"
                    : "Create account"}
                </button>
              </form>

              <div className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500 text-center">
                <p>
                  By continuing, you agree to our{" "}
                  <span className="font-semibold text-green-600 cursor-pointer">
                    Terms
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-green-600 cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
