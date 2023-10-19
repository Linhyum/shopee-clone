import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Seperate from 'src/components/Seperate/Seperate'
import Button from 'src/components/button/Button'
import { path } from 'src/constants/path'
import { CategoryType } from 'src/types/category.type'
import { QueryConfig } from '../ProductList'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataPrice, priceSchema } from 'src/utils/rules'
import { InputNumber } from 'src/components/InputNumber/InputNumber'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStars from './RatingStars/RatingStars'
import omit from 'lodash/omit'
import { ObjectSchema } from 'yup'
import { useTranslation } from 'react-i18next'
interface Props {
   queryConfig: QueryConfig
   categoriesData: CategoryType[]
}
type FormData = NoUndefinedField<FormDataPrice>
export default function AsideFilter({ queryConfig, categoriesData }: Props) {
   const { t } = useTranslation()
   const { category } = queryConfig
   const navigate = useNavigate()
   const {
      control,
      handleSubmit,
      trigger,
      reset,
      formState: { errors }
   } = useForm<FormData>({
      defaultValues: {
         price_max: '',
         price_min: ''
      },
      mode: 'onSubmit',
      resolver: yupResolver<FormData>(priceSchema as ObjectSchema<FormData>)
   })
   const onSubmit = handleSubmit((data) => {
      navigate({
         pathname: path.home,
         search: createSearchParams({
            ...queryConfig,
            page: '1',
            price_max: data.price_max,
            price_min: data.price_min
         }).toString()
      })
   })

   const handleDeleteAll = () => {
      reset()
      navigate({
         pathname: path.home,
         search: createSearchParams(
            omit({ ...queryConfig, page: '1' }, ['price_max', 'category', 'rating_filter', 'price_min'])
         ).toString()
      })
   }

   return (
      <>
         <Link to={path.home} className={`mt-4 flex items-center gap-x-2 font-semibold ${!category && 'text-primary'}`}>
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
            {t('all categories')}
         </Link>
         <Seperate />
         <ul className='ml-4 flex flex-col gap-y-3'>
            {categoriesData.map((categoryItem) => (
               <li key={categoryItem._id}>
                  <Link
                     className={`${category === categoryItem._id && `relative font-semibold text-primary`}`}
                     to={{
                        pathname: path.home,
                        search: createSearchParams({
                           ...queryConfig,
                           category: categoryItem._id,
                           page: '1'
                        }).toString()
                     }}
                  >
                     {category === categoryItem._id && (
                        <svg viewBox='0 0 4 7' className='absolute -left-4 top-1 h-2 w-2 fill-primary'>
                           <polygon points='4 3.5 0 0 0 7' />
                        </svg>
                     )}
                     {t(categoryItem.name as 'Đồng hồ' | 'Áo thun' | 'Điện thoại')}
                  </Link>
               </li>
            ))}
         </ul>
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
            {t('filter')}
         </div>
         <Seperate />
         <span>{t('price range')}</span>
         <form onSubmit={onSubmit} className='py-2'>
            <div className='flex items-center gap-x-2'>
               <Controller
                  control={control}
                  name='price_min'
                  render={({ field }) => (
                     <InputNumber
                        className='flex-1'
                        placeholder={`₫ ${t('from')}`}
                        classNameInput='h-[30px] w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 dark:bg-slate-800 focus:shadow-sm'
                        {...field}
                        onChange={(e) => {
                           field.onChange(e)
                           trigger('price_max') //khi onchange price_min thì sẽ validate price_max
                        }}
                        classNameError='hidden'
                     />
                  )}
               />
               <div>-</div>
               <Controller
                  control={control}
                  name='price_max'
                  render={({ field }) => (
                     <InputNumber
                        className='flex-1'
                        placeholder={`₫ ${t('to')}`}
                        classNameInput='h-[30px] w-full rounded-sm border dark:bg-slate-800 border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                        {...field}
                        onChange={(e) => {
                           field.onChange(e)
                           trigger('price_min')
                        }}
                        classNameError='hidden'
                     />
                  )}
               />
            </div>
            <div className='min-h-[20px] text-center text-sm text-red-500'>{errors.price_min?.message}</div>
            <Button type='submit' className='w-full bg-primary py-2 text-sm text-white hover:opacity-90'>
               {t('apply')}
            </Button>
         </form>
         <Seperate />
         <span>{t('rating')}</span>
         <RatingStars queryConfig={queryConfig} />
         <Seperate />
         <Button onClick={handleDeleteAll} className='mt-1 w-full bg-primary py-2 text-sm text-white hover:opacity-90'>
            {t('deleteAll')}
         </Button>
      </>
   )
}
