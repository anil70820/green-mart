function Status({ title, value, icon, color, box }) {
  return (
    <div
      className={`flex items-center justify-between gap-5 p-5 rounded-xl border border-${box}-200 bg-${box}-50/50 shadow-sm flex-auto`}
    >
      <div>
        <p
          className={`text-${box}-800 text-xs font-bold uppercase tracking-wider mb-1 text-nowrap`}
        >
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <span
        className={`material-symbols-outlined text-${color}-600 bg-${color}-100 p-3 rounded-lg`}
      >
        {icon}
      </span>
    </div>
  );
}
const StatusCards = () => {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl md:p-6 p-4 shadow-sm">
      <div className="grid lg:grid-cols-2 gap-6">
        <Status
          title="Pending Approvals"
          value="12"
          color="yellow"
          box="yellow"
          icon="person_add"
        />
        <Status
          title="Failed Orders"
          value="23"
          color="red"
          icon="error"
          box="red"
        />
        <Status
          title="Open Disputes"
          value="5"
          color="gray"
          icon="gavel"
          box="gray"
        />
      </div>
    </div>
  );
};
export default StatusCards;
