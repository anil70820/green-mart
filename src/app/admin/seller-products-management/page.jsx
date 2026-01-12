import SellerProductsManagemnt from '@/components/admin/sellers/SellerProductsManagemnt'
import Stats from '@/components/admin/sellers/Stats'
import React from 'react'

const page = () => {
  return (
    <div className='p-5 h-[calc(100vh-80px)]'>
      <Stats/>
      <SellerProductsManagemnt/>
    </div>
  )
}

export default page