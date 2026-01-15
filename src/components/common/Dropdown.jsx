"use client";
import { useEffect, useRef, useState } from "react";

const GAP = 8;

const Dropdown = ({ trigger, children }) => {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState({});
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Position calculation
  const calculatePosition = () => {
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Default → bottom
    let top = triggerRect.bottom + GAP;
    let left = triggerRect.left;

    // 🔼 Flip to top if no space bottom
    if (top + dropdownRect.height > viewportHeight) {
      top = triggerRect.top - dropdownRect.height - GAP;
    }

    // 👉 Shift left/right if overflow
    if (left + dropdownRect.width > viewportWidth) {
      left = viewportWidth - dropdownRect.width - GAP;
    }

    if (left < GAP) {
      left = GAP;
    }

    setStyle({
      position: "fixed",
      top,
      left,
      minWidth: triggerRect.width,
    });
  };

  const toggleDropdown = () => {
    setOpen((p) => !p);
  };

  // Recalculate after render
  useEffect(() => {
    if (open) {
      requestAnimationFrame(calculatePosition);
      window.addEventListener("resize", calculatePosition);
      window.addEventListener("scroll", calculatePosition, true);
    }

    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition, true);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="inline-block">
      {/* Trigger */}
      <div ref={triggerRef} onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
           onClick={(e) => e.stopPropagation()}
          style={style}
          className="z-50 rounded-xl bg-white dark:bg-[#162b16]
          shadow-lg ring-1 ring-black/10 dark:ring-white/10 flex flex-col overflow-hidden"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
