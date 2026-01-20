"use client";

import api from "@/utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUser } from "./slice/authSlice";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/user/get-me");
        dispatch(setUser(res.data.user));
      } catch (err) {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    };

    fetchMe();
  }, [dispatch]);

  return children;
};

export default AuthLoader;
