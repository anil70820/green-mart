"use client";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    description: "",
    rating: 0,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    if (formData.rating === 0) {
      newErrors.rating = "Rating is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const worksheetData = [
      {
        Name: formData.name,
        Company: formData.company,
        Description: formData.description || "—",
        Rating: formData.rating,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Profile");

    XLSX.writeFile(workbook, "profile-data.xlsx");

    setFormData({
      name: "",
      company: "",
      description: "",
      rating: 0,
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Professional Profile
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Update your company details
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Your Name *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg ring px-4 py-3 focus:ring-2 focus:ring-teal-400 outline-none"
              placeholder="Alex Johnson"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Company Name *
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full rounded-lg ring px-4 py-3 focus:ring-2 focus:ring-teal-400 outline-none"
              placeholder="Acme Corp"
            />
            {errors.company && (
              <p className="text-red-500 text-xs mt-1">{errors.company}</p>
            )}
          </div>

          {/* Description (Optional) */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full min-h-[120px] rounded-lg ring px-4 py-3 focus:ring-2 focus:ring-teal-400 outline-none resize-none"
              placeholder="Brief description..."
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-3xl ${
                    star <= formData.rating
                      ? "text-teal-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition"
          >
            Submit & Download Excel
          </button>
        </form>
      </div>
    </div>
  );
}
