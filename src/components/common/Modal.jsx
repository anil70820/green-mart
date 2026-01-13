"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, onClose, children, width = "max-w-md" }) => {
   const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // ESC close
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!mounted ||!open) return null;

  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center `}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className={`relative w-full ${width} mx-4 rounded-2xl duration-300
        bg-white dark:bg-[#162b16]
        shadow-xl ring-1 ring-black/10 dark:ring-white/10 `}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
