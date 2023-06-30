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
