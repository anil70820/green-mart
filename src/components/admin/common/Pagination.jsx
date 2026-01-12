"use client";
import React from "react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-[#e5e7eb] flex-wrap gap-5">
      {/* INFO */}
      <p className="text-sm text-[#6b7280]">
        Showing Data 
        <span className="font-medium text-[#111827]"> {startItem}</span> to{" "}
        <span className="font-medium text-[#111827]">{endItem}</span> of{" "}
        <span className="font-medium text-[#111827]">{totalItems}</span>
      </p>

      {/* BUTTONS */}
      <div className="flex items-center gap-2">
        {/* PREV */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="min-w-10 min-h-10 flex items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6b7280] hover:bg-gray-50 hover:text-[#111827] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {/* PAGE NUMBERS */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-10 min-h-10 flex items-center justify-center rounded-lg border text-sm transition-colors
                ${
                  currentPage === page
                    ? "bg-green-600 text-white border-green-600"
                    : "border-[#e5e7eb] text-[#6b7280] hover:bg-gray-50 hover:text-[#111827]"
                }`}
            >
              {page}
            </button>
          );
        })}

        {/* NEXT */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="min-w-10 min-h-10 flex items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6b7280] hover:bg-gray-50 hover:text-[#111827] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
