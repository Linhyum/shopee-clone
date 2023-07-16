import { useMutation } from '@tanstack/react-query'
import { updateProfile, uploadAvatar } from 'src/apis/user.api'
import Input from 'src/components/Input/Input'
import Seperate from 'src/components/Seperate/Seperate'
import Button from 'src/components/button/Button'
import { FormDataUser, userSchema } from 'src/utils/rules'
import { useForm, Controller } from 'react-hook-form'
import { InputNumber } from 'src/components/InputNumber/InputNumber'
import { useContext, useEffect, useMemo, useState } from 'react'
import { range } from 'lodash'
import { toast } from 'react-toastify'
import useQueryProfile from 'src/hooks/useQueryProfile'
import { AppContext } from 'src/contexts/app.context'
import { setProfileFromLS } from 'src/utils/auth'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile/InputFile'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = Pick<FormDataUser, 'address' | 'avatar' | 'date_of_birth' | 'name' | 'phone'>
const profileChema = userSchema.pick(['address', 'avatar', 'date_of_birth', 'name', 'phone'])

type FormDataError = Omit<FormData, 'date_of_birth'> & {
   date_of_birth?: string
}
export default function Profile() {
   const [file, setFile] = useState<File>() //file là kiểu dữ liệu có sẵn
   const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]) //lấy ra file ảnh

   const {
      handleSubmit,
      register,
      control,
      setValue,
      setError,
      formState: { errors }
   } = useForm<FormData>({
      defaultValues: {
         address: '',
         avatar: '',
         date_of_birth: new Date(1990, 0, 1), //vì tháng bắt đầu từ 0
         name: '',
         phone: ''
      },
      mode: 'onSubmit',
      resolver: yupResolver(profileChema)
   })

   //lấy ra profile trong localstorage
   const { setProfile } = useContext(AppContext)

   //lấy ra thông tin profile
   const { profileData, refetch } = useQueryProfile()

   //nếu có profileData thì sẽ đổ data vào form
   useEffect(() => {
      if (profileData) {
         setValue('name', profileData.name)
         setValue('address', profileData.address)
         setValue('phone', profileData.phone)
         setValue('avatar', profileData.avatar)
         setValue(
            'date_of_birth',
            profileData.date_of_birth ? new Date(profileData.date_of_birth) : new Date(1990, 0, 1)
         )
      }
   }, [profileData, setValue])

   //update profile
   const updateProfileMutation = useMutation({
      mutationFn: updateProfile
   })

   //upload avatar
   const uploadAvatarMutation = useMutation({
      mutationFn: uploadAvatar
   })
   const onSubmit = handleSubmit(async (data) => {
      try {
         let avatarName = profileData?.avatar
         if (file) {
            const form = new FormData() //FormData là kiểu dữ liệu có sẵn
            form.append('image', file)
            const res = await uploadAvatarMutation.mutateAsync(form)
            avatarName = res.data.data
         }
         const res = await updateProfileMutation.mutateAsync({
            ...data,
            date_of_birth: data.date_of_birth?.toISOString(),
            avatar: avatarName
         })
         toast.success(res?.data.message)
         refetch()
         setProfile(res.data.data)
         setProfileFromLS(res.data.data)
      } catch (error) {
         //nếu có lỗi trả về từ axios thì sẽ lấy ra message lỗi từ axios gắn vào setError của react-hook-form để hiển thị ra ngoài input
         if (isAxiosUnprocessableEntity<ErrorResponse<FormDataError>>(error)) {
            //lấy ra cái lỗi
            const formError = error.response?.data.data
            if (formError) {
               Object.keys(formError).forEach((key) => {
                  if (formError[key as keyof FormDataError]) {
                     setError(key as keyof FormDataError, {
                        message: formError[key as keyof FormDataError],
                        type: 'Server'
                     })
                  }
               })
            }
         }
      }
   })
   useEffect(() => {
      document.title = `${profileData?.name as string} | Shopee Clone`
   }, [profileData?.name])
   return (
      <div className='bg-white rounded shadow-lg p-3 md:p-6'>
         <h1 className='capitalize text-lg mb-1'>hồ sơ của tôi</h1>
         <p className='text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
         <Seperate />
         <form
            onSubmit={onSubmit}
            className='pt-6 flex flex-wrap-reverse md:flex-nowrap gap-y-10 md:gap-x-5 lg:gap-x-12'
         >
            <div className='flex flex-col gap-y-2 w-full md:w-[60%] lg:w-[70%]'>
               <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5 mb-3'>
                  <div className='w-full sm:w-[20%] sm:text-right text-gray-700 capitalize'>Email:</div>
                  <div className='w-full sm:w-[80%]'>{profileData?.email}</div>
               </div>
               <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                  <div className='w-full sm:w-[20%] sm:text-right text-gray-700 capitalize sm:-translate-y-3'>Tên:</div>
                  <Input
                     name='name'
                     className='w-full sm:w-[80%] flex flex-col gap-y-1'
                     placeholder='Tên'
                     classNameInput='w-full h-10 border px-3 border-gray-300 focus:border-blue-500 outline-none rounded'
                     register={register}
                     errorMessage={errors.name?.message}
                  />
               </div>
               <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                  <div className='w-full sm:w-[20%] sm:text-right text-gray-700 capitalize sm:-translate-y-3'>
                     Số điện thoại:
                  </div>
                  <Controller
                     control={control}
                     name='phone'
                     render={({ field }) => (
                        <InputNumber
                           errorMessage={errors.phone?.message}
                           className='w-full sm:w-[80%] flex flex-col gap-y-1'
                           placeholder='Số điện thoại'
                           classNameInput='w-full h-10 border px-3 border-gray-300 focus:border-blue-500 outline-none rounded'
                           {...field}
                           onChange={field.onChange}
                        />
                     )}
                  />
               </div>
               <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                  <div className='w-full sm:w-[20%] sm:text-right text-gray-700 capitalize sm:-translate-y-3'>
                     Địa chỉ:
                  </div>
                  <Input
                     name='address'
                     register={register}
                     errorMessage={errors.address?.message}
                     className='w-full sm:w-[80%] flex flex-col gap-y-1'
                     placeholder='Địa chỉ'
                     classNameInput='w-full h-10 border px-3 border-gray-300 focus:border-blue-500 outline-none rounded'
                  />
               </div>

               <Controller
                  control={control}
                  name='date_of_birth'
                  render={({ field }) => (
                     <DateSelect
                        errorMessage={errors.date_of_birth?.message}
                        value={field.value} //k truyền {...field} được vì select option k dc nhận vào ref(vì trong {...field} có ref)
                        onChange={field.onChange}
                     />
                  )}
               />

               <div className='flex items-center gap-x-5'>
                  <div className='hidden md:w-[20%] md:block' />
                  <div className='w-full text-center md:w-[80%] md:text-left'>
                     <Button
                        type='submit'
                        isLoading={updateProfileMutation.isLoading}
                        disabled={updateProfileMutation.isLoading}
                        className='bg-primary rounded-sm text-white w-full sm:w-28 h-10 hover:bg-primary/90'
                     >
                        Lưu thông tin
                     </Button>
                  </div>
               </div>
            </div>

            <div className='w-full md:w-[40%] lg:w-[30%]'>
               <div className='flex flex-col gap-y-3 items-center md:border-l-[1px] md:border-l-gray-200'>
                  <img
                     src={
                        previewImage ||
                        `https://api-ecom.duthanhduoc.com/images/${profileData?.avatar}` ||
                        'https://bsnl.ch/wp-content/uploads/2019/03/avatar-default-circle.png'
                     }
                     alt='avatar'
                     className='w-28 h-28 rounded-full object-cover'
                  />
                  <InputFile onChange={setFile} />
                  <div className='text-secondary'>
                     <p>Dụng lượng file tối đa 1 MB</p>
                     <p>Định dạng:.JPEG, .PNG</p>
                  </div>
               </div>
            </div>
         </form>
      </div>
   )
}

interface Props {
   //let today: Date = new Date();
   onChange?: (value: Date) => void
   value?: Date
   errorMessage?: string
}

function DateSelect({ errorMessage, onChange, value }: Props) {
   const [date, setDate] = useState({
      day: 1,
      month: 0, //do tháng trong date bắt đầu từ 0
      year: 1990
   })

   useEffect(() => {
      if (value) {
         setDate({ day: value.getDate(), month: value.getMonth(), year: value.getFullYear() })
      }
   }, [value])

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target
      const newDate = {
         ...date,
         [name]: value
      }
      setDate(newDate)
      onChange?.(new Date(newDate.year, newDate.month, newDate.day)) //dùng onchange vì không thể truyền state lên component cha được
   }

   return (
      <>
         <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
            <div className='w-full sm:w-[20%] sm:text-right text-gray-700 capitalize'>Ngày sinh:</div>
            <div className='flex gap-x-3 w-full sm:w-[80%]'>
               <select
                  onChange={handleChange}
                  name='day'
                  value={date.day}
                  className='focus:border-blue-500 cursor-pointer px-2 w-full h-10 rounded border border-gray-300 outline-none'
               >
                  <option disabled>Ngày</option>
                  {/* range của lodash giống render array list */}
                  {range(31).map((item) => (
                     <option key={item} value={item + 1}>
                        {item + 1}
                     </option>
                  ))}
               </select>
               <select
                  onChange={handleChange}
                  name='month'
                  value={date.month}
                  className='focus:border-blue-500 cursor-pointer px-2 w-full h-10 rounded border border-gray-300 outline-none'
               >
                  <option disabled>Tháng</option>
                  {/* do tháng trong date bắt đầu từ 0 */}
                  {range(12).map((item) => (
                     <option key={item} value={item}>
                        {item + 1}
                     </option>
                  ))}
               </select>
               <select
                  onChange={handleChange}
                  name='year'
                  value={date.year}
                  className='focus:border-blue-500 cursor-pointer px-2 w-full h-10 rounded border border-gray-300 outline-none'
               >
                  <option disabled>Năm</option>
                  {range(34).map((item) => (
                     <option key={item} value={1990 + item}>
                        {1990 + item}
                     </option>
                  ))}
               </select>
            </div>
         </div>
         <div className='flex items-center gap-x-5 -mt-1'>
            <div className='hidden md:w-[20%] md:block' />
            <div className='min-h-[20px] text-red-500 text-sm w-full md:w-[80%]'>{errorMessage}</div>
         </div>
      </>
   )
}
