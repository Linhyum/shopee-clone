import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating/ProductRating'
import { path } from 'src/constants/path'
import { ProductType } from 'src/types/product.type'
import { formatNumber, formatNumberWithK } from 'src/utils/utils'

export default function Product({ product }: { product: ProductType }) {
   return (
      <Link
         to={path.home}
         className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'
      >
         <div className='relative pt-[100%]'>
            <img className='absolute left-0 top-0 h-full w-full object-cover' src={product.image} alt={product.name} />
         </div>
         <div className='flex flex-col gap-y-2 p-2'>
            <div title={product.name} className='line-clamp-2 h-10 text-[13px]'>
               {product.name}
            </div>
            <div className='flex flex-col items-center gap-1 sm:flex-row'>
               <span className='text-secondary line-through'>₫{formatNumber(product.price_before_discount)}</span>
               <span className='text-primary'>₫{formatNumber(product.price)}</span>
            </div>
            <div className='flex flex-wrap items-center justify-end gap-2'>
               <ProductRating rating={product.rating} />
               <div className='flex items-center gap-x-1'>
                  <span>{formatNumberWithK(product.sold)}</span>
                  <span>Đã bán</span>
               </div>
            </div>
         </div>
      </Link>
   )
}
