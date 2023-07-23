import { rest } from 'msw'
import { access_token_1s } from './auth.msw'

const meRes = {
   message: 'Lấy người dùng thành công',
   data: {
      _id: '649ed2281afc2e1a1f96a747',
      roles: ['User'],
      email: 'linh123@gmail.com',
      createdAt: '2023-06-30T13:01:28.739Z',
      updatedAt: '2023-07-14T14:53:19.316Z',
      address: 'Việt Nam',
      avatar: 'URL Avatar',
      date_of_birth: '1907-02-18T17:17:56.000Z',
      name: 'Dư Thanh Được',
      phone: '04511414'
   }
}

const meRequest = rest.get('https://api-ecom.duthanhduoc.com/me', (req, res, ctx) => {
   const access_token = req.headers.get('authorization')
   //nếu access token hết hạn
   if (access_token === access_token_1s) {
      return res(
         ctx.status(401),
         ctx.json({
            message: 'Lỗi',
            data: {
               message: 'Token hết hạn',
               name: 'EXPIRED_TOKEN'
            }
         })
      )
   }
   return res(ctx.status(200), ctx.json(meRes))
})

export const meRequests = [meRequest]
