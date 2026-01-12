"use client";
import React, { useMemo, useState } from "react";
import Pagination from "../common/Pagination";
const users = [
  {
    id: 1,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpnDAN8K6RHPwBCHaUb7B9iiWeEMXw4EpfcokHeyB4jquHypjJZ9BYK2QSwS1iEsUDontLUY036uWG1DwfNmlP5qhIlGZMKfr_XyQHq3rW5JN6-UYq4Lt7s7CpHdBf6yU0G7dj0J8LKZsE8SzFf9A0_azQ7BFFT3UndiTpVWDDpKbZb2QDgsQLb4IYN5-S30GmBfMcLtzZqv0HZvHL6zVdQXdT895yTXTI2hHKzEZOCgj12sF5ynkNGH_SKNJn8eowZY9hZ9RYWyM",
    joined: "Oct 24, 2023",
    orders: 124,
    spent: "$1,240.00",
    status: "Active",
  },
  {
    id: 2,
    name: "Wade Warren",
    email: "wade.warren@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDArsDmktDaOAnWes3EjpwTurYD3J24f7BAxRwATdLWSLhEpUBnbmtBLElupyx9kNzSBvR3OxG69rHyuF4pvqgs8Gnw-LnGAbSxTo_kFRPJs2-Sdfh4wTlsgNFDZzK-kddeSkoyCqiaqS4g3D9kdvQi0jGMwXnwngV_RlIeoPBCSdyvfnXHaBC2fM6KVQDLtyU9PFydW8K6x8mhucdN9zhKrt4w_CSWcCyH8ya1dxNAuwhM8B0-J6ff7uZamZBfOs1_LKZEgpB1Yog",
    joined: "Oct 22, 2023",
    orders: 32,
    spent: "$420.50",
    status: "Active",
  },
  {
    id: 3,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvozUyOw0PtwDJq0X51XKm75PDDYuLIEqCe7kQQ1QQAeKPJQ5QHFYl4fd_wa23yG5Tb-WZmaIBaT4D0_gmSC0jtX-CZLbhCN4pebBdq10co5DS_FInEkJRWOVZschY3Giq9Iee4uUVMBYnU1M1AFCJMLgznD8yWkeblP8egZ1DBip1MU_DeymCdN_1ODm_yV80UsEmvznOIBLz139k_tTbfuwiO6Y8bxeEcwsRVGrvcNTeJRUMm-gYbe9Ww4lLu3KwB7LRxTZv6uo",
    joined: "Oct 18, 2023",
    orders: 0,
    spent: "$0.00",
    status: "Blocked",
  },
  {
    id: 4,
    name: "Cameron Williamson",
    email: "cameron.w@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOgidF4rW3KazEAPLG-BIgN9sPi07soxyyKRN9xYpEFo9uUd8jX11gA9LAw_fkxCTtWONfNfSJzOeTds_tBK_PurtkWcKK_RUdraX9R_b_BmLV2r-tr16n4xnqCQNrYHw5p7Bm2m6LXnh1oIj7S6M6NGaD4HEDx5FTWF6HpRjiUiMp4btsLDWosBlMc-4jOr0WhJf5F6L2Bm-7WGi4Y6RcSAMS32ZyfYXza4fTRxHIA_OFcH3wakal0kApJ46BIC6aGbQTe9xcTkg",
    joined: "Oct 15, 2023",
    orders: 56,
    spent: "$890.20",
    status: "Active",
  },
  {
    id: 5,
    name: "Brooklyn Simmons",
    email: "brooklyn.s@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDr6OfAciM0aCEIQ6Sprto-07lmdc89OZTyFIrPZ_6U_CNZXBBYDmQIFqqhfvACnO_5pGwLqtx9Ok3u0HEMKIIQHBUPoe3aBWGfREtGumwnqIsemw7x7_DXkN_xAXbSd7TrNZZChurMGNEm1GUCadzKWl0rglVlONtaeXP9tfNCjPo8HN0nSeYoo2MNH3YdIIMu5S4quVLXT2WRNcvcjHrSp-887TvAiKQn5nsEfC8NGqpiJtujGs10yn_rPPF6nk8topPBtaJ7y38",
    joined: "Sep 28, 2023",
    orders: 12,
    spent: "$150.00",
    status: "Active",
  },
  {
    id: 6,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpnDAN8K6RHPwBCHaUb7B9iiWeEMXw4EpfcokHeyB4jquHypjJZ9BYK2QSwS1iEsUDontLUY036uWG1DwfNmlP5qhIlGZMKfr_XyQHq3rW5JN6-UYq4Lt7s7CpHdBf6yU0G7dj0J8LKZsE8SzFf9A0_azQ7BFFT3UndiTpVWDDpKbZb2QDgsQLb4IYN5-S30GmBfMcLtzZqv0HZvHL6zVdQXdT895yTXTI2hHKzEZOCgj12sF5ynkNGH_SKNJn8eowZY9hZ9RYWyM",
    joined: "Oct 24, 2023",
    orders: 124,
    spent: "$1,240.00",
    status: "Active",
  },
  {
    id: 7,
    name: "Wade Warren",
    email: "wade.warren@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDArsDmktDaOAnWes3EjpwTurYD3J24f7BAxRwATdLWSLhEpUBnbmtBLElupyx9kNzSBvR3OxG69rHyuF4pvqgs8Gnw-LnGAbSxTo_kFRPJs2-Sdfh4wTlsgNFDZzK-kddeSkoyCqiaqS4g3D9kdvQi0jGMwXnwngV_RlIeoPBCSdyvfnXHaBC2fM6KVQDLtyU9PFydW8K6x8mhucdN9zhKrt4w_CSWcCyH8ya1dxNAuwhM8B0-J6ff7uZamZBfOs1_LKZEgpB1Yog",
    joined: "Oct 22, 2023",
    orders: 32,
    spent: "$420.50",
    status: "Active",
  },
  {
    id: 8,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvozUyOw0PtwDJq0X51XKm75PDDYuLIEqCe7kQQ1QQAeKPJQ5QHFYl4fd_wa23yG5Tb-WZmaIBaT4D0_gmSC0jtX-CZLbhCN4pebBdq10co5DS_FInEkJRWOVZschY3Giq9Iee4uUVMBYnU1M1AFCJMLgznD8yWkeblP8egZ1DBip1MU_DeymCdN_1ODm_yV80UsEmvznOIBLz139k_tTbfuwiO6Y8bxeEcwsRVGrvcNTeJRUMm-gYbe9Ww4lLu3KwB7LRxTZv6uo",
    joined: "Oct 18, 2023",
    orders: 0,
    spent: "$0.00",
    status: "Blocked",
  },
  {
    id: 9,
    name: "Cameron Williamson",
    email: "cameron.w@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOgidF4rW3KazEAPLG-BIgN9sPi07soxyyKRN9xYpEFo9uUd8jX11gA9LAw_fkxCTtWONfNfSJzOeTds_tBK_PurtkWcKK_RUdraX9R_b_BmLV2r-tr16n4xnqCQNrYHw5p7Bm2m6LXnh1oIj7S6M6NGaD4HEDx5FTWF6HpRjiUiMp4btsLDWosBlMc-4jOr0WhJf5F6L2Bm-7WGi4Y6RcSAMS32ZyfYXza4fTRxHIA_OFcH3wakal0kApJ46BIC6aGbQTe9xcTkg",
    joined: "Oct 15, 2023",
    orders: 56,
    spent: "$890.20",
    status: "Active",
  },
  {
    id: 10,
    name: "Brooklyn Simmons",
    email: "brooklyn.s@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDr6OfAciM0aCEIQ6Sprto-07lmdc89OZTyFIrPZ_6U_CNZXBBYDmQIFqqhfvACnO_5pGwLqtx9Ok3u0HEMKIIQHBUPoe3aBWGfREtGumwnqIsemw7x7_DXkN_xAXbSd7TrNZZChurMGNEm1GUCadzKWl0rglVlONtaeXP9tfNCjPo8HN0nSeYoo2MNH3YdIIMu5S4quVLXT2WRNcvcjHrSp-887TvAiKQn5nsEfC8NGqpiJtujGs10yn_rPPF6nk8topPBtaJ7y38",
    joined: "Sep 28, 2023",
    orders: 12,
    spent: "$150.00",
    status: "Active",
  },
  {
    id: 11,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDpnDAN8K6RHPwBCHaUb7B9iiWeEMXw4EpfcokHeyB4jquHypjJZ9BYK2QSwS1iEsUDontLUY036uWG1DwfNmlP5qhIlGZMKfr_XyQHq3rW5JN6-UYq4Lt7s7CpHdBf6yU0G7dj0J8LKZsE8SzFf9A0_azQ7BFFT3UndiTpVWDDpKbZb2QDgsQLb4IYN5-S30GmBfMcLtzZqv0HZvHL6zVdQXdT895yTXTI2hHKzEZOCgj12sF5ynkNGH_SKNJn8eowZY9hZ9RYWyM",
    joined: "Oct 24, 2023",
    orders: 124,
    spent: "$1,240.00",
    status: "Active",
  },
  {
    id: 12,
    name: "Wade Warren",
    email: "wade.warren@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDArsDmktDaOAnWes3EjpwTurYD3J24f7BAxRwATdLWSLhEpUBnbmtBLElupyx9kNzSBvR3OxG69rHyuF4pvqgs8Gnw-LnGAbSxTo_kFRPJs2-Sdfh4wTlsgNFDZzK-kddeSkoyCqiaqS4g3D9kdvQi0jGMwXnwngV_RlIeoPBCSdyvfnXHaBC2fM6KVQDLtyU9PFydW8K6x8mhucdN9zhKrt4w_CSWcCyH8ya1dxNAuwhM8B0-J6ff7uZamZBfOs1_LKZEgpB1Yog",
    joined: "Oct 22, 2023",
    orders: 32,
    spent: "$420.50",
    status: "Active",
  },
  {
    id: 13,
    name: "Esther Howard",
    email: "esther.howard@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvozUyOw0PtwDJq0X51XKm75PDDYuLIEqCe7kQQ1QQAeKPJQ5QHFYl4fd_wa23yG5Tb-WZmaIBaT4D0_gmSC0jtX-CZLbhCN4pebBdq10co5DS_FInEkJRWOVZschY3Giq9Iee4uUVMBYnU1M1AFCJMLgznD8yWkeblP8egZ1DBip1MU_DeymCdN_1ODm_yV80UsEmvznOIBLz139k_tTbfuwiO6Y8bxeEcwsRVGrvcNTeJRUMm-gYbe9Ww4lLu3KwB7LRxTZv6uo",
    joined: "Oct 18, 2023",
    orders: 0,
    spent: "$0.00",
    status: "Blocked",
  },
  {
    id: 14,
    name: "Cameron Williamson",
    email: "cameron.w@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOgidF4rW3KazEAPLG-BIgN9sPi07soxyyKRN9xYpEFo9uUd8jX11gA9LAw_fkxCTtWONfNfSJzOeTds_tBK_PurtkWcKK_RUdraX9R_b_BmLV2r-tr16n4xnqCQNrYHw5p7Bm2m6LXnh1oIj7S6M6NGaD4HEDx5FTWF6HpRjiUiMp4btsLDWosBlMc-4jOr0WhJf5F6L2Bm-7WGi4Y6RcSAMS32ZyfYXza4fTRxHIA_OFcH3wakal0kApJ46BIC6aGbQTe9xcTkg",
    joined: "Oct 15, 2023",
    orders: 56,
    spent: "$890.20",
    status: "Active",
  },
  {
    id: 15,
    name: "Brooklyn Simmons",
    email: "brooklyn.s@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDr6OfAciM0aCEIQ6Sprto-07lmdc89OZTyFIrPZ_6U_CNZXBBYDmQIFqqhfvACnO_5pGwLqtx9Ok3u0HEMKIIQHBUPoe3aBWGfREtGumwnqIsemw7x7_DXkN_xAXbSd7TrNZZChurMGNEm1GUCadzKWl0rglVlONtaeXP9tfNCjPo8HN0nSeYoo2MNH3YdIIMu5S4quVLXT2WRNcvcjHrSp-887TvAiKQn5nsEfC8NGqpiJtujGs10yn_rPPF6nk8topPBtaJ7y38",
    joined: "Sep 28, 2023",
    orders: 12,
    spent: "$150.00",
    status: "Active",
  },
];
const UsersTable = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 10;
  // 🔍 SEARCH + FILTER
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All" ? true : user.status === status;

      return matchSearch && matchStatus;
    });
  }, [search, status]);

  // 📄 PAGINATION LOGIC
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(start, start + USERS_PER_PAGE);
  }, [filteredUsers, page]);

  // reset page on search/filter
  React.useEffect(() => {
    setPage(1);
  }, [search, status]);
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
              <option>All Status</option>
              <option>Active</option>
              <option>Blocked</option>
              <option>Pending</option>
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
                <th className="px-6 py-4 whitespace-nowrap">User Info</th>
                <th className="px-6 py-4 whitespace-nowrap">Joined Date</th>
                <th className="px-6 py-4 whitespace-nowrap">Total Orders</th>
                <th className="px-6 py-4 whitespace-nowrap">Total Spent</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e5e7eb]">
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-10 rounded-full bg-cover border border-[#e5e7eb]"
                        style={{ backgroundImage: `url('${user.avatar}')` }}
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
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6b7280]">
                    {user.joined}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#111827] font-medium">
                    {user.orders}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#111827] font-bold">
                    {user.spent}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity">
                      <button className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md text-[#6b7280] hover:[#111827] hover:bg-green-50 transition-colors">
                        <span className="material-symbols-outlined md:text-xl! text-lg!">
                          visibility
                        </span>
                      </button>
                      <button className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md text-[#6b7280] hover:text-red-500 hover:bg-red-50 transition-colors">
                        <span className="material-symbols-outlined md:text-xl! text-lg!">
                          block
                        </span>
                      </button>
                      <button className="md:w-10 md:h-10 w-8 h-8 flex justify-center items-center rounded-md text-[#6b7280] hover:text-[#111827] hover:bg-gray-100 transition-colors">
                        <span className="material-symbols-outlined md:text-xl! text-lg!">
                          more_vert
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={page}
          totalItems={filteredUsers.length}
          itemsPerPage={USERS_PER_PAGE}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default UsersTable;
