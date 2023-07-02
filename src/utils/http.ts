import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenFromLS, setProfileFromLS } from './auth'
import { path } from 'src/constants/path'
class Http {
   instance: AxiosInstance
   private accessToken: string
   constructor() {
      this.accessToken = getAccessTokenFromLS()
      this.instance = axios.create({
         baseURL: 'https://api-ecom.duthanhduoc.com',
         timeout: 10_000,
         headers: {
            'Content-Type': 'application/json'
         }
      })

      //nếu có accesstoken (đã login hoặc register rồi) thì sẽ gửi request lên server để xác thực
      this.instance.interceptors.request.use(
         (config) => {
            if (this.accessToken) {
               config.headers.Authorization = this.accessToken
               return config
            }
            return config
         },
         (error) => {
            return Promise.reject(error)
         }
      )

      //interceptor giống như là trung gian, trước khi gửi request lên server sẽ đi qua nó hoặc trước khi nhận data thì cũng sẽ đi qua nó. Mục đích là để tiền xử lý các tác vụ.
      this.instance.interceptors.response.use(
         (response) => {
            //khi đăng nhập(hoặc đăng ký) thành công thì sẽ chạy qua interceptor để lấy ra response(dữ liệu trả về)
            const { url } = response.config
            if (url === path.login || url === path.register) {
               this.accessToken = (response.data as AuthResponse).data.access_token
               setAccessTokenFromLS(this.accessToken)
               setProfileFromLS((response.data as AuthResponse).data.user)
            } else if (url === path.logout) {
               this.accessToken = ''
               clearLS()
            }
            return response
         },
         // (xử lý những lỗi khác của axios ngoài lỗi 422(đăng ký thất bại))
         (error: AxiosError) => {
            if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               const data: any | undefined = error.response?.data
               const message = data.message || error.message
               toast.error(message)
            }
            return Promise.reject(error)
         }
      )
   }
}
const http = new Http().instance
export default http
