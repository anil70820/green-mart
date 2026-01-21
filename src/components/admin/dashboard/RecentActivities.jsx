const RecentActivities = () => {
  const PRODUCTS = [
    {
      id: 1,
      name: "Organic Avocados",
      sku: "12345",
      category: "Fresh Produce",
      price: 2.5,
      stock: 145,
      status: "active",
    },
    {
      id: 2,
      name: "Bamboo Toothbrush",
      sku: "67890",
      category: "Personal Care",
      price: 5,
      stock: 12,
      status: "low stock",
    },
    {
      id: 3,
      name: "Metal Water Bottle",
      sku: "99821",
      category: "Accessories",
      price: 15,
      stock: 0,
      status: "inactive",
    },
  ];
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-card mb-8 pb-6">
      <div className="p-6 border-b border-[#e5e7eb] flex justify-between items-center bg-gray-50/50">
        <div>
          <h3 className="text-lg font-bold text-[#111827]">
            Recent Activities
          </h3>
          <p className="text-sm text-[#6b7280] mt-0.5">Latest system events</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl bg-white ring-1 ring-gray-100">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr className="text-xs text-[#618961]">
              <th className="p-3 ps-6 flex items-center justify-start min-w-18 text-nowrap">
                Sr. No.
              </th>
              <th className="text-left uppercase">Activity</th>
              <th className="text-left uppercase">User/Entity</th>
              <th className="text-left uppercase">ID/Ref</th>
              <th className="text-left uppercase">Time</th>
              <th className="text-left uppercase pe-6">Status</th>
            </tr>
          </thead>

          <tbody>
            {PRODUCTS.map((p, index) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50"
              >
                <td className="p-3 min-w-16 font-medium ps-6">{index + 1}.</td>
                <td className="font-medium text-[#111811] min-w-50">
                  {p.name}
                </td>
                <td className="text-[#618961] min-w-40">{p.sku}</td>
                <td className="text-[#618961] min-w-40">{p.category}</td>
                <td className="min-w-20">${p.price}</td>
                <td className="min-w-30 pe-6">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                    ${
                      p.status === "active"
                        ? "bg-green-100 text-green-700"
                        : p.status === "low stock"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentActivities;
