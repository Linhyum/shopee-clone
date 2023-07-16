import { Link, NavLink, Outlet } from 'react-router-dom'
import { path } from 'src/constants/path'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import classNames from 'classnames'

import useQueryProfile from 'src/hooks/useQueryProfile'
export default function UserLayout() {
   return (
      <MainLayout>
         <div className='bg-gray-200 py-14'>
            <div className='container'>
               <div className='grid grid-cols-12 gap-x-3 gap-y-8'>
                  <div className='col-span-12 md:col-span-2'>
                     <UserSideNav />
                  </div>
                  <div className='col-span-12 md:col-span-10'>
                     <Outlet />
                  </div>
               </div>
            </div>
         </div>
      </MainLayout>
   )
}

function UserSideNav() {
   const { profileData } = useQueryProfile()

   return (
      <>
         <div className='flex md:flex-col lg:flex-row items-center gap-x-2 mt-3'>
            <Link to={path.profile}>
               <img
                  src={
                     `https://api-ecom.duthanhduoc.com/images/${profileData?.avatar}` ||
                     'https://bsnl.ch/wp-content/uploads/2019/03/avatar-default-circle.png'
                  }
                  alt='avatar'
                  className='w-12 h-12 object-cover rounded-full'
               />
            </Link>
            <div>
               <span className='font-semibold text-gray-600 break-all'>{profileData?.name || profileData?.email}</span>
               <Link to={path.profile} className='flex items-center gap-x-1 mt-1'>
                  <svg width={12} height={12} viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                     <path
                        d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                        fill='#9B9B9B'
                        fillRule='evenodd'
                     />
                  </svg>
                  <span className='text-secondary capitalize'>Sửa hồ sơ</span>
               </Link>
            </div>
         </div>
         <div className='border-t-[1px] border-t-gray-300 my-5' />
         <div className='flex flex-col gap-y-4 pt-2 text-gray-600'>
            <NavLink
               to={path.profile}
               className={({ isActive }) =>
                  classNames('capitalize flex items-center gap-x-2', { 'text-red-500': isActive })
               }
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-blue-700'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                  />
               </svg>
               tài khoản của tôi
            </NavLink>
            <NavLink
               to={path.changePassword}
               className={({ isActive }) =>
                  classNames('capitalize flex items-center gap-x-2', { 'text-red-500': isActive })
               }
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 text-blue-700'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
                  />
               </svg>
               đổi mật khẩu
            </NavLink>
            <NavLink
               to={path.historyPurchase}
               className={({ isActive }) =>
                  classNames('capitalize flex items-center gap-x-2', { 'text-red-500': isActive })
               }
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-5 text-blue-700'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                  />
               </svg>
               đơn mua
            </NavLink>
         </div>
      </>
   )
}
