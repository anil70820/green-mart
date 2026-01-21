"use client";

import { setUser } from "@/redux/slice/authSlice";
import api from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (mode === "login") {
        const res = await api.post("/user/login", {
          email: data.email,
          password: data.password,
        });

        localStorage.setItem("token", res.data.token);
        toast.success("Login successful 🎉");
        dispatch(setUser(res.data.user));
        router.push("/");
      } else {
        await api.post("/user/register", data);
        toast.success("Account created successfully");
        setMode("login");
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#f5f7f6] flex items-center justify-center px-4">
        <div className="w-full max-w-150">
          <div className="bg-white rounded-3xl shadow-md p-8 md:p-10 flex flex-col">
            {/* Toggle */}
            <div className="relative mb-6 bg-gray-100 rounded-full p-1">
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
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Full name
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", { required: true })}
                      className="w-full rounded-xl border border-gray-200 ps-4 pe-12 py-2.5 text-sm"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className={`material-symbols-outlined cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 ${showPassword ? "text-red-500" : "text-green-500"}`}
                    >
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </div>
                </div>

                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
                      />
                      <span
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className={`material-symbols-outlined cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 ${showConfirmPassword ? "text-red-500" : "text-green-500"}`}
                      >
                        {showConfirmPassword ? "visibility_off" : "visibility"}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-2.5 rounded-xl shadow-md transition-all"
                >
                  {isSubmitting
                    ? "Please wait..."
                    : mode === "login"
                      ? "Login to your account"
                      : "Create account"}
                </button>
              </form>

              <div className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500 text-center">
                By continuing, you agree to our Terms and Privacy Policy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
