import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import { getPurchases } from 'src/apis/purchase.api'
import { path } from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatNumber, generateNameId } from 'src/utils/utils'

const purchaseLinks = [
   { text: 'Tất cả', link: purchasesStatus.all },
   { text: 'Chờ xác nhận', link: purchasesStatus.waitForComfirmation },
   { text: 'Chờ lấy hàng', link: purchasesStatus.waitForGetting },
   { text: 'Đang giao', link: purchasesStatus.inProgress },
   { text: 'Đã giao', link: purchasesStatus.delivered },
   { text: 'Đã huỷ', link: purchasesStatus.cancelled }
]

export default function HistoryPurchase() {
   const param: { status?: string } = useQueryParams() //mặc định param lấy trên url về đều là string
   const status: number = Number(param.status) || purchasesStatus.all

   const { data } = useQuery({
      queryKey: ['purchase', { status: status }],
      queryFn: () => getPurchases({ status: status as PurchaseListStatus })
   })
   const purchaseData = data?.data.data
   useEffect(() => {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
   }, [status])
   document.title = 'Đơn mua | Shopee Clone'
   return (
      <>
         <div className='bg-white sticky top-0 rounded-sm grid grid-cols-12 items-center'>
            {purchaseLinks.map((purchaseLink) => (
               <Link
                  key={purchaseLink.link}
                  className={classNames(
                     'col-span-4 sm:col-span-3 lg:col-span-2 text-center py-4 sm:p-4 border-b-[2px] border-gray-300',
                     {
                        'text-primary !border-primary': status === purchaseLink.link
                     }
                  )}
                  to={{
                     pathname: path.historyPurchase,
                     search: createSearchParams({ status: purchaseLink.link.toString() }).toString()
                  }}
               >
                  {purchaseLink.text}
               </Link>
            ))}
         </div>
         {purchaseData && (
            <>
               <div className='overflow-auto'>
                  <div className='min-w-[700px]'>
                     {purchaseData?.length > 0 && (
                        <div className='mt-4 flex flex-col gap-y-4'>
                           {purchaseData.map((purchase) => (
                              <Link
                                 to={`${path.home}${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product._id
                                 })}`}
                                 key={purchase._id}
                                 className='p-5 gap-x-3 flex items-start h-36 bg-white shadow rounded-sm'
                              >
                                 <img
                                    src={purchase.product.image}
                                    className='w-20 h-20 object-cover'
                                    alt={purchase.product.name}
                                 />
                                 <div className='flex-1 truncate'>
                                    <p title={purchase.product.name} className='mb-3 truncate'>
                                       {purchase.product.name}
                                    </p>
                                    <span>x{purchase.buy_count}</span>
                                 </div>
                                 <div className='ml-auto flex flex-col h-full justify-between items-end'>
                                    <div>
                                       <span className='text-secondary line-through'>
                                          ₫{formatNumber(purchase.product.price_before_discount)}
                                       </span>
                                       <span className='text-primary ml-2'>
                                          ₫{formatNumber(purchase.product.price)}
                                       </span>
                                    </div>
                                    <div>
                                       <span>Tổng giá tiền</span>
                                       <span className='text-lg ml-3 text-primary'>
                                          ₫{formatNumber(purchase.price * purchase.buy_count)}
                                       </span>
                                    </div>
                                 </div>
                              </Link>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
               {purchaseData?.length === 0 && (
                  <div className='bg-white mt-4 h-[600px] rounded-sm shadow flex flex-col gap-y-5 items-center justify-center'>
                     <img
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png'
                        alt='no-purchase'
                        className='w-28 h-28 object-cover'
                     />
                     <p className='text-lg'>Chưa có đơn hàng</p>
                  </div>
               )}
            </>
         )}
      </>
   )
}
