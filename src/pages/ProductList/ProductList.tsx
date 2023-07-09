import { useEffect } from 'react'
import { omitBy, isUndefined } from 'lodash'
import AsideFilter from './AsideFilter/AsideFilter'
import SortProductList from './SortProductList/SortProductList'
import Product from './Product/Product'
import { useQuery } from '@tanstack/react-query'
import { productApi } from 'src/apis/product.api'
import useQueryParams from 'src/hooks/useQueryParams'
import Pagination from 'src/components/Pagination/Pagination'
import { ProductListParams } from 'src/types/product.type'
import { getCategories } from 'src/apis/category.api'

export type QueryConfig = {
   [key in keyof ProductListParams]: string //giá trị lấy trên url về mặc định là string
}

export default function ProductList() {
   const queryParams: QueryConfig = useQueryParams() //lấy ra các param trên thanh url(?search=name&other=acending)==>{search:name,other:acending}

   //dùng omitBy để loại bỏ các giá trị là undefined(chỉ truyền những cái có nhập vào)
   const queryConfig: QueryConfig = omitBy(
      {
         //vì mặc định queryParams sẽ lấy tất cả param nên phải tạo queryConfig để lấy những cái cần thiết
         page: queryParams.page || '1',
         limit: queryParams.limit || '20',
         sort_by: queryParams.sort_by,
         order: queryParams.order,
         exclude: queryParams.exclude,
         name: queryParams.name,
         price_max: queryParams.price_max,
         price_min: queryParams.price_min,
         rating_filter: queryParams.rating_filter,
         category: queryParams.category
      },
      isUndefined
   )

   const { data: productsData } = useQuery({
      queryKey: ['products', queryConfig], //queryConfig giống dependencies trong useEffect
      queryFn: () => productApi.getProductList(queryConfig as ProductListParams), //vì queryConfig toàn là string nên phải ép kiểu về ProductListParams
      keepPreviousData: true // giữ lại data trước để mỗi lần fetch lại không bị giật trang web
   })

   const { data: categoriesData } = useQuery({
      queryKey: ['categories'], //queryConfig giống dependencies trong useEffect
      queryFn: () => getCategories()
   })

   useEffect(() => {
      document.title = 'Trang chủ | Shopee Clone'
   }, [])

   return (
      <div className='bg-gray-200 py-5'>
         <div className='container grid grid-cols-12 gap-y-10 md:gap-5'>
            {productsData && categoriesData && (
               <>
                  <div className='col-span-12 text-base md:col-span-3'>
                     <AsideFilter queryConfig={queryConfig} categoriesData={categoriesData.data.data} />
                  </div>
                  <div className='col-span-12 md:col-span-9'>
                     <SortProductList
                        queryConfig={queryConfig}
                        pageSize={productsData.data.data.pagination.page_size}
                     />

                     <div className='mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {productsData.data.data.products.map((product) => (
                           <Product key={product._id} product={product} />
                        ))}
                     </div>
                     <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
                  </div>
               </>
            )}
         </div>
      </div>
   )
}
