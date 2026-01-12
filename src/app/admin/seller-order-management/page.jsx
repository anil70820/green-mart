import OrdersManagement from '@/components/admin/sellers/OrdersManagement'
import Stats from '@/components/admin/sellers/Stats'
import React from 'react'

const page = () => {
  return (
    <div className='p-5 h-[calc(100vh-80px)]'>
        <Stats/>
        <OrdersManagement/>
    </div>
  )
}

export default page