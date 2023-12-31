import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import React, { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { buyProducts, deletePurchases, getPurchases, updatePurchases } from 'src/apis/purchase.api'
import QuantityController from 'src/components/QuantityController/QuantityController'
import Button from 'src/components/button/Button'
import { path } from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'
import { formatNumber, generateNameId, totalPrice, totalSavings } from 'src/utils/utils'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet'
export default function Cart() {
   const { t } = useTranslation()
   const location = useLocation()
   const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
   const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
   const { data, refetch } = useQuery({
      queryKey: ['purchase', { status: purchasesStatus.inCart }],
      queryFn: () => getPurchases({ status: purchasesStatus.inCart })
   })

   //update purchase
   const updatePurchaseMutation = useMutation({
      mutationFn: updatePurchases,
      onSuccess: () => {
         refetch()
      }
   })

   //delete purchase
   const deletePurchaseMutation = useMutation({
      mutationFn: deletePurchases,
      onSuccess: () => {
         refetch()
      }
   })

   //buy purchase
   const buyProductMutation = useMutation({
      mutationFn: buyProducts,
      onSuccess: () => {
         refetch()
         toast.success('Mua hàng thành công')
      }
   })

   const purchaseInCartData = data?.data.data
   //thêm disabled và checked cho purchaseInCartData
   useEffect(() => {
      if (purchaseInCartData) {
         setExtendedPurchases((prev) => {
            const extendedPurchasesObj = keyBy(prev, '_id') //để khi thay đổi số lượng(handleQuantity) thì checked vẫn giữ nguyên
            return purchaseInCartData.map((purchase) => {
               const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
               return {
                  ...purchase,
                  disabled: false,
                  checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObj[purchase._id]?.checked)
               }
            })
         })
      }
   }, [choosenPurchaseIdFromLocation, purchaseInCartData, setExtendedPurchases])

   //khi reload lại thì mất cái đã checked trong mua ngay
   useEffect(() => {
      return () => {
         history.replaceState(null, '')
      }
   }, [])

   const handleChecked = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // setExtendedPurchases((prev) =>
      //    prev.map((purchase, index) => {
      //       if (index === productIndex) {
      //          return { ...purchase, checked: e.target.checked }
      //       }
      //       return purchase
      //    })
      // )
      setExtendedPurchases(
         produce((draft) => {
            draft[purchaseIndex].checked = e.target.checked
         })
      )
   }

   const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])

   const handleIsAllChecked = () => {
      setExtendedPurchases((prev) => prev.map((purchase) => ({ ...purchase, checked: !isAllChecked })))
   }

   const extendedPurchasesChecked = useMemo(
      () => extendedPurchases.filter((purchase) => purchase.checked),
      [extendedPurchases]
   ) //lấy ra những sản phẩm đang checked

   const handleQuantity = (purchaseIndex: number, value: number) => {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
         produce((draft) => {
            draft[purchaseIndex].disabled = true
         })
      )
      if (purchaseInCartData && purchaseInCartData[purchaseIndex].buy_count !== value) {
         updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
      } else {
         setExtendedPurchases(
            produce((draft) => {
               draft[purchaseIndex].disabled = false
            })
         )
      }
   }

   const handleTypeQuantity = (purchaseIndex: number, value: number) => {
      setExtendedPurchases(
         produce((draft) => {
            draft[purchaseIndex].buy_count = value
         })
      )
   }

   const handleDetelePurchase = (purchaseIndex: number) => {
      const purchase = extendedPurchases[purchaseIndex]
      deletePurchaseMutation.mutate([purchase._id])
   }

   const handleDetelePurchases = () => {
      const result = extendedPurchasesChecked.map((purchase) => purchase._id)
      if (result.length > 0) {
         Swal.fire({
            title: `Bạn muốn xoá tất cả sản phẩm?`,
            text: 'Bạn sẽ không thể hoàn tác hành động này!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xoá tất cả'
         }).then(async (result) => {
            if (result.isConfirmed) {
               const result = extendedPurchasesChecked.map((purchase) => purchase._id)
               deletePurchaseMutation.mutate(result)
               Swal.fire({ text: 'Xoá sản phẩm thành công!', icon: 'success' })
            }
         })
      }
   }

   const handleBuyProduct = () => {
      const result: { product_id: string; buy_count: number }[] = extendedPurchasesChecked.map((purchase) => ({
         product_id: purchase.product._id,
         buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(result)
   }

   return (
      <div className='bg-gray-200 dark:bg-slate-900 dark:text-white py-16'>
         <Helmet>
            <title>{`${t('cart')} | Shopee Clone`}</title>
            <meta
               name='description'
               content={
                  'Danh sách sản phẩm trong giỏ hàng của bạn trên Shopee Clone. Kiểm tra các mặt hàng đã thêm vào giỏ, điều chỉnh số lượng và tiến hành thanh toán để hoàn tất mua sắm.'
               }
            />
         </Helmet>
         <div className='container'>
            {purchaseInCartData && purchaseInCartData.length > 0 ? (
               <>
                  <div className='overflow-auto'>
                     <div className='min-w-[1200px]'>
                        <div className='grid grid-cols-12 rounded-sm bg-white dark:bg-slate-800 py-5 px-9 capitalize text-secondary dark:text-white shadow'>
                           <div className='col-span-6'>
                              <div className='flex items-center'>
                                 <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                    <input
                                       type='checkbox'
                                       checked={isAllChecked}
                                       onChange={handleIsAllChecked}
                                       className='h-5 w-5 accent-primary cursor-pointer'
                                    />
                                 </div>
                                 <div className='flex-grow'>{t('product')}</div>
                              </div>
                           </div>
                           <div className='col-span-6'>
                              <div className='grid grid-cols-5 text-center'>
                                 <div className='col-span-2'>{t('unitPrice')}</div>
                                 <div className='col-span-1'>{t('quantity')}</div>
                                 <div className='col-span-1'>{t('totalPrice')}</div>
                                 <div className='col-span-1'>{t('action')}</div>
                              </div>
                           </div>
                        </div>

                        <div className='my-3 rounded-sm bg-white dark:bg-slate-800 p-5 shadow flex flex-col gap-y-5'>
                           {extendedPurchases?.map((purchase, index) => (
                              <div
                                 key={purchase._id}
                                 className='grid grid-cols-12 items-center rounded-sm border border-gray-200 py-5 px-4 text-center dark:text-white text-secondary'
                              >
                                 <div className='col-span-6 flex'>
                                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                       <input
                                          checked={purchase.checked}
                                          onChange={handleChecked(index)}
                                          type='checkbox'
                                          className='h-5 w-5 accent-primary cursor-pointer'
                                       />
                                    </div>
                                    <Link
                                       to={`${path.home}${generateNameId({
                                          name: purchase.product.name,
                                          id: purchase.product._id
                                       })}`}
                                       className='flex flex-grow items-center'
                                    >
                                       <div className='h-20 w-20 flex-shrink-0'>
                                          <img src={purchase.product.image} alt={purchase.product.name} />
                                       </div>
                                       <div className='flex-grow px-2 text-left line-clamp-2'>
                                          {purchase.product.name}
                                       </div>
                                    </Link>
                                 </div>
                                 <div className='col-span-6 grid grid-cols-5 items-center'>
                                    <div className='col-span-2'>
                                       <div className='flex items-center gap-x-3 justify-center'>
                                          <span className='text-gray-400 line-through'>
                                             ₫{formatNumber(purchase.price_before_discount)}
                                          </span>
                                          <span>₫{formatNumber(purchase.price)}</span>
                                       </div>
                                    </div>
                                    <div className='col-span-1'>
                                       <QuantityController
                                          onIncrease={(value) => handleQuantity(index, value)}
                                          onDecrease={(value) => handleQuantity(index, value)}
                                          onFocusOut={(value) => handleQuantity(index, value)}
                                          onType={(value) => handleTypeQuantity(index, value)}
                                          max={purchase.product.quantity}
                                          value={purchase.buy_count}
                                          disabled={purchase.disabled}
                                          disabledButtons={purchase.disabled}
                                       />
                                    </div>
                                    <div className='col-span-1'>
                                       <span className='text-primary'>
                                          ₫{formatNumber(purchase.product.price * purchase.buy_count)}
                                       </span>
                                    </div>
                                    <div className='col-span-1'>
                                       <button
                                          onClick={() => handleDetelePurchase(index)}
                                          className='transition-colors hover:text-primary'
                                       >
                                          {t('delete')}
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className='sticky bottom-0 border border-gray-100 z-10 mt-8 flex flex-col rounded-sm bg-white dark:bg-slate-800 p-5 shadow md:flex-row md:items-center'>
                     <div className='flex gap-x-5 items-center text-base'>
                        <div className='flex flex-shrink-0 items-center justify-center'>
                           <input
                              checked={isAllChecked}
                              onChange={handleIsAllChecked}
                              type='checkbox'
                              className='h-5 w-5 accent-primary cursor-pointer'
                           />
                        </div>
                        <button onClick={handleIsAllChecked}>
                           {t('selectAll')} ({extendedPurchases?.length})
                        </button>
                        <button onClick={handleDetelePurchases} className='hover:text-primary transition-colors'>
                           {t('delete')}
                        </button>
                     </div>

                     <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                        <div>
                           <div className='flex items-center'>
                              <div className='text-base'>
                                 {t('totalPayment')} ({extendedPurchasesChecked.length} {t('item')}):
                              </div>
                              <div className='ml-2 text-2xl text-primary'>
                                 ₫{formatNumber(totalPrice(extendedPurchasesChecked))}
                              </div>
                           </div>
                           <div className='flex items-center text-sm gap-x-5 sm:justify-end'>
                              <div className='text-secondary dark:text-white'>{t('saved')}:</div>
                              <div className='text-primary'>
                                 ₫{formatNumber(totalSavings(extendedPurchasesChecked))}
                              </div>
                           </div>
                        </div>
                        <Button
                           onClick={handleBuyProduct}
                           isLoading={buyProductMutation.isLoading}
                           disabled={buyProductMutation.isLoading || extendedPurchasesChecked.length === 0}
                           className='mt-5 flex h-10 disabled:opacity-70 w-52 items-center justify-center bg-primary uppercase text-white hover:bg-primary/90 sm:ml-4 sm:mt-0'
                        >
                           {t('checkOut')}
                        </Button>
                     </div>
                  </div>
               </>
            ) : (
               <div className='text-center'>
                  <img
                     src='https://shopee-clone-ts.vercel.app/assets/no-product.b0846037.png'
                     alt='no purchase'
                     className='mx-auto h-24 w-24'
                  />
                  <div className='mt-5 font-bold text-secondary text-base'>{t('emty')}</div>
                  <div className='mt-5 text-center'>
                     <Link
                        to={path.home}
                        className='rounded-sm bg-primary px-10 py-2 uppercase text-white transition-all hover:bg-primary/90'
                     >
                        {t('buyNow')}
                     </Link>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}
