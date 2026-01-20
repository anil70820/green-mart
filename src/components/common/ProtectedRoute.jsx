"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const hasShownToast = useRef(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && !hasShownToast.current) {
      hasShownToast.current = true;
      toast.warn("Please login to continue");
      router.replace("/auth");
    }
  }, [router]);

  return children;
}
