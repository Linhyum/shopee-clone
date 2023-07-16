import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export interface BodyUpdateProfile {
   address?: string
   date_of_birth?: string
   name?: string
   phone?: string
   avatar?: string
   password?: string
   new_password?: string
}

export const getProfile = () => http.get<SuccessResponse<User>>('/me')

export const updateProfile = (body: BodyUpdateProfile) => http.put<SuccessResponse<User>>('/user', body)

//response trả về là url hình ảnh(SuccessResponse<string>)
// FormData là kiểu dữ liệu có sẵn
export const uploadAvatar = (body: FormData) =>
   http.post<SuccessResponse<string>>('/user/upload-avatar', body, {
      headers: {
         'Content-Type': 'multipart/form-data'
      }
   })
