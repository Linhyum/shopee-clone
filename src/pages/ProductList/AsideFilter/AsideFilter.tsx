import Button from 'src/components/button/Button'

export default function AsideFilter() {
   return (
      <>
         <div className='mt-4 flex items-center gap-x-2 font-semibold text-primary'>
            <svg
               xmlns='http://www.w3.org/2000/svg'
               fill='none'
               viewBox='0 0 24 24'
               strokeWidth={2}
               stroke='currentColor'
               className='h-5 w-5'
            >
               <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
               />
            </svg>
            Tất cả danh mục
         </div>
         <div className='my-3 border-t border-t-gray-300'></div>
         <div className='ml-4 flex flex-col gap-y-3'>
            <span>Đồng hồ</span>
            <span>Áo thun</span>
            <span>Điện thoại</span>
         </div>
         <div className='mt-4 flex items-center gap-x-2 font-semibold'>
            <svg
               enableBackground='new 0 0 15 15'
               viewBox='0 0 15 15'
               x={0}
               y={0}
               className='h-4 w-3 fill-current stroke-current'
            >
               <g>
                  <polyline
                     fill='none'
                     points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeMiterlimit={10}
                  />
               </g>
            </svg>
            BỘ LỌC TÌM KIẾM
         </div>
         <div className='my-3 border-t border-t-gray-300'></div>
         <span>Khoảng giá</span>

         <form className='py-2'>
            {/* CHƯA HIỂU PHẦN NÀY */}
            <div className='mb-5 flex items-center gap-x-2'>
               <div className='h-[30px] grow'>
                  <input
                     className='h-full w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                     type='text'
                     placeholder='₫ TỪ'
                     name='price_min'
                  />
               </div>
               <div>-</div>
               <div className='h-[30px] grow'>
                  <input
                     className='h-full w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                     type='text'
                     placeholder='₫ ĐẾN'
                     name='price_max'
                  />
               </div>
            </div>
            <Button type='submit' className='w-full bg-primary py-2 text-sm text-white'>
               ÁP DỤNG
            </Button>
         </form>
         <div className='my-3 border-t border-t-gray-300'></div>
         <span>Đánh giá</span>
         <div className='ml-2 flex flex-col gap-y-2 py-1 pt-2'>
            {Array(5)
               .fill(0)
               .map((_, index) => (
                  <div key={index} className='flex cursor-pointer items-center'>
                     {Array(5)
                        .fill(0)
                        .map((_, index) => (
                           <svg key={index} viewBox='0 0 9.5 8' className='mr-1 h-4 w-4'>
                              <defs>
                                 <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                                    <stop offset={0} stopColor='#ffca11' />
                                    <stop offset={1} stopColor='#ffad27' />
                                 </linearGradient>
                                 <polygon
                                    id='ratingStar'
                                    points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                                 />
                              </defs>
                              <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                                 <g transform='translate(-876 -1270)'>
                                    <g transform='translate(155 992)'>
                                       <g transform='translate(600 29)'>
                                          <g transform='translate(10 239)'>
                                             <g transform='translate(101 10)'>
                                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                                             </g>
                                          </g>
                                       </g>
                                    </g>
                                 </g>
                              </g>
                           </svg>
                        ))}
                     <span className='translate-y-[1px] text-sm'>Trở lên</span>
                  </div>
               ))}
         </div>
         <div className='my-3 border-t border-t-gray-300'></div>
         <Button type='submit' className='mt-1 w-full bg-primary py-2 text-sm text-white'>
            XOÁ TẤT CẢ
         </Button>
      </>
   )
}
