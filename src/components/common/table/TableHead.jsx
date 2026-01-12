const TableHead = ({ children, className }) => (
  <thead
    className={`${className} bg-gray-50 border-b border-[#e5e7eb] text-xs uppercase text-[#6b7280] font-semibold`}
  >
    {children}
  </thead>
);

export default TableHead;
