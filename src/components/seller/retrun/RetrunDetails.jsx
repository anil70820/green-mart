export default function RetrunDetails({ data, setReturnSidebar }) {
  if (!data)
    return (
      <div className="flex items-center justify-center text-gray-400">
        Select a request
      </div>
    );

  return (
    <div className="flex flex-col bg-[#f6f8f6] overflow-hidden pt-5">
      <header className="sticky top-0 pb-4 flex justify-between border-b  border-b-gray-300 bg-[#f6f8f6]">
        <h2 className="text-xl font-bold">Request Details</h2>
        <span
          onClick={() => setReturnSidebar(false)}
          className="material-symbols-outlined text-xl text-gray-600 cursor-pointer hover:text-green-400 duration-300 xl:hidden!"
        >
          close
        </span>
      </header>

      <div className="flex-1 overflow-y-auto space-y-6 mt-5">
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex gap-4">
            <div
              className="size-28 rounded-lg bg-cover bg-center border min-w-27.5 min-h-27.5"
              style={{ backgroundImage: `url(${data.image})` }}
            />
            <div>
              <h3 className="sm:text-xl text-lg font-bold text-gray-600">{data.title}</h3>
              <p className="text-[#618961] font-medium">
                Order #{data.id} • ${data.price}
              </p>
              <div className="flex items-center flex-wrap sm:gap-5 gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xl text-gray-600">
                    person
                  </span>
                  <p className="font-medium text-gray-600">{data.customer}</p>
                </div>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-bold uppercase">
                  {data.status}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-6 text-sm">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
                Order Date
              </p>
              <p className="text-[#111811] dark:text-gray-200 font-medium">
                October 26, 2023
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
                Quantity
              </p>
              <p className="text-[#111811] dark:text-gray-200 font-medium">1</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
                Return Requested
              </p>
              <p className="text-[#111811] dark:text-gray-200 font-medium">
                Today, 10:23 AM
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
                Expected Refund
              </p>
              <p className="text-[#111811] dark:text-gray-200 font-medium">
                $12.50
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-xs font-bold uppercase text-gray-500 mb-2">
            Reason for return
          </p>
          <p className="font-medium">{data.reason}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow flex gap-3">
          <button className="flex-1 h-12 border rounded-xl font-bold hover:bg-gray-200 duration-300 cursor-pointer">
            Reject
          </button>
          <button className="flex-1 h-12 rounded-xl bg-[#13ec13] font-bold hover:bg-green-300 duration-300 cursor-pointer">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
