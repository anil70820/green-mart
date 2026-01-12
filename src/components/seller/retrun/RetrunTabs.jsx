export default function RetrunTabs({ tab, setTab ,counts}) {
  const tabs = ["All Requests", "Approved", "Rejected","Pending"];

  return (
    <div className="flex h-10 rounded-xl bg-[#e8ede8] p-1">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`flex-1 rounded-lg text-sm font-bold transition
              ${
                tab === t ? "bg-white shadow text-[#111811]" : "text-[#618961]"
              }`}
        >
          {t}
          <span> ({counts[t]})</span>
        </button>
      ))}
    </div>
  );
}
