"use client";
import { useRef } from "react";

const MAX_IMAGES = 5;

const ImageUploader = ({ images, setImages }) => {
  const inputRef = useRef(null);

  const addImages = (files) => {
    const valid = Array.from(files).filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    );

    if (images.length + valid.length > MAX_IMAGES) {
      alert("Max 5 images allowed");
      return;
    }

    setImages((prev) => [
      ...prev,
      ...valid.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        addImages(e.dataTransfer.files);
      }}
      className="flex flex-col items-center justify-center gap-4 rounded-2xl
      border-2 border-dashed border-[#dbe6db] dark:border-[#2a402a]
      bg-[#ffffff] dark:bg-[#162b16] px-6 py-10"
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={(e) => addImages(e.target.files)}
      />

      <span className="material-symbols-outlined text-[#13ec13] text-3xl">
        add_photo_alternate
      </span>

      <p className="text-sm font-bold text-[#111811] dark:text-[#e8f5e8]">
        Upload Photos ({images.length}/5)
      </p>

      <button
        onClick={() => inputRef.current.click()}
        className="rounded-xl bg-[#13ec13] px-4 py-2 text-sm font-bold text-[#052e05]"
      >
        Select Files
      </button>

      {/* Preview */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <div key={i} className="relative h-16 w-16">
              <img
                src={img.preview}
                className="h-full w-full rounded-md object-cover"
              />
              <button
                onClick={() =>
                  setImages(images.filter((_, index) => index !== i))
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
