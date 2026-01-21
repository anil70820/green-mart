"use client";

import Pagination from "@/components/admin/common/Pagination";
import Dropdown from "@/components/common/Dropdown";
import Table from "@/components/common/table/Table";
import TableCell from "@/components/common/table/TableCell";
import TableHead from "@/components/common/table/TableHead";
import TableRow from "@/components/common/table/TableRow";
import api from "@/utils/axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Confirm from "../modals/Confirm";
import ProductsListSm from "./ProductsListSm";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setSelectedProduct } from "@/redux/slice/seller/productSlice";
import { PRODUCTS_TAB_LIST } from "@/utils/helper";
import { statusStyles } from "@/components/admin/sellers/SellerProductsManagemnt";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const PRODUCT_PER_PAGE = 10;
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/seller/all-products");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(search.toLowerCase());

      const matchTab =
        tab === "all" ||
        (tab === "low" && p.status === "low stock") ||
        (tab === "active" && p.status === "active") ||
        (tab === "inactive" && p.status === "inactive");

      return matchSearch && matchTab;
    });
  }, [search, tab, products]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/seller/delete-product/${id}`);

      // UI se product remove (no refetch needed)
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PRODUCT_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCT_PER_PAGE);
  }, [filteredProducts, page]);

  useEffect(() => {
    setPage(1);
  }, [search, tab, products]);

  return (
    <div className="px-5 mt-2 pt-3 pb-5 overflow-y-auto h-[calc(100vh-90px)]">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ===== TOP FILTER BAR ===== */}
        <div className="dk:bg-[#102210] pb-4">
          <div className="flex gap-4 mb-3">
            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#618961] material-symbols-outlined">
                search
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, category..."
                className="w-full rounded-xl bg-white dk:bg-[#1a331a] py-2.5 pl-10 pr-4
              text-sm text-[#111811] dk:text-[#e0e6e0]
              border border-gray-200 focus:border-[#13ec13] outline-none"
              />
            </div>

            <Link
              href="/seller/products/add-new-product"
              className="rounded-xl bg-[#13ec13] px-5 py-2.5 text-white font-medium hover:bg-[#13ec13]/70 duration-300 cursor-pointer"
            >
              + Add Product
            </Link>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {PRODUCTS_TAB_LIST.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
              ${
                tab === t.key
                  ? "bg-[#13ec13] text-white"
                  : "bg-white dk:bg-[#1a331a] text-[#618961] border border-gray-200 dk:border-gray-700"
              }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="max-sm:hidden w-full overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm mt-8">
          <Table>
            <TableHead>
              <tr>
                <TableCell className="text-left">Product</TableCell>
                <TableCell className="text-left">Category</TableCell>
                <TableCell className="text-left">Price</TableCell>
                <TableCell className="text-left">Stock</TableCell>
                <TableCell className="text-left">Status</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHead>

            <tbody>
              {paginatedProducts.length !== 0 ? (
                paginatedProducts.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell className="px-6 py-4 min-w-50">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-10 h-10 rounded object-contain bg-gray-100"
                          src={p.images[0]}
                          alt={p.title}
                        />
                        <div>
                          <div className="font-semibold overflow-ellipsis line-clamp-2 max-w-30">
                            {p.title}
                          </div>
                          <div className="text-xs text-gray-500 max-w-30 overflow-ellipsis line-clamp-2">
                            SKU: {p.sku}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#618961] min-w-40">
                      {p.categoryName}
                    </TableCell>
                    <TableCell className="min-w-20">${p.price}</TableCell>
                    <TableCell className="min-w-20">{p.stock}</TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                          statusStyles[p.status]
                        }`}
                      >
                        <span className="size-1.5 rounded-full bg-current" />
                        {p.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-4">
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
                            dispatch(setSelectedProduct(p));

                            router.push(
                              `/seller/products/add-new-product?productId=${p._id}`,
                            );
                          }}
                          className="px-5 py-2 text-left hover:bg-black/5 min-w-35"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedId(p.id);
                            setOpenDelete(true);
                          }}
                          className="px-5 py-2 text-left hover:bg-black/5 min-w-35"
                        >
                          Delete
                        </button>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <p className="text-center text-lg font-semibold text-gray-700 my-5 mx-auto">
                      Product not found.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Pagination
            currentPage={page}
            totalItems={filteredProducts.length}
            itemsPerPage={PRODUCT_PER_PAGE}
            onPageChange={setPage}
          />
        </div>

        {/* ======= MOBILE VIEW ==== */}
        <div className="flex flex-col gap-3 sm:hidden">
          {paginatedProducts.map((product) => (
            <ProductsListSm
              key={product._id}
              product={product}
              onDelete={(id) => {
                setSelectedId(id);
                setOpenDelete(true);
              }}
            />
          ))}
          {paginatedProducts.length == 0 && (
            <p className="text-center text-base font-semibold text-gray-700 my-5 mx-auto">
              Product not found.
            </p>
          )}
          <Pagination
            currentPage={page}
            totalItems={filteredProducts.length}
            itemsPerPage={PRODUCT_PER_PAGE}
            onPageChange={setPage}
          />
        </div>
      </div>
      <Confirm
        heading="Delete Product"
        paragraph="Are you sure you want to delete this product? This action cannot be
          undone."
        cancel="cancel"
        success="delete"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        handleDelete={() => handleDelete(selectedId)}
      />
    </div>
  );
};

export default ProductsList;
