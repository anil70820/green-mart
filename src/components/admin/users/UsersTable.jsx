"use client";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import api from "@/utils/axios";
import { toast } from "react-toastify";
import Confirm from "@/components/seller/modals/Confirm";
import Dropdown from "@/components/common/Dropdown";
import Table from "@/components/common/table/Table";
import TableHead from "@/components/common/table/TableHead";
import TableRow from "@/components/common/table/TableRow";
import TableCell from "@/components/common/table/TableCell";
import UserDetail from "./UserDetail";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const USERS_PER_PAGE = 10;
  // 🔹 FETCH USERS (SEARCH + FILTER + PAGINATION FROM BACKEND)
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/users", {
        params: {
          page,
          limit: USERS_PER_PAGE,
          search,
          status,
        },
      });

      console.log("users:", res.data);

      setUsers(res.data.data);
      setTotal(res.data.pagination.total);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, status]);

  // reset page on search/filter
  useEffect(() => {
    setPage(1);
  }, [search, status]);
  // 🚫 BLOCK / UNBLOCK
  const toggleStatus = async (id, currentStatus) => {
    await api.patch(`/admin/user/${id}/status`, {
      status: currentStatus === "active" ? "blocked" : "active",
    });
    if (currentStatus === "active") {
      toast.success("User Blocked Successfully!");
    } else if (currentStatus === "blocked") {
      toast.success("User Activated Successfully!");
    }
    fetchUsers();
  };

  // 🗑 DELETE USER
  const deleteUser = async (id) => {
    await api.delete(`/admin/user/${id}`);
    toast.success("User Deleted Successfully!");
    fetchUsers();
  };

  // 📥 EXPORT CSV
  const exportCSV = async () => {
    try {
      const res = await api.get(
        `/admin/users/export-csv?status=${status}`, // active | blocked | all
        { responseType: "blob" },
      );

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `users-${status || "all"}.csv`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV export failed", err);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start lg:items-center bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-sm">
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
        <div className="flex flex-row max-sm:flex-wrap gap-4 w-full">
          <div className="relative min-w-20 w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]">
              filter_list
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="min-w-20 w-full bg-gray-50 border outline-none border-[#e5e7eb] text-[#111827] text-sm rounded-lg focus:ring-1 focus:ring-[#16a34a] focus:border-[#16a34a] block pl-10 p-2.5 appearance-none cursor-pointer focus:bg-white transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] pointer-events-none text-sm">
              expand_more
            </span>
          </div>
          <button
            onClick={exportCSV}
            className="flex max-sm:min-w-10 items-center text-nowrap justify-center gap-2 hover:bg-[#16a34a]/80 duration-300 cursor-pointer bg-[#16a34a] hover:bg-[#16a34a]-dark text-white font-semibold text-sm px-5 py-1.5 rounded-lg transition-all shadow-sm hover:shadow w-full sm:w-auto"
          >
            <span className="material-symbols-outlined text-xl!">download</span>
            Export CSV
          </button>
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-sm mt-8">
        <Table>
          <TableHead className="bg-gray-50 border-b border-[#e5e7eb] text-xs uppercase text-[#6b7280] font-semibold">
            <TableRow>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                User Info
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Joined Date
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Total Orders
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Total Spent
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                Status
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <tbody className="divide-y divide-[#e5e7eb]">
            {loading && (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
            {users.map((user) => (
              <TableRow
                key={user._id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-cover border border-[#e5e7eb]"
                      style={{
                        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMD2KUWtU-AHgPemcLY88epxHhZS8FhWPmnHlxNgQFs5x95aSoqxthgSHkr1kJGXa6p0rzQQWiWfn2ifFO7YAUt2a_yoW7WAaoL24JNlxX_lZh1QzX-9X1JM-5QCOsPhsbikeLaGKFFWYMZ3iKlXUR-FDbOv3RomSWh_x5Pa8ytif8uJyencGbKgB1i5f8rxZOVPtkVMIjRePDP4EtJhpz0nHvnaeRC9MVfgco_7nsaj7o1c8gmMZZQydy6pMn-BQmJvZIb0DMRzg')`,
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-[#111827] text-sm font-semibold">
                        {user.name}
                      </span>
                      <span className="text-[#6b7280] text-xs">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-[#6b7280]">
                  {new Date(user.createdAt).toDateString()}
                </TableCell>

                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-[#111827] font-medium">
                  {user.totalOrders}
                </TableCell>

                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-[#111827] font-bold">
                  ₹{user.totalSpent}
                </TableCell>

                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        user.status === "active" ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                    {user.status}
                  </span>
                </TableCell>

                <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity">
                    <button className="hidden md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md text-[#6b7280] hover:[#111827] hover:bg-green-50 transition-colors">
                      <span className="material-symbols-outlined md:text-xl! text-lg!">
                        visibility
                      </span>
                    </button>
                    <button
                      onClick={() => toggleStatus(user._id, user.status)}
                      className="hidden md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md text-[#6b7280] hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <span className="material-symbols-outlined md:text-xl! text-lg!">
                        block
                      </span>
                    </button>
                    <Dropdown
                      trigger={
                        <button className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md text-[#6b7280] hover:text-[#111827] hover:bg-gray-100 transition-colors">
                          <span className="material-symbols-outlined md:text-xl! text-lg!">
                            more_vert
                          </span>
                        </button>
                      }
                    >
                      <button
                        onClick={() => {
                          setSelectedId(user);
                          setDetailOpen(true);
                        }}
                        className="px-5 py-2 text-left hover:bg-black/5 min-w-35"
                      >
                        View
                      </button>
                      <button
                        onClick={() => toggleStatus(user._id, user.status)}
                        className="px-5 py-2 text-left hover:bg-black/5 min-w-35"
                      >
                        {user.status === "blocked" ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(user._id);
                          setOpenDelete(true);
                        }}
                        className="px-5 py-2 text-left hover:bg-black/5 min-w-35"
                      >
                        Delete
                      </button>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
        <Pagination
          currentPage={page}
          totalItems={total}
          itemsPerPage={USERS_PER_PAGE}
          onPageChange={setPage}
        />
      </div>
      <Confirm
        heading="Delete User"
        paragraph="Are you sure you want to delete this user? This action cannot be
                undone."
        cancel="cancel"
        success="delete"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        handleDelete={() => deleteUser(selectedId)}
      />
      <UserDetail
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        user={selectedId}
      />
    </div>
  );
};

export default UsersTable;
