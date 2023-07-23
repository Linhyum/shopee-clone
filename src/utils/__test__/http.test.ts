import { beforeEach, describe, expect, it } from 'vitest'
import { Http } from '../http'
import { HttpStatusCode } from 'axios'
import { setAccessTokenFromLS, setRefreshTokenFromLS } from '../auth'
import { access_token_1s, refresh_token_1000days } from 'src/msw/auth.msw'
describe('http axios', () => {
   let http = new Http().instance

   //trước mỗi lần it đều clear hết localStorage và tạo lại http mới cho nó tường minh , k bị ảnh hưởng lẫn nhau
   beforeEach(() => {
      localStorage.clear()
      http = new Http().instance
   })

   //test xem gọi api thành công k
   it('Gọi Api', async () => {
      //k nên đụng đến thư mục apis
      //vì chúng ta test riêng file http nên chỉ dùng những cái có trong file
      //vì lỡ như thư mục apis có thay đổi gì đó thì cũng k ảnh hưởng gì đến file test này
      const res = await http.get('/products')
      expect(res.status).toBe(HttpStatusCode.Ok)
   })

   //test xem gọi profile thành công k
   //muốn gọi profile phải có access token nên phải đăng nhập rồi mới gọi được
   it('Auth request', async () => {
      await http.post('/login', {
         email: 'yum@gmail.com',
         password: '123123'
      })

      const res = await http.get('/me')
      expect(res.status).toBe(HttpStatusCode.Ok)
   })

   //khi access token hết hạn thì mới test được refresh token có hoạt động hay k
   it('refresh token', async () => {
      //chỗ này comment 2 dòng set nó vẫn k lỗi vì nó ấy access_token trong cache,muốn fix phải tạo instance mới
      setAccessTokenFromLS(access_token_1s)
      setRefreshTokenFromLS(refresh_token_1000days)
      const httpNew = new Http().instance //khi set phải gọi lại lần mới lấy ra được access token và refresh token
      const res = await httpNew.get('/me')
      expect(res.status).toBe(HttpStatusCode.Ok)
   })
})
