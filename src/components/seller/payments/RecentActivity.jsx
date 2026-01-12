const activities = [
  {
    title: "Order #1234",
    sub: "Green T-Shirt",
    amount: "+$25.00",
    date: "Oct 24",
  },
  {
    title: "Payout to Bank",
    sub: "Processing",
    amount: "-$500.00",
    date: "Oct 22",
  },
  {
    title: "Order #1233",
    sub: "Organic Seeds",
    amount: "+$15.50",
    date: "Oct 21",
  },
];

const RecentActivity = () => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Recent Activity</h3>
        <button className="text-sm font-bold text-green-600 flex items-center gap-1"><span className="material-symbols-outlined">download</span>Invoice</button>
      </div>

      <div className="flex flex-col gap-4">
        {activities.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-2xl bg-white p-4 shadow ring-1 ring-black/5"
          >
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="text-xs text-gray-500">{item.sub}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-green-600">{item.amount}</p>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentActivity;
