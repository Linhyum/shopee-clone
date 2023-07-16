import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Button from 'src/components/button/Button'
import Input from 'src/components/Input/Input'
import { FormDataRegister, registerSchema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { authApi } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import { path } from 'src/constants/path'

export default function Register() {
   const { setIsAuthenticated, setProfile } = useContext(AppContext)
   const {
      handleSubmit,
      register,
      setError,
      formState: { errors }
   } = useForm<FormDataRegister>({
      mode: 'onSubmit',
      resolver: yupResolver(registerSchema)
   })

   const registerAccountMutation = useMutation({
      mutationFn: (body: Omit<FormDataRegister, 'confirm_password'>) => authApi.registerAccount(body)
   })

   const onSubmit = handleSubmit((data) => {
      //data này là từ cái form nhập vào(email, password)
      const body = omit(data, ['confirm_password'])
      registerAccountMutation.mutate(body, {
         //đây là cái data chứa thông tin người dùng trả về khi đăng ký thành công
         onSuccess: (data) => {
            setIsAuthenticated(true)
            setProfile(data.data.data.user)
            toast.success('Đăng ký thành công')
         },
         onError: (error) => {
            //nếu có lỗi trả về từ axios thì sẽ lấy ra message lỗi từ axios gắn vào setError của react-hook-form để hiển thị ra ngoài input
            if (isAxiosUnprocessableEntity<ErrorResponse<Omit<FormDataRegister, 'confirm_password'>>>(error)) {
               //lấy ra cái lỗi
               const formError = error.response?.data.data
               if (formError) {
                  Object.keys(formError).forEach((key) => {
                     if (formError[key as keyof Omit<FormDataRegister, 'confirm_password'>]) {
                        setError(key as keyof Omit<FormDataRegister, 'confirm_password'>, {
                           message: formError[key as keyof Omit<FormDataRegister, 'confirm_password'>],
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

   document.title = 'Đăng ký | Shopee Clone'
   return (
      <div
         style={{
            backgroundImage: 'url(/banner.png)'
         }}
         className='h-[600px] w-full bg-cover bg-center bg-no-repeat'
      >
         <div className='container flex h-full items-center justify-center md:justify-end'>
            <form onSubmit={onSubmit} className='w-full max-w-[450px] rounded-lg  bg-white p-7 shadow-md'>
               <h2 className='mb-5 text-xl'>Đăng ký</h2>
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
                  <Input
                     name='confirm_password'
                     placeholder='Confirm Password'
                     hasIcon
                     type='password'
                     register={register}
                     errorMessage={errors.confirm_password?.message}
                  />
                  <Button
                     type='submit'
                     isLoading={registerAccountMutation.isLoading}
                     disabled={registerAccountMutation.isLoading}
                     className='w-full rounded-md bg-primary py-3 text-base text-white disabled:opacity-50'
                  >
                     ĐĂNG KÝ
                  </Button>
               </div>
               <p className='mt-7 text-center text-base text-secondary'>
                  Bạn đã có tài khoản?{' '}
                  <Link className='text-primary' to={path.login}>
                     Đăng nhập
                  </Link>
               </p>
            </form>
         </div>
      </div>
   )
}
