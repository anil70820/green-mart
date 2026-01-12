"use client";
import { useRef } from "react";
import { toast } from "react-toastify";

const MAX_IMAGES = 5;

const ImageUploader = ({ images, setImages }) => {
  const inputRef = useRef(null);

  const addImages = (files) => {
    const valid = Array.from(files).filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    );

    if (images.length + valid.length > MAX_IMAGES) {
      toast.warning("Max 5 images allowed");
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
      bg-[#ffffff] dark:bg-[#162b16] sm:px-6 sm:py-10 p-5"
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
        <div className="mt-4 grid xl:grid-cols-5 grid-cols-3 gap-5">
          {images.map((img, i) => (
            <div key={i} className="relative h-16 w-16">
              <img
                src={img.preview}
                className="h-full w-full rounded-md object-contain"
              />
              <button
                onClick={() =>
                  setImages(images.filter((_, index) => index !== i))
                }
                className="absolute text-sm font-semibold -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center"
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
