"use client";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import api from "@/utils/axios";
import { toast } from "react-toastify";
import Table from "@/components/common/table/Table";
import TableHead from "@/components/common/table/TableHead";
import TableRow from "@/components/common/table/TableRow";
import TableCell from "@/components/common/table/TableCell";

const statusStyles = {
  approved: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};
const SellerProductsManagemnt = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [categories, setCategories] = useState("all");

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const PRODUCT_PER_PAGE = 10;
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/products", {
        params: {
          page,
          limit: PRODUCT_PER_PAGE,
          search,
          status,
          category: categories,
        },
      });

      setProducts(res.data.data);
      setTotalItems(res.data.pagination.total);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, status, categories]);
  const updateStatus = async (id, status) => {
    await api.patch(`/admin/product/${id}/status`, { status });
    toast.success("Status Updated");
    fetchProducts();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 w-full justify-between items-start lg:items-center bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
            search
          </span>
          <input
            className="w-full bg-gray-50 border border-[#e5e7eb] text-[#111827] text-sm rounded-lg focus:ring-1 outline-none focus:ring-[#16a34a] focus:border-[#16a34a] block pl-10 p-2.5 placeholder-[#6b7280] focus:bg-white transition-colors"
            placeholder="Search by name, email, ID..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-row max-md:flex-wrap gap-4 w-full">
          <div className="relative  max-w-full w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
              filter_list
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="min-w-40 w-full bg-gray-50 border outline-none border-[#e5e7eb] text-[#111827] text-sm rounded-lg focus:ring-1 focus:ring-[#16a34a] focus:border-[#16a34a] block pl-10 p-2.5 appearance-none cursor-pointer focus:bg-white transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none text-sm">
              expand_more
            </span>
          </div>
          <div className="relative max-w-full w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
              filter_list
            </span>
            <select
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              className="min-w-50 w-full bg-gray-50 border outline-none border-[#e5e7eb] text-[#111827] text-sm rounded-lg focus:ring-1 focus:ring-[#16a34a] focus:border-[#16a34a] block pl-10 p-2.5 appearance-none cursor-pointer focus:bg-white transition-colors"
            >
              <option value="all">All Categories</option>
              <option value="fruits">Fruits</option>
              <option value="vegitables">Vegitables</option>
              <option value="groceries">Groceries</option>
            </select>

            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none text-sm">
              expand_more
            </span>
          </div>
          <button className="flex max-sm:min-w-10 items-center text-nowrap justify-center gap-2 hover:bg-[#16a34a]/80 duration-300 cursor-pointer bg-[#16a34a] hover:bg-[#16a34a]-dark text-white font-semibold text-sm px-5 py-1.5 rounded-lg transition-all shadow-sm hover:shadow w-full sm:w-auto">
            <span className="material-symbols-outlined text-xl!">download</span>
            Export CSV
          </button>
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Product
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Category
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Seller
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Price
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Stock
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Status
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-end">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <tbody className="divide-y divide-[#e5e7eb]">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="px-6 py-4 min-w-50">
                    <div className="flex items-center gap-2">
                      <img className="w-10 h-10 rounded object-contain bg-gray-100" src={product.images[0]} alt={product.title} />
                      <div>
                        <div className="font-semibold overflow-ellipsis line-clamp-2 max-w-30">{product.title}</div>
                        <div className="text-xs text-gray-500 max-w-30 overflow-ellipsis line-clamp-2">
                          SKU: {product.sku}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-6 py-4">
                    {product.categoryName}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {product.seller?.name}
                  </TableCell>
                  <TableCell className="px-6 py-4">${product.price}</TableCell>
                  <TableCell className="px-6 py-4">{product.stock}</TableCell>

                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                        statusStyles[product.status]
                      }`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {product.status}
                    </span>
                  </TableCell>

                  <TableCell className="px-6 py-4 text-center flex gap-2 items-center justify-end">
                    <button
                      onClick={() => updateStatus(product._id, "approved")}
                      className="text-green-600 md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md hover:bg-green-100 transition-colors"
                    >
                      <span className="material-symbols-outlined md:text-xl! text-lg!">
                        check
                      </span>
                    </button>
                    <button
                      onClick={() => updateStatus(product._id, "rejected")}
                      className="text-red-600 md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md hover:bg-red-100 transition-colors"
                    >
                      <span className="material-symbols-outlined md:text-xl! text-lg!">
                        close
                      </span>
                    </button>
                    <button className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md text-[#6b7280] hover:text-[#111827] hover:bg-gray-100 transition-colors">
                      <span className="material-symbols-outlined md:text-xl! text-lg!">
                        more_vert
                      </span>
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      </div>
      <Pagination
        currentPage={page}
        totalItems={totalItems}
        itemsPerPage={PRODUCT_PER_PAGE}
        onPageChange={setPage}
      />
    </div>
  );
};

export default SellerProductsManagemnt;
