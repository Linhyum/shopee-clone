import { Link } from 'react-router-dom'
import Button from 'src/components/button/Button'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import Input from 'src/components/Input/Input'
import { FormDataLogin, loginSchema } from 'src/utils/rules'

export default function Login() {
   const {
      handleSubmit,
      register,
      formState: { isSubmitting, errors }
   } = useForm<FormDataLogin>({
      mode: 'onSubmit',
      resolver: yupResolver(loginSchema)
   })

   const onSubmit = handleSubmit((data) => {
      try {
         console.log(data)
         toast.success('Đăng nhập thành công')
      } catch (error) {
         toast.error('Email hoặc mật khẩu không đúng')
      }
   })

   useEffect(() => {
      document.title = 'Đăng nhập | Shopee Clone'
   }, [])
   return (
      <div
         style={{
            backgroundImage: 'url(/banner.png)'
         }}
         className='h-[600px] w-full bg-cover bg-center bg-no-repeat'
      >
         <div className='container flex h-full items-center justify-center md:justify-end'>
            <form onSubmit={onSubmit} className='w-full max-w-[450px] rounded-lg  bg-white p-7 shadow-md'>
               <h2 className='mb-5 text-xl'>Đăng nhập</h2>
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
                     register={register}
                     errorMessage={errors.password?.message}
                  />
                  <Button type='submit' isLoading={isSubmitting} disabled={isSubmitting}>
                     ĐĂNG NHẬP
                  </Button>
               </div>
               <p className='mt-7 text-center text-base text-secondary'>
                  Bạn chưa có tài khoản?{' '}
                  <Link className='text-primary' to={'/register'}>
                     Đăng ký
                  </Link>
               </p>
            </form>
         </div>
      </div>
   )
}
