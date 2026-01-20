"use client";
import { useEffect } from "react";
import clsx from "clsx";

const POSITION_CLASSES = {
  right: "-right-full top-0",
  left: "-left-full top-0",
  top: "-top-full left-0",
  bottom: "-bottom-full left-0",
};

const OPEN_TRANSFORM = {
  right: "right-0",
  left: "left-0",
  top: "top-0",
  bottom: "bottom-0",
};

export default function Sidebar({
  isOpen,
  onClose,
  title = "Sidebar",
  position = "right",
  children,
  header = true,
}) {
  // Body scroll lock
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-99 bg-black/40 backdrop-blur-sm transition-all duration-300",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed z-99 bg-white shadow-xl transition-all duration-300 h-full max-w-100 w-full flex flex-col scrollbar_hidden",
          POSITION_CLASSES[position],
          isOpen && OPEN_TRANSFORM[position],
        )}
      >
        {/* Header (fixed) */}
        {header === true && (
          <div className="h-14 p-4 flex items-center justify-between border-b border-b-gray-200 bg-white shrink-0">
            <h2 className="text-lg font-semibold text-[#111811]">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-full
        text-[#111811] hover:text-green-600 duration-300 cursor-pointer lg:hidden"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        )}

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto py-4">{children}</div>
      </div>
    </>
  );
}
