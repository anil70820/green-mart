export default function RetrunSearch({ search, setSearch }) {
  return (
    <div className="mt-5">
      <div className="flex h-10 rounded-xl shadow bg-white">
        <div className="flex items-center pl-4 text-gray-400">
          <span className="material-symbols-outlined">search</span>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Order ID, Item or Name"
          className="flex-1 px-4 text-base font-medium outline-none rounded-r-xl"
        />
      </div>
    </div>
  );
}
