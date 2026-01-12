export default function RetrunCard({ item, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-3 rounded-xl cursor-pointer items-center duration-300
        ${active ? "bg-white shadow" : "hover:bg-black/5"}`}
    >
      <div
        className="size-12 rounded-md bg-cover bg-center border"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{item.title}</p>
        <p className="text-xs text-[#618961] truncate">
          #{item.id} • {item.customer}
        </p>
      </div>
      <span
        className={`text-xs font-bold px-2 py-1 rounded-md h-7
          ${
            item.status === "Cancel"
              ? "bg-red-100 text-red-700"
              : "bg-orange-100 text-orange-700"
          }`}
      >
        {item.status}
      </span>
    </div>
  );
}
