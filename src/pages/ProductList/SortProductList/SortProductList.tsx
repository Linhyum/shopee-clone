import Button from 'src/components/button/Button'
import { sortBy, orderBy } from 'src/constants/product'
import { QueryConfig } from '../ProductList'
import { ProductListParams } from 'src/types/product.type'
import { path } from 'src/constants/path'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
interface Props {
   queryConfig: QueryConfig
   pageSize: number
}
export default function SortProductList({ queryConfig, pageSize }: Props) {
   const page = Number(queryConfig.page)
   const { sort_by = sortBy.createdAt, order } = queryConfig
   const navigate = useNavigate()
   const isActiveSortBy = (sortByValue: Exclude<ProductListParams['sort_by'], undefined>) => {
      return sort_by === sortByValue
   }

   const handleSort = (sortByValue: Exclude<ProductListParams['sort_by'], undefined>) => {
      navigate({
         pathname: '/',
         search: createSearchParams(omit({ ...queryConfig, sort_by: sortByValue }, ['order'])).toString() //order chỉ dùng cho filter theo price
      })
   }

   const handlePriceOrder = (orderValue: Exclude<ProductListParams['order'], undefined>) => {
      navigate({
         pathname: '/',
         search: createSearchParams({ ...queryConfig, sort_by: sortBy.price, order: orderValue }).toString()
      })
   }

   return (
      <div className='flex flex-wrap items-center justify-between gap-2 bg-gray-300/40 px-3 py-4'>
         <div className='flex flex-wrap items-center gap-2'>
            <span className='text-base'>Sắp xếp theo</span>
            <Button
               onClick={() => handleSort('view')}
               className={`h-8 px-4 ${
                  isActiveSortBy('view') ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white hover:bg-slate-100'
               }`}
            >
               Phổ Biến
            </Button>
            <Button
               onClick={() => handleSort('createdAt')}
               className={`h-8 px-4 ${
                  isActiveSortBy('createdAt')
                     ? 'bg-primary text-white hover:bg-primary/90'
                     : 'bg-white hover:bg-slate-100'
               }`}
            >
               Mới Nhất
            </Button>
            <Button
               onClick={() => handleSort('sold')}
               className={`h-8 px-4 ${
                  isActiveSortBy('sold') ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white hover:bg-slate-100'
               }`}
            >
               Bán Chạy
            </Button>
            <select
               className={`h-8 cursor-pointer px-4 text-left capitalize outline-none ${
                  isActiveSortBy('price') ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white hover:bg-slate-100'
               }`}
               value={order || ''}
               onChange={(e) => handlePriceOrder(e.target.value as Exclude<ProductListParams['order'], undefined>)}
            >
               <option className='bg-gray-200 text-gray-400' value='' disabled>
                  Giá
               </option>
               <option className='bg-white text-[#222]' value={orderBy.asc}>
                  Giá: Thấp đến cao
               </option>
               <option className='bg-white text-[#222]' value={orderBy.desc}>
                  Giá: Cao đến thấp
               </option>
            </select>
         </div>
         <div className='flex items-center gap-x-2 text-base'>
            <div>
               <span className='text-primary'>{page}</span>
               <span>/{pageSize}</span>
            </div>
            <div className='flex items-center'>
               {page === 1 ? (
                  <span
                     className={`flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 shadow`}
                  >
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-3 w-3'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                     </svg>
                  </span>
               ) : (
                  <Link
                     to={{
                        pathname: path.home,
                        search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
                     }}
                     className={`flex h-8 w-9 items-center justify-center rounded-bl-sm rounded-tl-sm bg-white shadow hover:bg-slate-100`}
                  >
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-3 w-3'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                     </svg>
                  </Link>
               )}
               {page === pageSize ? (
                  <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-br-sm rounded-tr-sm bg-white/60 shadow'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-3 w-3'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                  </span>
               ) : (
                  <Link
                     to={{
                        pathname: path.home,
                        search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
                     }}
                     className='flex h-8 w-9  items-center justify-center rounded-br-sm rounded-tr-sm bg-white shadow hover:bg-slate-100'
                  >
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-3 w-3'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                  </Link>
               )}
            </div>
         </div>
      </div>
   )
}
