"use client";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import api from "@/utils/axios";
import InputField from "@/components/common/InputField";
import { toast } from "react-toastify";

const AddNewProduct = () => {
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    categoryName: "Fruits",
    price: "",
    discountPrice: "",
    weight: "",
    stock: "",
    rating: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    const {
      title,
      categoryName,
      price,
      discountPrice,
      weight,
      stock,
      rating,
      description,
    } = product;

    if (
      !title ||
      !categoryName ||
      !price ||
      !discountPrice ||
      !weight ||
      !stock ||
      !rating ||
      !description ||
      images.length === 0
    ) {
      toast.error("All fields and at least 3 image are required!");
      return;
    }

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) =>
      formData.append(key, value)
    );
    images.forEach((img) => formData.append("image", img.file));

    try {
      setLoading(true);
      const { data } = await api.post("/seller/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(data.message);
      // Reset form
      setProduct({
        title: "",
        categoryName: "Fruits",
        price: "",
        discountPrice: "",
        weight: "",
        stock: "",
        rating: "",
        description: "",
      });
      setImages([]);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 bg-[#f6f8f6] dark:bg-[#102210] min-h-[calc(100vh-73px)]">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Images */}
        <section className="rounded-2xl bg-[#ffffff] dark:bg-[#162b16] p-5">
          <h2 className="text-lg font-bold text-[#111811] dark:text-[#e8f5e8] mb-4">
            Product Images
          </h2>
          <ImageUploader images={images} setImages={setImages} />
        </section>

        {/* Basic Details */}
        <section className="rounded-2xl bg-[#ffffff] dark:bg-[#162b16] p-5 space-y-4">
          <h2 className="text-lg font-bold text-[#111811] dark:text-[#e8f5e8]">
            Basic Details
          </h2>
          <InputField
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Product Name"
          />
          <div className="h-12 w-full">
            <select
              name="categoryName"
              value={product.categoryName}
              onChange={handleChange}
              className="h-12 w-full rounded-xl bg-[#f0f4f0] dark:bg-[#1c331c] px-4"
            >
              <option>Fruits</option>
              <option>Vegetables</option>
            </select>
          </div>
          <InputField
            name="rating"
            value={product.rating}
            onChange={handleChange}
            type="number"
            placeholder="Rating (0-5)"
          />
        </section>

        {/* Pricing & Stock */}
        <section className="rounded-2xl bg-[#ffffff] dark:bg-[#162b16] p-5 space-y-4">
          <h2 className="text-lg font-bold text-[#111811] dark:text-[#e8f5e8]">
            Pricing & Stock
          </h2>
          <InputField
            name="price"
            value={product.price}
            onChange={handleChange}
            type="number"
            placeholder="Price"
          />
          <InputField
            name="discountPrice"
            value={product.discountPrice}
            onChange={handleChange}
            type="number"
            placeholder="Discount Price"
          />
          <InputField
            name="weight"
            value={product.weight}
            onChange={handleChange}
            type="number"
            placeholder="Weight (kg / gm)"
          />
          <InputField
            name="stock"
            value={product.stock}
            onChange={handleChange}
            type="number"
            placeholder="Stock Quantity"
          />
        </section>

        {/* Description */}
        <section className="flex flex-col gap-4 rounded-2xl bg-[#ffffff] dark:bg-[#162b16] p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
          <h2 className="text-lg font-bold text-[#111811] dark:text-[#e8f5e8]">
            Description
          </h2>
          <InputField
            name="description"
            value={product.description}
            onChange={handleChange}
            type="textarea"
            placeholder="Describe your product..."
          />
        </section>

        {/* Buttons */}
        <section className="rounded-2xl bg-[#ffffff] dark:bg-[#162b16] p-5 grid grid-cols-2 gap-4 sm:min-h-50 min-h-20">
          <button
            className="rounded-xl border border-black/10 dark:border-white/10 py-3 h-12 cursor-pointer"
            onClick={() => alert("Draft feature not implemented yet")}
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={loading}
            className="rounded-xl bg-[#13ec13] text-[#052e05] py-3 font-bold h-12 cursor-pointer"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </section>
      </div>
    </main>
  );
};

export default AddNewProduct;
