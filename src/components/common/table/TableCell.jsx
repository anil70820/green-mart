import React from 'react'

const TableCell = ({children,className}) => {
  return (
   <td className={`${className} px-6 py-4 whitespace-nowrap`}>{children}</td>
  )
}

export default TableCell