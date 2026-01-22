import AllProducts from '@/components/user/products/AllProducts'
import CategoryStrip from '@/components/user/products/Categories'
import React from 'react'

const page = () => {
  return (
    <div>
      <CategoryStrip/>
        <AllProducts/>
    </div>
  )
}

export default page