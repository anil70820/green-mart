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
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpUserId, setOtpUserId] = useState(null);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
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
        const res = await api.post("/user/signup", data);

        toast.success(res.data.message || "OTP sent to your email");
        console.log(res);
        setOtpUserId(res.data.user.id);
        setShowOtpModal(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };
  console.log("userId", otpUserId);
  const verifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP.");
      return;
    }
    try {
      setVerifyingOtp(true);
      const res = await api.post("/user/verify-otp", {
        userId: otpUserId,
        otp,
      });
      toast.success(res.data.message || "Email Verified Successfully!");
      setShowOtpModal(false);
      setMode("login");
      setOtp("");
      setOtpUserId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "invalid or expired OTP");
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
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 font-medium mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {mode === "register" && (
                  <div className="w-full">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Your Role
                    </label>
                    <select
                      className="w-full rounded-xl border border-gray-200 focus:outline-none px-4 py-2.5 text-sm"
                      defaultValue=""
                      {...register("role", {
                        required: "Please select a role.",
                      })}
                    >
                      <option value="" disabled>
                        Select role
                      </option>
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                    </select>
                    {errors.role && (
                      <p className="text-xs text-red-500 font-medium mt-1">
                        {errors.role.message}
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 4,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full rounded-xl border border-gray-200 ps-4 pe-12 py-2.5 text-sm"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className={`material-symbols-outlined cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 ${showPassword ? "text-red-500" : "text-green-500"}`}
                    >
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1 font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Confirm password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                        })}
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
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 font-medium mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
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
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 px-4">
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Verify your email
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Enter the 6-digit OTP sent to your email
              </p>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                onClick={verifyOtp}
                // disabled={verifyingOtp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl"
              >
                {verifyingOtp ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={() => setShowOtpModal(false)}
                className="w-full text-xs text-gray-500 mt-3 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
