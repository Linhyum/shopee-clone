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
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
type FormData = Pick<FormDataUser, 'password' | 'new_password' | 'confirm_password'>
const changePasswordChema = userSchema.pick(['password', 'new_password', 'confirm_password'])
export default function ChangePassword() {
   const { t } = useTranslation()
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

   return (
      <div className='bg-white dark:bg-slate-800 rounded shadow-lg p-3 md:p-6'>
         <Helmet>
            <title>{`${t('changePassword')} | Shopee Clone`}</title>
            <meta
               name='description'
               content={
                  'Trang Đổi mật khẩu trên Shopee Clone. Cập nhật mật khẩu mới để bảo mật tài khoản và đảm bảo an toàn cho việc sử dụng dịch vụ trên Shopee Clone.'
               }
            />
         </Helmet>
         <h1 className='capitalize text-lg mb-1'>{t('changePassword')}</h1>
         <p className='text-gray-700 dark:text-slate-400'>{t('manage')}</p>
         <Seperate />
         <form onSubmit={onSubmit} className='pt-6'>
            <div className='flex flex-col gap-y-2 w-full md:w-[80%] lg:w-[70%]'>
               <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                  <div className='w-full sm:w-[20%] sm:text-right text-gray-700 dark:text-slate-400 capitalize sm:-translate-y-3'>
                     {t('oldPassword')}:
                  </div>
                  <Input
                     name='password'
                     type='password'
                     hasIcon
                     className=' w-full sm:w-[80%] flex flex-col gap-y-1'
                     placeholder={t('oldPassword')}
                     classNameInput='w-full h-10 border px-3 border-gray-300 dark:bg-slate-700 focus:border-blue-500 outline-none rounded'
                     register={register}
                     errorMessage={errors.password?.message}
                  />
               </div>
               <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                  <div className='w-full sm:w-[20%] sm:text-right text-gray-700 dark:text-slate-400 capitalize sm:-translate-y-3'>
                     {t('newPassword')}:
                  </div>
                  <Input
                     name='new_password'
                     type='password'
                     hasIcon
                     className='w-full sm:w-[80%] flex flex-col gap-y-1'
                     placeholder={t('newPassword')}
                     classNameInput='w-full h-10 border px-3 border-gray-300 dark:bg-slate-700 focus:border-blue-500 outline-none rounded'
                     register={register}
                     errorMessage={errors.new_password?.message}
                  />
               </div>

               <div className='flex flex-col sm:flex-row items-center gap-y-1 gap-x-5'>
                  <div className='w-full sm:w-[20%] sm:text-right text-gray-700 dark:text-slate-400 capitalize sm:-translate-y-3'>
                     {t('confirmPassword')}:
                  </div>
                  <Input
                     name='confirm_password'
                     type='password'
                     hasIcon
                     className='w-full sm:w-[80%] flex flex-col gap-y-1'
                     placeholder={t('confirmPassword')}
                     classNameInput='w-full h-10 border px-3 border-gray-300 dark:bg-slate-700 focus:border-blue-500 outline-none rounded'
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
                        {t('saveInfo')}
                     </Button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   )
}
