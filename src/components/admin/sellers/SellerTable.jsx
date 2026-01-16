"use client";
import React, { useEffect, useMemo, useState } from "react";
import Pagination from "../common/Pagination";
import api from "@/utils/axios";
const sell = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "sarah@ecogoods.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIBf_raAdh6WcQX04Yls4cjkg8hmQBPFFuPZhnhhmjDHYvnEhILhyMzzYV9Qc46LXqXQF7nptu_-aBVqAQjWNrQ61v9yuhsx8aJZXyb5l0HF8st7ZeNPVMN2AcEyBae_XFPYEGp6H7Bci-qThBk0YFdCReio5rJ2QKryDiKrDxMPi8c5QS2O__2MKHv4pF5AKuw09y3Dzm1o7ALMpKBe2661Ktbfj8odfM_Kfc3Ojw7u8egKZCbrU9iwh9IQShdaeBYwFgibaHGRc",
    store: "EcoGoods Ltd",
    kyc: "verified",
    rating: 4.8,
    sales: "2.1k",
    commission: "12%",
    status: "active",
  },
];
const kycStyles = {
  approved: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};

const statusStyles = {
  active: "text-green-600",
  onboarding: "text-orange-500",
  suspended: "text-red-500",
  inactive: "text-gray-400",
};

const SellerTable = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [kyc, setKyc] = useState("all");
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const SELLER_PER_PAGE = 10;

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);

        const res = await api.get("/admin/sellers", {
          params: {
            page,
            limit: SELLER_PER_PAGE,
            search,
            sellerStatus: status,
            kycStatus: kyc,
          },
        });
        setSellers(res.data.data);
        setTotal(res.data.pagination.total);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
  }, [page, search, status, kyc]);
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
          <div className="relative max-w-full w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
              filter_list
            </span>
            <select
              value={kyc}
              onChange={(e) => setKyc(e.target.value)}
              className="min-w-40 w-full bg-gray-50 border outline-none border-[#e5e7eb] text-[#111827] text-sm rounded-lg focus:ring-1 focus:ring-[#16a34a] focus:border-[#16a34a] block pl-10 p-2.5 appearance-none cursor-pointer focus:bg-white transition-colors"
            >
              <option value="all">All KYC</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>

            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none text-sm">
              expand_more
            </span>
          </div>
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
              <option value="onboarding">Onboarding</option>
              <option value="suspended">Suspended</option>
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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-[#e5e7eb] text-xs uppercase text-[#6b7280] font-semibold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">seller Info</th>
                <th className="px-6 py-4 whitespace-nowrap">Store Name</th>
                <th className="px-6 py-4 whitespace-nowrap">KYC Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Performance</th>
                <th className="px-6 py-4 whitespace-nowrap">Commission</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e5e7eb]">
              {loading && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    Loading sellers...
                  </td>
                </tr>
              )}

              {!loading && sellers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No sellers found
                  </td>
                </tr>
              )}

              {sellers.map((seller) => (
                <tr
                  key={seller._id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-10 rounded-full bg-cover border border-[#e5e7eb]"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDIBf_raAdh6WcQX04Yls4cjkg8hmQBPFFuPZhnhhmjDHYvnEhILhyMzzYV9Qc46LXqXQF7nptu_-aBVqAQjWNrQ61v9yuhsx8aJZXyb5l0HF8st7ZeNPVMN2AcEyBae_XFPYEGp6H7Bci-qThBk0YFdCReio5rJ2QKryDiKrDxMPi8c5QS2O__2MKHv4pF5AKuw09y3Dzm1o7ALMpKBe2661Ktbfj8odfM_Kfc3Ojw7u8egKZCbrU9iwh9IQShdaeBYwFgibaHGRc')",
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-[#111827] text-sm font-semibold">
                          {seller.name}
                        </span>
                        <span className="text-[#6b7280] text-xs">
                          {seller.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6b7280]">
                    {seller.sellerProfile
                      ? seller.sellerProfile.storeName
                      : "-----"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                        kycStyles[seller.status]
                      }`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {seller.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {seller.sellerProfile?.rating ? (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="material-symbols-outlined text-amber-400 text-base">
                          star
                        </span>
                        <span className="font-semibold">{seller.rating}</span>
                        {seller.sales && (
                          <span className="text-xs text-gray-500">
                            ({seller.sales} sales)
                          </span>
                        )}
                        {seller.sellerProfile?.rating < 3 && (
                          <span className="ml-2 text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                            High Returns
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="italic text-gray-400 text-sm">
                        New Seller
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {seller.sellerProfile
                      ? seller.sellerProfile.commission
                      : "-----"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`flex items-center gap-2 text-xs font-semibold uppercase ${
                        statusStyles[seller.status]
                      }`}
                    >
                      <span
                        className={`${
                          seller.sellerProfile?.sellerStatus
                            ? "size-2 rounded-full bg-current"
                            : ""
                        } `}
                      />
                      {seller.sellerProfile
                        ? seller.sellerProfile.sellerStatus
                        : "-----"}
                    </div>
                  </td>
                  <td>
                    <button className="mx-auto md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md text-[#6b7280] hover:text-[#111827] hover:bg-gray-100 transition-colors">
                      <span className="material-symbols-outlined md:text-xl! text-lg!">
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={page}
          totalItems={total}
          itemsPerPage={SELLER_PER_PAGE}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SellerTable;
