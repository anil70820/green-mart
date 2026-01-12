const EarningsCard = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#13ec13] p-6 text-white shadow-lg lg:p-10 lg:pt-16 mb-8">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl lg:h-60 lg:w-60" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold lg:text-lg">Total Earnings</p>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold lg:text-6xl">
              $12,450.00
            </span>

            <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-sm font-bold">
            <span className="material-symbols-outlined">trending_up</span> 12%
            </span>
          </div>
        </div>

        <div className="flex w-full gap-3 lg:w-auto lg:min-w-[300px]">
          <button className="flex-1 rounded-xl bg-white py-3 text-sm font-bold text-[#0f7f0f] hover:bg-gray-100">
            Withdraw
          </button>

          <button className="flex-1 rounded-xl bg-white/10 py-3 text-sm font-bold hover:bg-white/20">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;
