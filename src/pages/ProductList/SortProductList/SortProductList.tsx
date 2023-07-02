import Button from 'src/components/button/Button'

export default function SortProductList() {
   return (
      <div className='flex flex-wrap items-center justify-between gap-2 bg-gray-300/40 px-3 py-4'>
         <div className='flex flex-wrap items-center gap-2'>
            <span className='text-base'>Sắp xếp theo</span>
            <Button className='h-8 bg-white px-4 hover:bg-slate-100'>Phổ Biến</Button>
            <Button className='h-8 bg-white px-4 hover:bg-slate-100'>Mới Nhất</Button>
            <Button className='h-8 bg-white px-4 hover:bg-slate-100'>Bán Chạy</Button>
            <select className='h-8 bg-white px-4 text-left capitalize outline-none hover:bg-slate-100'>
               <option disabled className='bg-white'>
                  Giá
               </option>
               <option value='asc' className='bg-white'>
                  Giá: Thấp đến cao
               </option>
               <option value='desc' className='bg-white'>
                  Giá: Cao đến thấp
               </option>
            </select>
         </div>
         <div className='flex items-center gap-x-2 text-base'>
            <div>
               <span className='text-primary'>1</span>
               <span>/</span>
               <span>3</span>
            </div>
            <div className='flex items-center'>
               <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60  shadow hover:bg-slate-100'>
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
               <span className='flex h-8 w-9  items-center justify-center rounded-bl-sm rounded-tl-sm bg-white  shadow hover:bg-slate-100'>
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
            </div>
         </div>
      </div>
   )
}
