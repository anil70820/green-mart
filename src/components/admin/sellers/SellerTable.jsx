"use client";
import Dropdown from "@/components/common/Dropdown";
import Table from "@/components/common/table/Table";
import TableCell from "@/components/common/table/TableCell";
import TableHead from "@/components/common/table/TableHead";
import TableRow from "@/components/common/table/TableRow";
import api from "@/utils/axios";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import Modal from "@/components/common/Modal";
import { toast } from "react-toastify";

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
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const SELLER_PER_PAGE = 10;

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
  useEffect(() => {
    fetchSellers();
  }, [page, search, status, kyc]);
  const updateStatus = async (status) => {
    await api.put(`/admin/seller/${selectedId._id}/status`, {
      sellerStatus: status,
    });

    toast.success("Seller status updated");
    setOpenDelete(false);
    fetchSellers();
  };

  const updateKyc = async (status) => {
    if (!selectedSeller?._id) return;

    await api.patch(`/admin/seller/${selectedSeller._id}/kyc`, {
      kycStatus: status,
    });

    toast.success(`KYC ${status}`);
    setOpenDelete(false);
    setSelectedSeller(null);
    fetchSellers();
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                seller Info
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Store Name
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                KYC Status
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Performance
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Commission
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Status
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
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
              <TableRow
                key={seller._id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <TableCell className="px-6 py-4 whitespace-nowrap">
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
                </TableCell>

                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-[#6b7280]">
                  {seller.sellerProfile
                    ? seller.sellerProfile.storeName
                    : "-----"}
                </TableCell>

                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                      kycStyles[seller.status]
                    }`}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {seller.status}
                  </span>
                </TableCell>

                <TableCell className="px-6 py-4 whitespace-nowrap">
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
                </TableCell>

                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                  {seller.sellerProfile
                    ? seller.sellerProfile.commission
                    : "-----"}
                </TableCell>

                <TableCell className="px-6 py-4 whitespace-nowrap">
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
                </TableCell>
                <TableCell>
                  <Dropdown
                    trigger={
                      <button className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md text-[#6b7280] hover:text-[#111827] hover:bg-gray-100 transition-colors">
                        <span className="material-symbols-outlined md:text-xl! text-lg!">
                          more_vert
                        </span>
                      </button>
                    }
                  >
                    <button className="px-5 py-2 text-left hover:bg-black/5 min-w-35">
                      View Profile
                    </button>

                    <button
                      onClick={() => {
                        setSelectedSeller(seller);
                        setOpenDelete(true);
                      }}
                      className="px-5 py-2 text-left hover:bg-black/5 min-w-35"
                    >
                      Manage Seller
                    </button>

                    <button
                      onClick={() => {
                        setSelectedId(seller._id);
                        setOpenDelete(true);
                      }}
                      className="px-5 py-2 text-left hover:bg-black/5 min-w-35 text-red-600"
                    >
                      Delete Seller
                    </button>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>

        <Pagination
          currentPage={page}
          totalItems={total}
          itemsPerPage={SELLER_PER_PAGE}
          onPageChange={setPage}
        />
      </div>
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <div className="space-y-6">
          {/* KYC ACTIONS */}
          <div>
            <p className="font-semibold mb-2 md:mb-5 text-base sm:text-lg  md:text-2xl">
              KYC Status
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                disabled={selectedSeller?.status == "approved" ? true : false}
                onClick={() => updateKyc("approved")}
                className={`${
                  selectedSeller?.status == "approved"
                    ? "btn-disabled"
                    : "btn-success"
                } `}
              >
                Approve KYC
              </button>
              <button
                disabled={selectedSeller?.status == "rejected" ? true : false}
                onClick={() => updateKyc("rejected")}
                className={`${
                  selectedSeller?.status == "rejected"
                    ? "btn-disabled"
                    : "btn-danger"
                } `}
              >
                Reject KYC
              </button>
            {selectedSeller?.status === "rejected" && (
              <button
                onClick={() => updateKyc("pending")}
                className="btn-warning"
              >
                Request Re-Submission
              </button>
            )}
            </div>

          </div>

          {/* SELLER STATUS */}
          {selectedSeller?.sellerProfile?.status && (
            <div>
              <p className="font-semibold mb-2">Seller Status</p>

              {selectedId?.sellerProfile?.sellerStatus === "active" && (
                <button
                  onClick={() => updateStatus("suspended")}
                  className="btn-danger"
                >
                  Suspend Seller
                </button>
              )}

              {selectedId?.sellerProfile?.sellerStatus === "suspended" && (
                <button
                  onClick={() => updateStatus("active")}
                  className="btn-success"
                >
                  Activate Seller
                </button>
              )}

              {selectedId?.sellerProfile?.sellerStatus === "onboarding" && (
                <button
                  onClick={() => updateStatus("active")}
                  className="btn-primary"
                >
                  Mark as Active
                </button>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SellerTable;
