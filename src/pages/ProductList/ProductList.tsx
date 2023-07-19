import AsideFilter from './AsideFilter/AsideFilter'
import SortProductList from './SortProductList/SortProductList'
import Product from './Product/Product'
import { useQuery } from '@tanstack/react-query'
import { productApi } from 'src/apis/product.api'
import Pagination from 'src/components/Pagination/Pagination'
import { ProductListParams } from 'src/types/product.type'
import { getCategories } from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Helmet } from 'react-helmet'

export type QueryConfig = {
   [key in keyof ProductListParams]: string //giá trị lấy trên url về mặc định là string
}

export default function ProductList() {
   const queryConfig = useQueryConfig()

   const { data: productsData } = useQuery({
      queryKey: ['products', queryConfig], //queryConfig giống dependencies trong useEffect
      queryFn: () => productApi.getProductList(queryConfig as ProductListParams), //vì queryConfig toàn là string nên phải ép kiểu về ProductListParams
      keepPreviousData: true, // giữ lại data trước để mỗi lần fetch lại không bị giật trang web
      staleTime: 3 * 60 * 1000 //để khi chọn danh mục bên đây rồi thì qua bên 'có thể bạn cũng thích(productDetails) không gọi lại đó nữa
   })

   const { data: categoriesData } = useQuery({
      queryKey: ['categories'], //queryConfig giống dependencies trong useEffect
      queryFn: () => getCategories()
   })

   return (
      <div className='bg-gray-200 py-5'>
         <Helmet>
            <title>Trang chủ | Shopee Clone</title>
            <meta
               name='description'
               content='Trang chủ của Shopee Clone - Nơi bạn có thể khám phá và mua sắm các sản phẩm phong phú và đa dạng. Tận hưởng trải nghiệm mua sắm trực tuyến tuyệt vời với Shopee Clone.'
            />
         </Helmet>
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
