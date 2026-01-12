const QuickActions = () => {
  const actions = [
    { label: "Approve Seller", icon: "verified_user" },
    { label: "Add Product", icon: "add_box" },
    { label: "View Orders", icon: "receipt_long" },
    { label: "Create Alert", icon: "campaign" },
  ];

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl md:p-6 p-4 shadow-sm">
      <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-4 border-b border-[#e5e7eb] pb-2">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <button
            key={a.label}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all gap-2 border border-[#e5e7eb] group"
          >
            <span className="material-symbols-outlined text-emerald-600 group-hover:scale-110 transition-transform">
              {a.icon}
            </span>
            <span className="text-base md:text-lg font-semibold text-[#111827">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default QuickActions;
