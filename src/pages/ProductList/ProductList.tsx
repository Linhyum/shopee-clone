import { useEffect } from 'react'
import AsideFilter from './AsideFilter/AsideFilter'
import SortProductList from './SortProductList/SortProductList'
import Product from './Product/Product'

export default function ProductList() {
   useEffect(() => {
      document.title = 'Trang chủ | Shopee Clone'
   }, [])
   return (
      <div className='bg-gray-200 py-5'>
         <div className='container grid grid-cols-12 gap-10 md:gap-5'>
            <div className='col-span-12 text-base md:col-span-3'>
               <AsideFilter />
            </div>
            <div className='col-span-12 md:col-span-9'>
               <SortProductList></SortProductList>
               <div className='mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {Array(22)
                     .fill(0)
                     .map((_, index) => (
                        <Product key={index}></Product>
                     ))}
               </div>
            </div>
         </div>
      </div>
   )
}
