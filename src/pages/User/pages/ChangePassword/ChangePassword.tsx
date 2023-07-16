import Input from 'src/components/Input/Input'
import Seperate from 'src/components/Seperate/Seperate'
import Button from 'src/components/button/Button'
import { FormDataUser, userSchema } from 'src/utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { updateProfile } from 'src/apis/user.api'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
type FormData = Pick<FormDataUser, 'password' | 'new_password' | 'confirm_password'>
const changePasswordChema = userSchema.pick(['password', 'new_password', 'confirm_password'])
export default function ChangePassword() {
   const {
      handleSubmit,
      register,
      setError,
      reset,
      formState: { errors }
   } = useForm<FormData>({
      defaultValues: {
         password: '',
         new_password: '',
         confirm_password: ''
      },
      mode: 'onSubmit',
      resolver: yupResolver(changePasswordChema)
   })

   //update profile
   const updateProfileMutation = useMutation({
      mutationFn: updateProfile
   })

   const onSubmit = handleSubmit((data) => {
      updateProfileMutation.mutate(
         { password: data.password, new_password: data.new_password },
         {
            onSuccess: () => {
               toast.success('Đổi mật khẩu thành công')
               reset()
            },
            onError: (error) => {
               if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
                  //lấy ra cái lỗi
                  const formError = error.response?.data.data
                  if (formError) {
                     Object.keys(formError).forEach((key) => {
                        if (formError[key as keyof FormData]) {
                           setError(key as keyof FormData, {
                              message: formError[key as keyof FormData],
                              type: 'Server'
                           })
                        }
                     })
                  }
               }
            }
         }
      )
   })

   document.title = 'Đổi mật khẩu | Shopee Clone'
   return (
      <div className='bg-white rounded shadow-lg p-3 md:p-6'>
         <h1 className='capitalize text-lg mb-1'>đổi mật khẩu</h1>
         <p className='text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
         <Seperate />
         <form onSubmit={onSubmit} className='pt-6'>
            <div className='flex flex-col gap-y-2 w-full md:w-[80%] lg:w-[70%]'>
               <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                  <div className='w-full sm:w-[20%] sm:text-right text-gray-700 capitalize sm:-translate-y-3'>
                     Mật khẩu cũ:
                  </div>
                  <Input
                     name='password'
                     type='password'
                     hasIcon
                     className=' w-full sm:w-[80%] flex flex-col gap-y-1'
                     placeholder=' Mật khẩu cũ'
                     classNameInput='w-full h-10 border px-3 border-gray-300 focus:border-blue-500 outline-none rounded'
                     register={register}
                     errorMessage={errors.password?.message}
                  />
               </div>
               <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                  <div className='w-full sm:w-[20%] sm:text-right text-gray-700 capitalize sm:-translate-y-3'>
                     Mật khẩu mới:
                  </div>
                  <Input
                     name='new_password'
                     type='password'
                     hasIcon
                     className=' w-full sm:w-[80%] flex flex-col gap-y-1'
                     placeholder='Mật khẩu mới'
                     classNameInput='w-full h-10 border px-3 border-gray-300 focus:border-blue-500 outline-none rounded'
                     register={register}
                     errorMessage={errors.new_password?.message}
                  />
               </div>

               <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                  <div className='w-full sm:w-[20%] sm:text-right text-gray-700 capitalize sm:-translate-y-3'>
                     Nhập lại mật khẩu:
                  </div>
                  <Input
                     name='confirm_password'
                     type='password'
                     hasIcon
                     className=' w-full sm:w-[80%] flex flex-col gap-y-1'
                     placeholder='Nhập lại mật khẩu'
                     classNameInput='w-full h-10 border px-3 border-gray-300 focus:border-blue-500 outline-none rounded'
                     register={register}
                     errorMessage={errors.confirm_password?.message}
                  />
               </div>

               <div className='flex items-center gap-x-5'>
                  <div className='hidden md:w-[20%] md:block' />
                  <div className='w-full text-center md:w-[80%] md:text-left'>
                     <Button
                        isLoading={updateProfileMutation.isLoading}
                        disabled={updateProfileMutation.isLoading}
                        type='submit'
                        className='bg-primary rounded-sm text-white w-full sm:w-28 h-10 hover:bg-primary/90'
                     >
                        Lưu thông tin
                     </Button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   )
}
