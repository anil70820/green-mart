// app/(user)/layout.jsx
"use client";

import UserLayout from "@/components/user/UserLayout";
import { logout, setUser } from "@/redux/slice/authSlice";
import api from "@/utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UserLayoutHome({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/user/get-me");
        dispatch(setUser(res.data.user));
      } catch {
        dispatch(logout());
      }
    };

    fetchMe();
  }, []);

  return (
    <>
      <UserLayout>{children}</UserLayout>
    </>
  );
}
