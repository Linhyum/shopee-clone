import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productApi } from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating/ProductRating'
import { ProductListParams, ProductType } from 'src/types/product.type'
import { formatNumber, formatNumberWithK, getIdFromNameId } from 'src/utils/utils'
import Product from '../ProductList/Product/Product'
import QuantityController from 'src/components/QuantityController/QuantityController'
import { addToCart } from 'src/apis/purchase.api'
import { toast } from 'react-toastify'
import { purchasesStatus } from 'src/constants/purchase'
import { path } from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { convert } from 'html-to-text'
import Loading from 'src/components/Loading/Loading'

export default function ProductDetails() {
   const { t } = useTranslation()

   const navigate = useNavigate()
   const queryClient = useQueryClient()
   const [buyCount, setBuyCount] = useState<number>(1)
   const { id } = useParams()
   const idProduct = getIdFromNameId(id as string)
   const { data } = useQuery({
      queryKey: ['product', idProduct],
      queryFn: () => {
         document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
         return productApi.getProductDetail(idProduct as string)
      },
      keepPreviousData: true // giữ lại data trước để mỗi lần fetch lại không bị giật trang web
   })

   const product = data?.data.data

   const imageRef = useRef<HTMLImageElement>(null)

   //CÓ THỂ BẠN CŨNG THÍCH
   const queryConfig = { category: product?.category._id }
   const { data: productsData } = useQuery({
      queryKey: ['products', queryConfig], //queryConfig giống dependencies trong useEffect
      queryFn: () => productApi.getProductList(queryConfig as ProductListParams), //vì queryConfig toàn là string nên phải ép kiểu về ProductListParams
      keepPreviousData: true, // giữ lại data trước để mỗi lần fetch lại không bị giật trang web
      enabled: Boolean(product), //chỉ chạy useQuery khi có product
      staleTime: 3 * 60 * 1000
   })

   //slider
   const [currentIndexImg, setCurrentIndexImg] = useState<number[]>([0, 5])
   const [activeImage, setActiveImage] = useState<string>('')
   const currentImages = useMemo(
      () => (product ? product.images.slice(...currentIndexImg) : []),
      [currentIndexImg, product]
   )
   useEffect(() => {
      if (product && product.images.length > 0) {
         setActiveImage(product.images[0])
      }
   }, [product])

   const next = () => {
      if (currentIndexImg[1] < (product as ProductType).images.length) {
         setCurrentIndexImg((prev) => [prev[0] + 1, prev[1] + 1])
      }
   }

   const prev = () => {
      if (currentIndexImg[0] > 0) {
         setCurrentIndexImg((prev) => [prev[0] - 1, prev[1] - 1])
      }
   }

   //ZOOM ẢNH
   const handleImageZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = e.currentTarget.getBoundingClientRect() // kích thước của thẻ div
      const image = imageRef.current as HTMLImageElement
      const { naturalHeight, naturalWidth } = image //kích thước gốc của ảnh
      const { offsetX, offsetY } = e.nativeEvent
      const top = offsetY * (1 - naturalHeight / rect.height)
      const left = offsetX * (1 - naturalWidth / rect.width)
      image.style.width = `${naturalWidth}px`
      image.style.height = `${naturalHeight}px`
      image.style.maxWidth = 'unset'
      image.style.top = `${top}px`
      image.style.left = `${left}px`
   }

   const handleImageZoomLeave = () => {
      imageRef.current?.removeAttribute('style')
   }

   const handleBuyCount = (value: number) => {
      setBuyCount(value)
   }

   //add to cart
   const addToCartMutation = useMutation({
      mutationFn: addToCart
   })

   const handleAddToCart = () => {
      addToCartMutation.mutate(
         { product_id: product?._id as string, buy_count: buyCount },
         {
            onSuccess: (data) => {
               toast.success(data.data.message)
               queryClient.invalidateQueries({ queryKey: ['purchase', { status: purchasesStatus.inCart }] }) // khi gọi mutate của tk này thì tk có querykey là purchase sẽ cập nhật lại(khi thêm giỏ hàng thì tk giỏ hàng của header sẽ update lại)
            }
         }
      )
   }

   const buyNow = async () => {
      const res = await addToCartMutation.mutateAsync({ product_id: product?._id as string, buy_count: buyCount })
      const purchase = res.data.data
      navigate(path.cart, {
         state: {
            purchaseId: purchase._id
         }
      })
      // addToCartMutation.mutateAsync(
      //    { product_id: product?._id as string, buy_count: buyCount },
      //    {
      //       onSuccess: (data) => {
      //          const purchase = data.data.data
      //          navigate(path.cart, {
      //             state: {
      //                purchaseId: purchase._id
      //             }
      //          })
      //       }
      //    }
      // )
   }

   // useEffect(() => {
   //    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
   // }, [idProduct])

   return (
      <div className='bg-gray-200 dark:bg-slate-900 py-6 dark:text-white'>
         {product ? (
            <>
               <Helmet>
                  <title>{product.name}</title>
                  <meta
                     name='description'
                     content={convert(product.description, {
                        limits: {
                           maxDepth: 150
                        }
                     })}
                  />
               </Helmet>
               <div className='container'>
                  <div className='grid grid-cols-12 gap-y-5 bg-white dark:bg-slate-800 p-4 shadow md:gap-x-9'>
                     <div className='col-span-12 md:col-span-5'>
                        <div
                           onMouseMove={handleImageZoom}
                           onMouseLeave={handleImageZoomLeave}
                           className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                        >
                           <img
                              className='absolute left-0 top-0 h-full w-full bg-white object-cover pointer-events-none'
                              src={activeImage}
                              alt={product.name}
                              ref={imageRef}
                           />
                        </div>
                        <div className='relative mt-4 grid grid-cols-5 gap-1'>
                           <button
                              onClick={prev}
                              className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/30 text-white'
                           >
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 strokeWidth='1.5'
                                 stroke='currentColor'
                                 className='h-5 w-5'
                              >
                                 <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                              </svg>
                           </button>
                           {currentImages.map((img) => {
                              const isActive = img === activeImage
                              return (
                                 <div
                                    onMouseEnter={() => setActiveImage(img)}
                                    key={img}
                                    className='relative w-full pt-[100%]'
                                 >
                                    <img
                                       src={img}
                                       alt={product.name}
                                       className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover'
                                    />
                                    {isActive && <div className='absolute inset-0 border-2 border-primary' />}
                                 </div>
                              )
                           })}
                           <button
                              onClick={next}
                              className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/30 text-white'
                           >
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 strokeWidth='1.5'
                                 stroke='currentColor'
                                 className='h-5 w-5'
                              >
                                 <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                              </svg>
                           </button>
                        </div>
                     </div>
                     <div className='col-span-12 flex flex-col gap-y-8 md:col-span-7'>
                        <h1 className='text-xl uppercase'>{product.name}</h1>
                        <div className='flex items-center text-base'>
                           <span className='mr-1 h-6 border border-transparent border-b-primary text-primary'>
                              {product.rating.toFixed(1)}
                           </span>
                           <ProductRating
                              classNameStar1='h-4 w-4 fill-primary text-primary'
                              classNameStar2='h-4 w-4 fill-gray-300 text-gray-30'
                              rating={product.rating}
                           />
                           <div className='mx-4 h-4 w-[1px] bg-gray-300' />
                           <div className='flex items-center gap-x-1'>
                              <span>{formatNumberWithK(product.sold)}</span>
                              <span className='text-secondary dark:text-white'>{t('sold')}</span>
                           </div>
                        </div>
                        <div className='flex w-full flex-col items-center gap-x-3 bg-gray-50 dark:bg-slate-700 p-5 md:flex-row'>
                           <span className='text-base text-secondary dark:text-slate-400 line-through'>
                              ₫{formatNumber(product.price_before_discount)}
                           </span>
                           <span className='text-3xl text-primary'>₫{formatNumber(product.price)}</span>
                           <span className='rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold text-white'>
                              {Math.round((1 - product.price / product.price_before_discount) * 100)}% {t('discount')}
                           </span>
                        </div>
                        <div className='flex flex-wrap items-center gap-5'>
                           <span className='text-base text-secondary dark:text-slate-400'>{t('quantity')}</span>
                           <QuantityController
                              value={buyCount}
                              max={product.quantity}
                              onIncrease={handleBuyCount}
                              onDecrease={handleBuyCount}
                              onType={handleBuyCount}
                           />
                           <span className='text-secondary dark:text-slate-400'>
                              {product.quantity} {t('available')}
                           </span>
                        </div>
                        <div className='flex flex-wrap gap-4 text-base'>
                           <button
                              onClick={handleAddToCart}
                              className='flex items-center rounded-sm border border-primary bg-primary/10 px-5 py-3 text-primary hover:bg-primary/5'
                           >
                              <svg
                                 enableBackground='new 0 0 15 15'
                                 viewBox='0 0 15 15'
                                 x={0}
                                 y={0}
                                 className='mr-[10px] h-5 w-5 fill-current stroke-primary text-primary'
                              >
                                 <g>
                                    <g>
                                       <polyline
                                          fill='none'
                                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeMiterlimit={10}
                                       />
                                       <circle cx={6} cy='13.5' r={1} stroke='none' />
                                       <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                                    </g>
                                    <line
                                       fill='none'
                                       strokeLinecap='round'
                                       strokeMiterlimit={10}
                                       x1='7.5'
                                       x2='10.5'
                                       y1={7}
                                       y2={7}
                                    />
                                    <line
                                       fill='none'
                                       strokeLinecap='round'
                                       strokeMiterlimit={10}
                                       x1={9}
                                       x2={9}
                                       y1='8.5'
                                       y2='5.5'
                                    />
                                 </g>
                              </svg>
                              {t('addToCart')}
                           </button>
                           <button
                              onClick={buyNow}
                              className='rounded-sm bg-primary px-5 py-3 text-white hover:bg-primary/90'
                           >
                              {t('buyNow')}
                           </button>
                        </div>
                     </div>
                  </div>
                  <div className='mt-6 bg-white dark:bg-slate-800 p-4 shadow'>
                     <div className='mb-5 bg-gray-50 dark:bg-slate-700 px-5 py-3'>
                        <span className='text-xl'>{t('desc')}</span>
                     </div>
                     <div
                        className='px-0 sm:px-5 leading-loose'
                        dangerouslySetInnerHTML={{
                           __html: DOMPurify.sanitize(product.description) //DOMPurify chống tấn công XSS
                        }}
                     />
                  </div>
                  <div className='text-secondary dark:text-slate-400 my-6 text-base'>{t('like')}</div>
                  {productsData && (
                     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
                        {productsData.data.data.products.map((productItem) => (
                           <Product key={productItem._id} product={productItem} />
                        ))}
                     </div>
                  )}
               </div>
            </>
         ) : (
            <Loading />
         )}
      </div>
   )
}
