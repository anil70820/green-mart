export default function RetrunTabs({ tab, setTab ,counts}) {
  const tabs = ["All Requests", "Approved", "Rejected","Pending"];

  return (
    <div className="flex w-full gap-5 h-10 rounded-xl bg-[#e8ede8] p-1 overflow-x-auto scrollbar_hidden">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`rounded-lg text-sm font-bold transition text-nowrap px-4
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
