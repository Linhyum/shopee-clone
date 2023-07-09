import { Link, createSearchParams } from 'react-router-dom'
import { path } from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface Props {
   queryConfig: QueryConfig
   pageSize: number
}
const RANGE = 1
export default function Pagination({ queryConfig, pageSize }: Props) {
   const page = Number(queryConfig.page)
   const renderPagination = () => {
      let dotAfter = false
      let dotBefore = false
      const renderDotBefore = (index: number) => {
         if (!dotBefore) {
            dotBefore = true
            return (
               <span key={index} className='flex h-9 w-9 items-center justify-center rounded bg-white shadow-sm'>
                  ...
               </span>
            )
         }
         return null
      }
      const renderDotAfter = (index: number) => {
         if (!dotAfter) {
            dotAfter = true
            return (
               <span key={index} className='flex h-9 w-9 items-center justify-center rounded bg-white shadow-sm'>
                  ...
               </span>
            )
         }
         return null
      }
      return Array(pageSize)
         .fill(0)
         .map((_, index) => {
            const pageNumber = index + 1
            //trường hợp có dấu ... bên phải (1 2 3 4 [5] 6 7 ... 19 20)(1)
            //page hiện tại phải <= 5(page <= RANGE * 2 + 1) để thoả trường hợp trên( nếu là 6 thì sẽ xuất hiện ... bên trái )
            //nếu pageNumber > page + RANGE ((1) là số 8) && pageNumber <= pageSize - RANGE ((1) là số 18) thì chèn vào dấu ...
            if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
               //chỉ hiện ... lần đầu tiên, tất cả những cái sau là null
               return renderDotAfter(index)
            } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
               if (pageNumber < page - RANGE && pageNumber > RANGE) {
                  return renderDotBefore(index)
               } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
                  return renderDotAfter(index)
               }
            } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
               return renderDotBefore(index)
            }
            return (
               <Link
                  to={{
                     pathname: path.home,
                     search: createSearchParams({ ...queryConfig, page: pageNumber.toString() }).toString() //createSearchParams giúp chuyển {page:1,limit:20} thành page=1&limit=20
                  }}
                  key={index}
                  className={`flex h-9 w-9 items-center justify-center rounded bg-white shadow-sm ${
                     page === pageNumber && 'border border-cyan-500'
                  }`}
               >
                  {pageNumber}
               </Link>
            )
         })
   }
   return (
      <div className='mt-5 flex flex-wrap justify-center gap-4 text-base'>
         {page === 1 ? (
            <span className={`cursor-not-allowed rounded bg-white/60 px-3 py-[6px] shadow-sm`}>Prev</span>
         ) : (
            <Link
               to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: (page - 1).toString() }).toString()
               }}
               className={`rounded bg-white px-3 py-[6px] shadow-sm`}
            >
               Prev
            </Link>
         )}
         {renderPagination()}
         {page === pageSize ? (
            <span className='cursor-not-allowed rounded bg-white/60 px-3 py-[6px] shadow-sm'>Next</span>
         ) : (
            <Link
               to={{
                  pathname: path.home,
                  search: createSearchParams({ ...queryConfig, page: (page + 1).toString() }).toString()
               }}
               className='rounded bg-white px-3 py-[6px] shadow-sm'
            >
               Next
            </Link>
         )}
      </div>
   )
}
