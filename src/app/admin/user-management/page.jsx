import Stats from '@/components/admin/users/Stats'
import UsersTable from '@/components/admin/users/UsersTable'
import React from 'react'

const page = () => {
  return (
    <div className='p-5 h-[calc(100vh-80px)] overflow-auto'>
        <Stats/>
        <UsersTable/>
    </div>
  )
}

export default page