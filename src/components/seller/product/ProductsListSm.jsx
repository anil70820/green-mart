"use client";
import Dropdown from "@/components/common/Dropdown";
import { setSelectedProduct } from "@/redux/slice/seller/productSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const ProductsListSm = ({ product, onDelete }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isInactive = product.status === "Inactive";
  return (
    <div
      className={`lg:hidden group relative flex flex-col gap-3 rounded-xl
        bg-white dark:bg-[#1a331a] p-3 shadow-sm ring-1 ring-gray-100 dark:ring-gray-800
        transition-all hover:scale-[0.99]
        ${isInactive ? "opacity-75" : ""}`}
    >
      <div className="flex gap-3">
        {/* Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <img
            className="h-full w-full object-contain"
            src={product.images?.[0]}
            alt={product.name}
          />
          {isInactive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <span className="material-symbols-outlined text-white">
                visibility_off
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between py-0.5">
          <div>
            <div className="flex justify-between items-start">
              <h3
                className={`font-bold line-clamp-1 ${
                  isInactive
                    ? "text-gray-500"
                    : "text-[#111811] dark:text-[#e0e6e0]"
                }`}
              >
                {product.name}
              </h3>

              <Dropdown
                trigger={
                  <span className="material-symbols-outlined md:text-xl! text-lg! hover:text-green-400 duration-300">
                    more_vert
                  </span>
                }
              >
                <button className="px-5 py-2 text-left hover:bg-black/5 min-w-35">
                  View
                </button>
                <button
                  onClick={() => {
                    dispatch(setSelectedProduct(product));

                    router.push(
                      `/seller/products/add-new-product?productId=${product._id}`
                    );
                  }}
                  className="px-5 py-2 text-left hover:bg-black/5 min-w-35"
                >
                  Edit
                </button>

                <button
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    onDelete(product.id);
                  }}
                  className="px-5 py-2 text-left hover:bg-black/5 min-w-35"
                >
                  Delete
                </button>
              </Dropdown>
            </div>
            <p className="text-xs text-[#618961] dark:text-[#8fab8f]">
              {product.category}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <span className="text-sm font-medium text-[#618961] dark:text-[#8fab8f]">
                Price:
              </span>
              <div
                className={`font-semibold ${
                  isInactive
                    ? "text-gray-500"
                    : "text-[#111811] dark:text-[#e0e6e0]"
                }`}
              >
                ${product.price}
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium capitalize
    ${
      product.stock > 10
        ? "bg-green-100 text-green-700"
        : product.stock > 0
        ? "bg-orange-100 text-orange-700"
        : "bg-red-100 text-red-700"
    }`}
              >
                {product.stock > 10
                  ? "active"
                  : product.stock > 0
                  ? "low stock"
                  : "rejected"}
              </span>

              <span className="mt-1 text-xs font-medium text-[#618961] dark:text-[#8fab8f]">
                {product.stock} in stock
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListSm;
