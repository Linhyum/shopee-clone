import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
   email: Yup.string().email('Email không đúng định dạng').required('Email là bắt buộc'),
   password: Yup.string().required('Mật khẩu là bắc buộc').min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
   confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu nhập lại không khớp')
      .required('Nhập lại mật khẩu là bắt buộc')
})
export const loginSchema = registerSchema.omit(['confirm_password'])
export type FormDataRegister = Yup.InferType<typeof registerSchema>
export type FormDataLogin = Yup.InferType<typeof loginSchema>

function testPriceMinMax(this: Yup.TestContext<Yup.AnyObject>) {
   const { price_max, price_min } = this.parent
   if (price_min !== '' && price_max !== '') {
      return Number(price_max) >= Number(price_min)
   }
   return price_min !== '' || price_max !== ''
}

export const priceSchema = Yup.object().shape({
   price_min: Yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: testPriceMinMax
   }),
   price_max: Yup.string().test({
      name: 'price-not-allowed',
      message: 'Giá không phù hợp',
      test: testPriceMinMax
   })
})

export type FormDataPrice = Yup.InferType<typeof priceSchema>

export const userSchema = Yup.object().shape({
   name: Yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
   phone: Yup.string().max(20, 'Độ dài tối đa là 20 kí tự'),
   avatar: Yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
   address: Yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
   date_of_birth: Yup.date().max(new Date(), 'Hãy chọn 1 ngày trong quá khứ'),
   password: Yup.string().required('Mật khẩu cũ là bắc buộc').min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
   new_password: Yup.string().required('Mật khẩu mới là bắc buộc').min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
   confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password')], 'Mật khẩu nhập lại không khớp')
      .required('Nhập lại mật khẩu là bắt buộc')
})
export type FormDataUser = Yup.InferType<typeof userSchema>
