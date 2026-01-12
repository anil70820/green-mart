import React from "react";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-[#111811] dark:text-[#e8f5e8]">
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={6}
          placeholder={placeholder}
          className="w-full resize-none rounded-xl border-none bg-[#f0f4f0] dark:bg-[#1c331c] p-4 text-sm font-medium text-[#111811] dark:text-[#e8f5e8] placeholder:text-[#637563] dark:placeholder:text-[#a0b2a0] focus:ring-2 focus:ring-[#13ec13]/50 transition-all"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl bg-[#f0f4f0] dark:bg-[#1c331c] px-4 text-sm text-[#111811] dark:text-[#e8f5e8]"
        />
      )}
    </div>
  );
};

export default InputField;
