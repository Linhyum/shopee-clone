import { Link } from 'react-router-dom'
import Button from 'src/components/button/Button'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import Input from 'src/components/Input/Input'
import { FormDataLogin, loginSchema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { authApi } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import { path } from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
export default function Login() {
   const { t } = useTranslation()
   const { setIsAuthenticated, setProfile } = useContext(AppContext)
   const {
      handleSubmit,
      register,
      setError,
      formState: { errors }
   } = useForm<FormDataLogin>({
      mode: 'onSubmit',
      resolver: yupResolver(loginSchema)
   })

   const loginMutation = useMutation({
      mutationFn: (body: FormDataLogin) => authApi.login(body)
   })
   const onSubmit = handleSubmit((data) => {
      //data này là từ cái form nhập vào(email, password)
      loginMutation.mutate(data, {
         //đây là cái data chứa thông tin người dùng trả về khi đăng ký thành công
         onSuccess: (data) => {
            setIsAuthenticated(true)
            setProfile(data.data.data.user)
            toast.success('Đăng nhập thành công')
         },
         onError: (error) => {
            //nếu có lỗi trả về từ axios thì sẽ lấy ra message lỗi từ axios gắn vào setError của react-hook-form để hiển thị ra ngoài input
            if (isAxiosUnprocessableEntity<ErrorResponse<FormDataLogin>>(error)) {
               //lấy ra cái lỗi
               const formError = error.response?.data.data
               if (formError) {
                  Object.keys(formError).forEach((key) => {
                     if (formError[key as keyof FormDataLogin]) {
                        setError(key as keyof FormDataLogin, {
                           message: formError[key as keyof FormDataLogin],
                           type: 'Server'
                        })
                     }
                  })
               }
               // if (formError?.email) {
               //    setError('email', { message: formError.email, type: 'Server' })
               // }
               // if (formError?.password) {
               //    setError('password', { message: formError.password, type: 'Server' })
               // }
            }
         }
      })
   })

   return (
      <div
         style={{
            backgroundImage: 'url(/banner.png)'
         }}
         className='h-[600px] w-full bg-cover bg-center bg-no-repeat'
      >
         <Helmet>
            <title>{`${t('login')} | Shopee Clone`}</title>
            <meta
               name='description'
               content='Trang Đăng nhập của Shopee Clone. Đăng nhập để truy cập vào tài khoản của bạn và bắt đầu mua sắm trực tuyến với Shopee Clone.'
            />
         </Helmet>
         <div className='container flex h-full items-center justify-center md:justify-end'>
            <form onSubmit={onSubmit} className='w-full max-w-[450px] rounded-lg  bg-white p-7 shadow-md'>
               <h2 className='mb-5 text-xl'>{t('login')}</h2>
               <div className='flex flex-col gap-y-3'>
                  <Input
                     name='email'
                     placeholder='Email'
                     type='text'
                     register={register}
                     errorMessage={errors.email?.message}
                  />
                  <Input
                     name='password'
                     placeholder='Password'
                     type='password'
                     hasIcon
                     register={register}
                     errorMessage={errors.password?.message}
                  />
                  <Button
                     type='submit'
                     isLoading={loginMutation.isLoading}
                     disabled={loginMutation.isLoading}
                     className='w-full rounded-md bg-primary py-3 text-base uppercase text-white disabled:opacity-50'
                  >
                     {t('login')}
                  </Button>
               </div>
               <p className='mt-7 text-center text-base text-secondary'>
                  {t('noAccount')}?{' '}
                  <Link className='text-primary' to={path.register}>
                     {t('register')}
                  </Link>
               </p>
            </form>
         </div>
      </div>
   )
}
