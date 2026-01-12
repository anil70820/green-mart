const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Packed: "bg-blue-100 text-blue-800",
    Shipped: "bg-green-100 text-green-800",
    Delivered: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-bold rounded ${colors[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
};

export default StatusBadge;
