export default function Product() {
   return (
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
         <div className='relative pt-[100%]'>
            <img
               className='absolute top-0 h-full w-full object-cover'
               src='https://api-ecom.duthanhduoc.com/images/aa374023-7a5b-46ea-aca3-dad1b29fb015.jpg'
               alt=''
            />
         </div>
         <div className='flex flex-col gap-y-2 p-2'>
            <div title='Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng' className='line-clamp-2 text-[13px]'>
               Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng
            </div>
            <div className='flex items-center gap-x-1'>
               <span className='text-secondary line-through'>₫3.990.000</span>
               <span className='text-primary'>₫3.190.000</span>
            </div>
            <div className='flex items-center justify-end gap-x-2'>
               <div className='flex items-center'>
                  {Array(5)
                     .fill(0)
                     .map((_, index) => (
                        <div key={index} className='relative'>
                           <div className='absolute left-0 top-0 h-full overflow-hidden' style={{ width: '100%' }}>
                              <svg
                                 enableBackground='new 0 0 15 15'
                                 viewBox='0 0 15 15'
                                 x={0}
                                 y={0}
                                 className='h-3 w-3 fill-yellow-300 text-yellow-300'
                              >
                                 <polygon
                                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeMiterlimit={10}
                                 />
                              </svg>
                           </div>
                           <svg
                              enableBackground='new 0 0 15 15'
                              viewBox='0 0 15 15'
                              x={0}
                              y={0}
                              className='h-3 w-3 fill-current text-gray-300'
                           >
                              <polygon
                                 points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeMiterlimit={10}
                              />
                           </svg>
                        </div>
                     ))}
               </div>
               <span>1,2k Đã bán</span>
            </div>
         </div>
      </div>
   )
}
