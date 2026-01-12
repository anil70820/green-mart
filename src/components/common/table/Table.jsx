const Table = ({ children, tableClass, parentClass }) => (

    <div className={`overflow-x-auto ${parentClass}`}>
      <table className={`w-full text-left border-collapse ${tableClass}`}>
        {children}
      </table>
    </div>
);

export default Table;
