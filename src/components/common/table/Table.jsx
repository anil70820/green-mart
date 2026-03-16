const Table = ({ children, tableClass, parentClass }) => (

    <div className={`overflow-auto max-h-150 min-h-100  ${parentClass}`}>
      <table className={`w-full text-left border-collapse ${tableClass}`}>
        {children}
      </table>
    </div>
);

export default Table;
