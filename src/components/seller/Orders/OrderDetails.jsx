"use client";

import StatusBadge from "../common/StatusBadge";

const OrderDetails = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-screen w-[420px]
          bg-white border-l border-gray-200
          flex flex-col overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Order Details <span className="text-[#618961]">#{order.id}</span>
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col flex-1">
          {/* STATUS */}
          <div className="flex justify-between border-b pb-4 mb-4">
            <div>
              <StatusBadge status={order.status} />
              <h3 className="text-xl font-bold mt-2">{order.customer}</h3>
              <p className="text-sm text-[#618961]">
                {order.items?.length || 0} items
              </p>
            </div>
            <p className="text-3xl font-extrabold">${order.total.toFixed(2)}</p>
          </div>

          {/* DELIVERY */}
          <InfoBlock title="Delivery Information">
            <p>{order.address}</p>
            <p>{order.phone}</p>
          </InfoBlock>

          {/* PAYMENT */}
          <InfoBlock title="Payment">
            <p>{order.payment}</p>
          </InfoBlock>

          {/* PRODUCTS */}
          <InfoBlock title="Products">
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>
                  {item.name} ({item.qty}x)
                </span>
                <span className="font-bold">
                  ${(item.qty * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </InfoBlock>

          {/* NOTES */}
          {order.notes && (
            <InfoBlock title="Notes">
              <p className="italic">{order.notes}</p>
            </InfoBlock>
          )}

          {/* ACTIONS */}
          <div className="mt-auto pt-4 bg-white sticky bottom-0 flex gap-3 border-t">
            <button className="flex-1 h-12 rounded-xl border font-bold">
              Decline
            </button>
            <button className="flex-[2] h-12 rounded-xl bg-[#13ec13] text-[#052e05] font-bold">
              Pack Order
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

/* ---------------- HELPERS ---------------- */
function InfoBlock({ title, children }) {
  return (
    <div className="bg-[#f6f8f6] rounded-xl p-4 mb-4">
      <p className="text-xs font-bold uppercase text-[#618961] mb-2">{title}</p>
      <div className="text-sm text-gray-900 space-y-1">{children}</div>
    </div>
  );
}
export default OrderDetails;
